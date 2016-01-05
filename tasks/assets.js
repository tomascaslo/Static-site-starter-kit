'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');


// Copy assets folders in build path
gulp.task('assets', function () {
	return gulp.src(config.assets.src)
	.pipe(gulp.dest(config.assets.dest, {cwd: config.buildDir}));
});
