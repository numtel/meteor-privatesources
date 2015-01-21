Package.describe({
  name: 'numtel:publicsources',
  summary: 'Create bundles in public directory for lazy-loading components',
  version: '0.0.1',
  git: 'https://github.com/numtel/meteor-publicsources.git'
});

Package.registerBuildPlugin({
  name: 'publicSources',
  use: [ ],
  sources: [
    'plugin/compile-public-sources.js'
  ],
  npmDependencies: {}
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('meteor-platform');
  api.use('numtel:publicsources');
  api.addFiles([
    'public/mock.js',
    'public/mock.css',
    'public/mock.html'
  ], 'server', { isAsset: true });
  api.addFiles([
    'publicsources-tests.js'
  ], 'server');
});
