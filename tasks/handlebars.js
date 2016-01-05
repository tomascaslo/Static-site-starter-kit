'use strict';

var path		= require('path');
var gulp		= require('gulp');
var config		= require('./config.json');
var handlebars	= require('gulp-compile-handlebars');
var rename		= require('gulp-rename');

// Handlebars custom context
var contextPath	= path.resolve(config.handlebars.context);

// Compile handlebars templates
gulp.task('handlebars', function () {

	// Flush require context cache
	// for Handlebars custom context
	delete require.cache[contextPath];

	return gulp.src(config.handlebars.src)
	.pipe(handlebars(
		require(contextPath),
		{batch: config.handlebars.partials}
	))
	.pipe(rename({extname: '.html'}))
	.pipe(gulp.dest(config.handlebars.dest, {cwd: config.buildDir}));
});
