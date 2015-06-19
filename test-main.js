var tests = [];

for (var file in window.__karma__.files) {
  if (/Spec\.js$/.test(file)) {
    // this is a hack so that karma and requirejs play nice together
    // removes baseUrl and '.js'
    file = file.replace(/^\/base\/app\/|\.js$/g,'');
    tests.push(file);
  }
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/app',

  paths: {
    'angular': '../node_modules/angular/angular',
    'angular-mock': '../node_modules/angular-mocks/angular-mocks',
    'angular-ui-router': '../node_modules/angular-ui-router/build/angular-ui-router',
		'angular-translate': '../node_modules/angular-translate/dist/angular-translate'
  },

  shim: {
    'angular': {
      exports: 'angular'
    },

    'angular-mock': {
      deps: ['angular']
    },

    'angular-ui-router': {
      deps: ['angular']
    },

		'angular-translate': {
			deps: ['angular']
		}
  }
});

// wait until angular completely setup before we load the tests
// this way I can just require angular and expect everything to be already loaded
require(['angular', 'angular-mock', 'angular-ui-router'], function() {


  require(tests, function() {
    window.__karma__.start();
  });
});
