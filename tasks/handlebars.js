'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');
var handlebars	= require('gulp-compile-handlebars');
var rename		= require('gulp-rename');


// Compile handlebars templates
gulp.task('handlebars', function () {
	return gulp.src(config.handlebars.src)
	.pipe(handlebars(
		{}, // Inject data for handlebars template here
		{batch: config.handlebars.partials}
	))
	.pipe(rename({extname: '.html'}))
	.pipe(gulp.dest(config.handlebars.dest, {cwd: config.buildDir}));
});
