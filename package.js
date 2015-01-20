Package.describe({
  name: 'mixmax:smart-disconnect',
  summary: 'Smartly disconnect your Meteor app when it is not in use',
  version: '0.0.1',
  git: 'https://github.com/mixmaxhq/meteor-smart-disconnect'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.addFiles('disconnect-when-backgrounded.js', ['client']);
});

/*
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mixmax:smart-disconnect');
  api.addFiles('mixmax:smart-disconnect-tests.js');
});
*/
