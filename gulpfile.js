var del = require('del');
var gulp = require('gulp');
var typescript = require('typescript');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var history = require('connect-history-api-fallback');
var plugins = gulpLoadPlugins({
	rename: {
		'gulp-if': 'gulpif'
	}
});

//also set isProd to true if 'build' task is executed
var isProd = process.env.NODE_ENV === 'production' || (process.argv.length >= 2 && process.argv[2] === 'build');

var langs = ['en', 'de'];
var fallbackLang = 'en';

function isResource(url) {
    return url.indexOf('.') !== -1;
}

//adds the 'Accept-Language' http header to response, so that the app can serve the correct language
function addLanguageHeaderToResponseMiddleware(req, res, next) {
    var url = req.url;

    if ( isResource(url) )
        return next();

    for ( var i = 0; i < langs.length; i++ ) {
        if ( url.indexOf('/' + langs[i]) === 0 )
            return next();
    }

    // TODO try all languages and find the best
    var useLang = fallbackLang;
    if ( req.headers['accept-language'] ) {
        useLang = req.headers['accept-language'].slice(0, 2);
        useLang = useLang in langs ? useLang : fallbackLang;
    }

    res.writeHead(302, {
        Location: '/' + useLang + url
    });

    return res.end();
}

function stripLanguageMiddleware(req, res, next) {
    if ( isResource(req.url) )
        return next();

    req.url = req.url.slice(3);

    return next();
}

gulp.task('img', function(cb) {
	var stream = gulp
			.src('app/**/*.{gif,png,jpg,jpeg}')
			.pipe(plugins.gulpif(isProd, plugins.imagemin()))
			.pipe(plugins.gulpif(isProd, plugins.copy('dist/public/img', {
      	prefix: 1000
      })));

	stream.on('end', function() {
		var source = isProd ? 'dist/public/img/*.{gif,png,jpg,jpeg}' : 'app/**/*.{gif,png,jpg,jpeg}';
		
		gulp
			.src(source)
			.pipe(plugins.connect.reload());
	});

	return stream;
});

gulp.task('partials', function() {
    var partials;

    // only build partials if in production mode, otherwise inject nothing later on
    if ( isProd ) {
        partials = gulp
            .src('app/**/*Partial.html')
            .pipe(plugins.cdnizer({
                defaultCDNBase: 'public/img',
                files: ['**/*.{gif,png,jpg,jpeg}'],
                defaultCDN: '${ defaultCDNBase }/${ filename }'
            }))
            .pipe(plugins.minifyHtml())
            .pipe(plugins.ngHtml2js({
                prefix: 'app/',
                moduleName: 'partials'
            }))
            .pipe(plugins.concat('temp.js'));
    } else {
        partials = gulp.src('');
    }

    var transform = function(filepath, file, i, length) {
        var content = file.contents ? file.contents.toString() : '';

        // little hack so that typescript compiler does not complain
        return content.replace(/function\(module\) \{/g, 'function() { \n var module;');
    };

    return gulp
        .src('app/partials.ts')
        .pipe(plugins.inject(partials, {
            transform: transform,
            starttag: '/* inject:partials */',
            endtag: '/* endinject */'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('connect', function() {
    plugins.connect.server({
        port: 4000,
        livereload: true,
        root: isProd ? 'dist' : __dirname,

        middleware: function(connect, opt) {
            return [ addLanguageHeaderToResponseMiddleware, stripLanguageMiddleware, history() ];
        }
    });
});

gulp.task('typescript', ['partials'], function() {
    var stream = gulp
        .src('app/**/*.ts')
        .pipe(plugins.gulpif(!isProd, plugins.sourcemaps.init()))
        .pipe(plugins.typescript({
            module: 'amd',
            typescript: typescript
        })).js
        .pipe(plugins.gulpif(!isProd, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest('app'));

		if ( !isProd ) {
			stream.on('end', function(){
				gulp
					.src('app/**/*.js')
					.pipe(plugins.connect.reload());
			});
		}

		return stream;
});

gulp.task('js', ['typescript'], function(cb) {
    if ( isProd ) {
			var stream = gulp
      		.src('')
          .pipe(plugins.shell([
          		'node node_modules/requirejs/bin/r.js -o build.js'
          ]));

			stream.on('end', function() {
				gulp
					.src('dist/public/js/build.js')
					.pipe(plugins.connect.reload());
			});

			return stream;
    } else {
			cb();
		}
});

gulp.task('index', ['css', 'js'], function() {
    var sourceGlob = [];

    if ( isProd ) {
        sourceGlob.push('public/js/build.js');
        sourceGlob.push('public/css/*.css');
    } else {
        sourceGlob.push('app/**/*.css');
    }

    var target = gulp.src('index.html');
    var sources = gulp.src(sourceGlob, {read: false, cwd: isProd ? 'dist' : './'});

    return target
        .pipe(plugins.gulpif(isProd, gulp.dest('dist')))
        .pipe(plugins.inject(sources))
        .pipe(gulp.dest(isProd ? 'dist' : './'));
});

gulp.task('test', ['typescript'], function() {
   return gulp
       .src('')
       .pipe(plugins.shell([
           'node_modules/karma/bin/karma start'
       ]));
});

gulp.task('css', function() {
    // write css to the right path depending on env
   var dest = isProd ? 'dist/public/css' : 'app';

   var stream = gulp
       .src('app/**/*.scss')
       .pipe(plugins.gulpif(!isProd, plugins.sourcemaps.init()))
       .pipe(plugins.sass({
           outputStyle: isProd ? 'compressed' : 'nested'
       }))
       .pipe(plugins.gulpif(isProd, plugins.concat('styles.css')))
       .pipe(plugins.gulpif(!isProd, plugins.sourcemaps.write('./', {includeContent: false, sourceRoot: ''})))
       .pipe(gulp.dest(dest));

		stream.on('end', function() {
			gulp
				.src('app/**/*.css')
				.pipe(plugins.connect.reload());
		});

    return stream;
});

//this task is only run in production mode
gulp.task('html', ['js'], function() {
   return gulp
       .src('dist/public/js/build.js')
       .pipe(plugins.connect.reload());
});

//this task is only run if not in production mode
gulp.task('html:nocompile', function() {
	return gulp
			.src(['index.html', 'app/**/*.html'])
			.pipe(plugins.connect.reload());
});

gulp.task('watch:nocompile', function() {
    gulp.watch(['app/**/*.scss'], ['css']);
		gulp.watch(['app/**/*.{gif,png,jpg,jpeg}'], ['img']);
		gulp.watch(['index.html', 'app/**/*.html'], [isProd ? 'html' : 'html:nocompile']);
});

gulp.task('watch', ['watch:nocompile'], function() {
    gulp.watch(['app/**/*.ts', '!app/partials.ts'], ['js']);
});

gulp.task('clean', function(cb) {
	if ( isProd ) {
		del([
			'dist/**/*'
		], cb);
	} else {
		cb();
	}
});

gulp.task('default', function(cb) {
	runSequence('clean', ['connect', 'css', 'img', 'js', 'index', 'test'], 'watch', cb);
});

gulp.task('nocompile', function(cb) {
	runSequence('clean', ['connect', 'css', 'img', 'js', 'index', 'test'], 'watch:nocompile', cb);
});

gulp.task('build', function(cb) {
	runSequence('clean', ['css', 'img', 'js', 'index'], cb);
});
