'use strict';

var gulp		= require('gulp');
var gulpif		= require('gulp-if');
var args		= require('yargs').argv;
var config		= require('./config.json');
var jshint		= require('gulp-jshint');
var jscs		= require('gulp-jscs');
var rename		= require('gulp-rename');
var uglify		= require('gulp-uglify');
var sourcemaps	= require('gulp-sourcemaps');


// Lint and uglify js files
// Write sourceMap
// Concat in one js file
gulp.task('javascript', function () {
	var _release = !!args.release;

	return gulp.src(config.js.src)
	.pipe(sourcemaps.init())
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(gulpif(_release,
		jshint.reporter('fail')
	))
	.pipe(jscs())
	.pipe(jscs.reporter())
	.pipe(gulpif(_release,
		jscs.reporter('fail')
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
