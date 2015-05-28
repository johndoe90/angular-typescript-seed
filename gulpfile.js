var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var tinyLr = require('tiny-lr');
var config = require('./config');
var gutil = require('gulp-util');
var express = require('express');
var shell = require('gulp-shell');
var inject = require('gulp-inject');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');
var connectLr = require('connect-livereload');

function joinArrays() {
    var result = [];
    for ( var i = 0; i < arguments.length; i++ )
        result = result.concat(arguments[i]);

    return result;
}

function notifyLr(event) {
    tinyLr.changed({
        body: {
            files: [path.relative(__dirname, event.path)]
        }
    })
}

gulp.task('express', function() {
    var app = express();

    app.use(connectLr());
    app.use(express.static(__dirname));
    app.listen(config.dev.express.serverport);

    tinyLr = tinyLr();
    tinyLr.listen(config.dev.express.livereloadport);
});

gulp.task('index', function() {
    var target = gulp.src(config.paths.base + 'index.html');
    var sources = gulp.src(joinArrays(config.globs.css), {read: false});

    return target
        .pipe(inject(sources))
        .pipe(gulp.dest(config.paths.base));
});

gulp.task('test', function() {
   return gulp
       .src('')
       .pipe(shell([
           config.paths.node_modules + 'karma/bin/karma start'
       ]));
});

gulp.task('typescript', function() {
    return gulp
        .src(config.globs.typescript)
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: 'amd',
            typescript: typescript
        })).js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.base));
});

gulp.task('scss', function() {
   return gulp
       .src(config.globs.scss)
       .pipe(sass())
       .pipe(gulp.dest(config.paths.base));
});

gulp.task('watch:nocompile', function() {
    gulp.watch(config.globs.css, notifyLr);
    gulp.watch(config.globs.html, notifyLr);
    gulp.watch(config.globs.scss, ['scss']);
});

gulp.task('watch', ['watch:nocompile'], function() {
    gulp.watch(config.globs.typescript, ['typescript']);
});

gulp.task('default', ['express', 'scss', 'index', 'watch', 'test']);

gulp.task('nocompile', ['express', 'scss', 'index', 'watch:nocompile', 'test']);