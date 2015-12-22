'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');
var imagemin	= require('gulp-imagemin');


// Copy and compress images to the "dist" folder
gulp.task('images', function () {
	return gulp.src(config.images.src)
	.pipe(imagemin({rogressive: true}))
	.pipe(gulp.dest(config.images.dest, {cwd: config.buildDir}));
});
