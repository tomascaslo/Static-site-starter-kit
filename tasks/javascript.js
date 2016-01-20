'use strict';

var gulp		= require('gulp');
var gulpif		= require('gulp-if');
var config		= require('./config.json');
var eslint		= require('gulp-eslint');
var rename		= require('gulp-rename');
var uglify		= require('gulp-uglify');
var sourcemaps	= require('gulp-sourcemaps');


// Lint and uglify js files
// Write sourceMap
// Concat in one js file
gulp.task('javascript', function () {

	return gulp.src(config.js.src)

	.pipe(sourcemaps.init())
	.pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(_release,
    	eslint.failAfterError()
    ))
	.pipe(gulpif(_release,
		uglify()
	))
	.pipe(rename(config.js.name))
	.pipe(gulpif(_release,
		sourcemaps.write('.')
	))
	.pipe(gulp.dest(config.js.dest, {cwd: config.buildDir}));
});
