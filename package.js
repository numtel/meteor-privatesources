Package.describe({
  name: 'numtel:privatesources',
  summary: 'DEPRECATED: Switch to the new numtel:lazy-bundles package for latest release',
  version: '1.0.2',
  git: 'https://github.com/numtel/meteor-privatesources.git'
});

Package.registerBuildPlugin({
  name: 'privateSources',
  use: [ ],
  sources: [
    'plugin/compile-private-sources.js'
  ],
  npmDependencies: {}
});

Package.onUse(function(api){
  api.versionsFrom('1.0.2.1');
  api.addFiles('private-bundle-plugin.js', 'server');
});
