'use strict';

var gulp			= require('gulp');
var gulpSequence	= require('gulp-sequence');

// Get gulp gasks in ./tasks folder
require('require-dir')('./tasks', {recurse: true});

// Build task
// ----------
gulp.task('build', function (cb) {
	gulpSequence('clean', 'handlebars', ['javascript', 'scss', 'images', 'assets'], cb);
});

// Development task
// ----------
gulp.task('dev', function (cb) {
	gulpSequence('build', 'watch', cb);
});


// Default task
// ------------
gulp.task('default', ['build']);
