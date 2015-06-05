({
	baseUrl: 'app',
	paths: {
		angular: '../node_modules/angular/angular',
    	'angular-ui-router': '../node_modules/angular-ui-router/build/angular-ui-router',
		requireLib: '../node_modules/requirejs/require'
	},
	name: 'main',
	out: 'dist/public/js/build.js',
	//optimize: 'none',
	include: ['requireLib'],
	preserveLicenseComments: false,
	mainConfigFile: 'app/main.js'
})
