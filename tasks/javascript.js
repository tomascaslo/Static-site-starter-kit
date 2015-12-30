'use strict';

var gulp		= require('gulp');
var merge		= require('merge-stream');
var config		= require('./config.json');
var jshint		= require('gulp-jshint');
var jscs		= require('gulp-jscs');
var concat		= require('gulp-concat');
var uglify		= require('gulp-uglify');
var sourcemaps	= require('gulp-sourcemaps');


// Lint and uglify js files
// Prepend minified libs (avoid to lint and uglify libs)
// Write sourceMap
// Concat in one js file
gulp.task('javascript', function () {
	return merge(
		gulp.src(config.js.src.minifiedLibs),
		gulp.src(config.js.src.files)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'))
		.pipe(uglify())
	)
	.pipe(sourcemaps.init())
	.pipe(concat(config.js.name))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(config.js.dest, {cwd: config.buildDir}));
});
