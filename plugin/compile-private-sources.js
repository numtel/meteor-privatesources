var fs = Npm.require('fs');
var path = Npm.require('path');

var compiler  = Npm.require('./compiler');
var projectContextModule  = Npm.require('./project-context');
var PackageSource = Npm.require('./package-source');

var projectContext;
if(process.privatesourcesProjectContext){
  projectContext = process.privatesourcesProjectContext;
}else{
  projectContext = new projectContextModule.ProjectContext({
    projectDir: process.cwd()
  });
  process.privatesourcesProjectContext = projectContext;
  projectContext.prepareProjectForBuild();
}

// Begin code borrowed from mquandalle:bower/plugin/handler.js

var loadJSONContent = function (compileStep, content) {
  try {
    return JSON.parse(content);
  }
  catch (e) {
    compileStep.error({
      message: "Syntax error in " + compileStep.inputPath,
      line: e.line,
      column: e.column
    });
  }
};

// XXX Hack. If this line is not present `xxx.json` handlers are not called.
//  This is a Meteor bug.
// Plugin.registerSourceHandler("json", null);

// End code from mquandalle:bower

var isHtmlExt = function(n){ return n.substr(-5).toLowerCase() === '.html' };
// Use with Array.prototype.sort() in array of filenames to put '.html' first
var sortHTMLFirst = function(a, b){
  var aHtml = isHtmlExt(a);
  var bHtml = isHtmlExt(b);
  if(aHtml && bHtml) return 0;
  else if(aHtml) return -1;
  else if(bHtml) return 1;
  return 0;
};

Plugin.registerSourceHandler('privatesources.json', {
  archMatching: 'os'
}, function (compileStep) {
  var bundles = loadJSONContent(compileStep,
    compileStep.read().toString('utf8'));
  processBundles(compileStep, bundles);
});

// Separate function for testing purposes
var processBundles = function(compileStep, bundles){
  var bundle;
  for(var name in bundles){
    bundle = bundles[name];
    var processed = bundlePrivateSources(bundle.sort(sortHTMLFirst));
    
    processed.scripts.forEach(function(script){
      compileStep.addAsset({
        path: name + '.js',
        data: script.source
      });
      compileStep.addAsset({
        path: name + '.js.map',
        data: script.sourceMap.replace(script.servePath, name + '.js')
      });
    });

    processed.stylesheets.forEach(function(stylesheet){
      compileStep.addAsset({
        path: name + '.css',
        data: stylesheet.data
      });
      if(stylesheet.sourceMap){
        compileStep.addAsset({
          path: name + '.css.map',
          data: stylesheet.sourceMap.replace(
            stylesheet.servePath, name + '.css')
        });
      }
    });
  }
};

// @param {[string]} sources - Relative filenames from private directory
var bundlePrivateSources = function(sources){
  if(projectContext.isopackCache !== null){
    var packages = [];
    for(var packageName in projectContext.isopackCache._isopacks){
      packages.push(packageName);
    }

    var packageSource = new PackageSource;
    packageSource.initFromOptions('resources', {
      kind: 'plugin',
      sourceRoot: path.join(process.cwd(), 'private'),
      serveRoot: process.cwd(),
      use: packages,
      npmDependencies: [],
      npmDir: path.join(process.cwd(), 'node_modules'),
      sources: sources
    });
    // initFromOptions() defaults to 'os' architecture
    packageSource.architectures[0].arch = 'web.browser';

    var app = compiler.compile(packageSource, {
      packageMap: projectContext.packageMap,
      isopackCache: projectContext.isopackCache,
      includeCordovaUnibuild: false
    });
    
    var buildData = app.unibuilds[0];

    return {
      scripts: buildData.prelinkFiles,
      packageVariables: buildData.packageVariables.map(function(variable){
        return variable.name;
      }),
      stylesheets: buildData.resources.filter(function(resource){
        return resource.type === 'css';
      })
    };
  }
}
