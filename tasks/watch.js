'use strict';

var gulp          = require('gulp');
var config        = require('./config.json');
var browserSync   = require('browser-sync').create();
var gulpSequence  = require('gulp-sequence');

// Start static server
gulp.task('watch', function watch() {
  browserSync.init({
    browser: 'google chrome',
    server: {
      baseDir: config.buildDir,
      directory: true
    }
  });

  // Watch Javascript files
  // ----------------------
  gulp.watch(config.scss.lint, function watchScss() {
    gulpSequence('scss', browserSync.reload);
  });

  // Watch Javascript files
  // ----------------------
  gulp.watch(config.js.src, function watchJs() {
    gulpSequence('javascript', browserSync.reload);
  });

  // Watch handlebars files
  // ----------------------
  gulp.watch(
    config.handlebars.src.concat(
      config.handlebars.partials + '/**/*.hbs',
      config.handlebars.context
    ), function watchHbs() {
    gulpSequence('handlebars', 'inject', browserSync.reload);
  });

  // Watch images
  // ------------
  gulp.watch(config.images.src, function watchImg() {
    gulpSequence('images', browserSync.reload);
  });

  // Watch assets
  // ------------
  gulp.watch(config.assets.src, function watchAssets() {
    gulpSequence('assets', browserSync.reload);
  });
});
