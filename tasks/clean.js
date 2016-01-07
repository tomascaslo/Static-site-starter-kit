'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');
var del			= require('del');


// Delete build directory
gulp.task('clean', function () {
	del([config.buildDir]);
});

