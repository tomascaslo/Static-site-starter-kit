'use strict';

var gulp		= require('gulp');
var gulpif		= require('gulp-if');
var args		= require('yargs').argv;
var config		= require('./config.json');
var scsslint	= require('gulp-scss-lint');
var sass		= require('gulp-sass');
var rename		= require('gulp-rename');
var uncss		= require('gulp-uncss');
var nano		= require('gulp-cssnano');
var sourcemaps	= require('gulp-sourcemaps');


// Compile, uncss, minify and sourcemap scss
gulp.task('scss', ['lint-scss'], function () {
	var _release = !!args.release;

	return gulp.src(config.scss.main)
	.pipe(sourcemaps.init())
	.pipe(sass({includePaths: config.scss.includePaths})
		.on('error', sass.logError))
	.pipe(rename(config.scss.name))
	.pipe(gulpif(_release,
		uncss({
			html: [config.buildDir + '/**/*.html'],
			htmlroot: config.buildDir
		})
	))
	.pipe(gulpif(_release,
		nano()
	))
	.pipe(gulpif(_release,
		sourcemaps.write('.')
	))
	.pipe(gulp.dest(config.scss.dest, {cwd: config.buildDir}));
});

gulp.task('lint-scss', function () {
	var _release = !!args.release;

	return gulp.src(config.scss.all)
	.pipe(scsslint({config: '.scss-lint.yml'}))
	.pipe(gulpif(_release,
		scsslint.failReporter()
	));
});
