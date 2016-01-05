'use strict';

var gulp		= require('gulp');
var gulpif		= require('gulp-if');
var args		= require('yargs').argv;
var config		= require('./config.json');
var imagemin	= require('gulp-imagemin');


// Copy and compress images to the "dist" folder
gulp.task('images', function () {
	var _release = !!args.release;

	return gulp.src(config.images.src)
	.pipe(gulpif(_release,
		imagemin({progressive: true})
	))
	.pipe(gulp.dest(config.images.dest, {cwd: config.buildDir}));
});

var gulpif = require('gulp-if');
