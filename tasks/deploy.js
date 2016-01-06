'use strict';

var gulp		= require('gulp');
var config		= require('./config.json');
var ghPages		= require('gulp-gh-pages');

gulp.task('github_deploy', function () {
	// Github remote URL with auth token
	var remoteUrl = '';

	remoteUrl += 'https://';
	remoteUrl += process.env.GITHUB_TOKEN;
	remoteUrl += '@github.com/';
	remoteUrl += config.deploy.github.owner;
	remoteUrl += '/';
	remoteUrl += config.deploy.github.repository;
	remoteUrl += '.git';

	return gulp.src('**/*', {cwd: config.buildDir})
	.pipe(ghPages({
		remoteUrl: remoteUrl,
		cacheDir: config.deploy.github.cacheDir,
		message: 'Deploy: ' + new Date()
	}));
});
