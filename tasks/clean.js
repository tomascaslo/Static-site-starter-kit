'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');
var rimraf		= require('rimraf');


// Delete build directory
gulp.task('clean', function (cb) {
	rimraf(config.buildDir, cb);
});
