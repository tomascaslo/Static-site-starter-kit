/* eslint-env node */
'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var args = require('yargs').argv;

// Get release flag
global._release = Boolean(args.release);


// Get gulp gasks in ./tasks folder
require('require-dir')('./tasks', {recurse: true});

// Build task
// ----------
gulp.task('build', function build(cb) {
  gulpSequence('clean', 'handlebars', ['javascript', 'scss', 'images', 'assets'], cb);
});

// Development task
// ----------
gulp.task('dev', function dev(cb) {
  gulpSequence('build', 'watch', cb);
});


// Default task
// ------------
gulp.task('default', ['build']);
