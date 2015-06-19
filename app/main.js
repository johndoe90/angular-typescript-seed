require.config({
    baseUrl: 'app',

    paths: {
        angular: '../node_modules/angular/angular',
        'angular-ui-router': '../node_modules/angular-ui-router/build/angular-ui-router',
				'angular-translate': '../node_modules/angular-translate/dist/angular-translate'
    },

    shim: {
        angular: {
            exports: 'angular'
        },

        'angular-ui-router': {
            deps: ['angular']
        },

				'angular-translate': {
					deps: ['angular']
				}
    }
});

require(['angular', 'angular-ui-router','angular-translate', 'appModule'], function(angular, appModule) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app']);
    });
});
