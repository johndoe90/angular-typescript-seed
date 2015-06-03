({
	baseUrl: 'app',
	paths: {
		angular: '../node_modules/angular/angular',
    	'angular-ui-router': '../node_modules/angular-ui-router/build/angular-ui-router',
		requireLib: '../node_modules/requirejs/require',
		partials: '../partials'
	},
	name: 'main',
	out: 'dist/public/js/main-built.js',
	optimize: 'none',
	include: ['requireLib', 'partials'],
	preserveLicenseComments: false
})
