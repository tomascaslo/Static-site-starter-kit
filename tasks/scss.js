'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');
var scsslint	= require('gulp-scss-lint');
var sass		= require('gulp-sass');
var concat		= require('gulp-concat');
var uncss		= require('gulp-uncss');
var nano		= require('gulp-cssnano');
var sourcemaps	= require('gulp-sourcemaps');


// Compile, uncss, minify and sourcemap scss
gulp.task('scss', ['lint-scss'], function () {
	return gulp.src(config.scss.src)
	.pipe(sourcemaps.init())
	.pipe(sass({includePaths: config.scss.includePaths})
		.on('error', sass.logError))
	.pipe(concat(config.scss.name))
	.pipe(uncss({html: [config.buildDir + '/**/*.html']}))
	.pipe(nano())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(config.scss.dest, {cwd: config.buildDir}));
});

gulp.task('lint-scss', function () {
	return gulp.src(config.scss.lint)
	.pipe(scsslint({config: '.scss-lint.yml'}))
	.pipe(scsslint.failReporter());
});


