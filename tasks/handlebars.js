'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');
var handlebars = require('gulp-compile-handlebars');


// Compile handlebars templates
gulp.task('handlebars', function () {
	return gulp.src(config.handlebars.src)
	.pipe(handlebars())
	.pipe(gulp.dest(config.buildDir));
});
