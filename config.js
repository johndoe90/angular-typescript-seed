var config = {};

config.paths =  {
    base: 'app/',
    dist: 'dist/',
    node_modules: 'node_modules/'
};

config.globs = {
    css: [config.paths.base + '**/*.css'],
    scss: [config.paths.base + '**/.scss'],
    specs: [config.paths.base + '**/*Spec.js'],
    typescript: [config.paths.base + '**/*.ts'],
    javascript: [config.paths.base + '**/*.js'],
    html: [config.paths.base + 'index.html', config.paths.base + '**/*.html']
};

config.dev = {
  express: {
      serverport: 4000,
      livereloadport: 35729
  }
};

module.exports = config;