var del = require('del');
var gulp = require('gulp');
var typescript = require('typescript');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
	rename: {
		'gulp-if': 'gulpif'
	}
});

//also set isProd to true if 'build' task is executed
var isProd = process.env.NODE_ENV === 'production' || (process.argv.length >= 2 && process.argv[2] === 'build');

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
				root: isProd ? 'dist' : ''
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
        sourceGlob.push('dist/public/js/build.js');
        sourceGlob.push('dist/public/css/*.css');
    } else {
        sourceGlob.push('app/**/*.css');
    }

    var target = gulp.src('index.html');
    var sources = gulp.src(sourceGlob, {read: false});

    return target
        .pipe(plugins.gulpif(isProd, gulp.dest('dist')))
        .pipe(plugins.inject(sources, {relative: true}))
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
    gulp.watch(['app/**/*.ts'], ['js']);
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
	runSequence('clean', ['connect', 'css', 'img', 'js', 'index', 'watch'], cb);
});

gulp.task('nocompile', function(cb) {
	runSequence('clean', ['connect', 'css', 'img', 'js', 'index', 'watch:nocompile'], cb);
});

gulp.task('build', function(cb) {
	runSequence('clean', ['css', 'img', 'js', 'index'], cb);
});
