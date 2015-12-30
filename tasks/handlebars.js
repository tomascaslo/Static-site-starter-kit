'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');
var handlebars	= require('gulp-compile-handlebars');
var rename		= require('gulp-rename');

// Handlebars custom ontext
var context	= require(config.handlebars.context);


// Compile handlebars templates
gulp.task('handlebars', function () {
	return gulp.src(config.handlebars.src)
	.pipe(handlebars(
		context,
		{batch: config.handlebars.partials}
	))
	.pipe(rename({extname: '.html'}))
	.pipe(gulp.dest(config.handlebars.dest, {cwd: config.buildDir}));
});
