'use strict';

var typescript = require('typescript');

var config = {};

config.env = {
    isDev: process.env.NODE_ENV !== 'production',
    isProd: process.env.NODE_ENV === 'production'
};

config.paths =  {
    dist: {},
    base: 'app/',
    node_modules: 'node_modules/'
};

config.paths.dist.base = 'dist/';
config.paths.dist.public = config.paths.dist.base + 'public/';
config.paths.dist.css = config.paths.dist.public + 'css/';
config.paths.dist.img = config.paths.dist.public + 'img/';
config.paths.dist.js = config.paths.dist.public + 'js/';


config.globs = {
    css: [config.paths.base + '**/*.css'],
    scss: [config.paths.base + '**/*.scss'],
    specs: [config.paths.base + '**/*Spec.js'],
    typescript: [config.paths.base + '**/*.ts'],
    javascript: [config.paths.base + '**/*.js'],
    partials: [config.paths.base + '**/*Partial.html'],
    html: ['index.html', config.paths.base + '**/*.html'],
    images: [config.paths.base + '**/*.jpg']
};

/* connect config */
config.connect = {
    port: 4000,
    root: config.env.isProd ? './dist' : './',
    livereload: config.env.isProd ? false : {
        port: 35729
    }
};

/* ts config */
config.ts = {
    module: 'amd',
    typescript: typescript
};

/* sass config */
config.sass = {
    outputStyle: config.env.isProd ? 'compressed' : 'nested'
};

module.exports = config;