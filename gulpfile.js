var gulp = require('gulp');
var path = require('path');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var config = require('./config');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var ts = require('gulp-typescript');
var cdnizer = require('gulp-cdnizer');
var connect = require('gulp-connect');
var ngHtml2Js = require("gulp-ng-html2js");
var sourcemaps = require('gulp-sourcemaps');

function joinArrays() {
    var result = [];
    for ( var i = 0; i < arguments.length; i++ )
        result = result.concat(arguments[i]);

    return result;
}

gulp.task('partials', function() {
  return gulp
      .src(config.globs.partials)
      .pipe(cdnizer({
        defaultCDNBase: 'dist',
        defaultCDN: '${ defaultCDNBase }/${ filename }',
        files: ['**/*.{gif,png,jpg,jpeg}']
      }))
      .pipe(ngHtml2Js({
        moduleName: 'app'
      }))
      .pipe(concat('partials.js'))
      .pipe(gulp.dest('./dist'));

});

gulp.task('connect', function() {
    connect.server(config.connect);
});

gulp.task('index', ['scss'], function() {
    var sourceGlob = config.env.isProd ? config.paths.dist.css + '**/*.css' : config.globs.css;

    var target = gulp.src('index.html');
    var sources = gulp.src(sourceGlob, {read: false});

    return target
        .pipe(inject(sources))
        .pipe(gulp.dest(config.env.isProd ? config.paths.dist.base : './'));
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
        .pipe(ts(config.ts)).js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.base))
        .pipe(connect.reload());
});

gulp.task('scss', function() {
    // write css to the right path depending on env
   var dest = config.env.isProd ? config.paths.dist.css : config.paths.base;

   return gulp
       .src(config.globs.scss)

       // if isDev -> init sourcemaps
       .pipe(gulpif(config.env.isDev, sourcemaps.init()))

       //compile sass to css
       .pipe(sass(config.sass))

       //if isProd -> put everything in one file
       .pipe(gulpif(config.env.isProd, concat('styles.css')))

       //if isDev -> write sourcemap file
       .pipe(gulpif(config.env.isDev, sourcemaps.write('./', {includeContent: false, sourceRoot: ''})))

       //if isProd -> write everything to file
       .pipe(gulp.dest(dest))

       //if isDev -> livereload
       .pipe(gulpif(config.env.isDev, connect.reload()));
});

gulp.task('html', function() {
   return gulp
       .src(config.globs.html)
       .pipe(connect.reload());
});

gulp.task('watch:nocompile', function() {
    gulp.watch(config.globs.html, ['html']);
    gulp.watch(config.globs.scss, ['scss']);
});

gulp.task('watch', ['watch:nocompile'], function() {
    gulp.watch(config.globs.typescript, ['typescript']);
});

gulp.task('default', ['connect', 'scss', 'index', 'watch', 'test']);

gulp.task('nocompile', ['connect', 'scss', 'index', 'watch:nocompile', 'test']);