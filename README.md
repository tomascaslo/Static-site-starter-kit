# html-static-starter [![Build Status](https://travis-ci.org/SimonTernoir/Static-site-starter-kit.svg?branch=master)](https://travis-ci.org/SimonTernoir/Static-site-starter-kit)

> This is a static site starter kit powered by
> [Handlebars](http://getbootstrap.com/), [Sass](http://sass-lang.com),
> [Gulp](http://gulpjs.com/), and [BrowserSync](http://www.browsersync.io).


##Installation
```shell
npm install
```

**Note:** gulp-scss-lint plugin requires Ruby and [scss-lint gem](https://github.com/causes/scss-lint). ```gem install scss_lint``` to install it.

##Usage
####Development
```shell
npm run dev
```
This command build your project without optimize files (minify, uglify, etc.) and start a BrowserSync server, listening new modifications in **/src** folder.

####Build
```shell
npm run build
```
This command build your project in **/dist** folder.

##Automation
A [.travis.yml](.travis.yml) file is available in this project. By default Travis will run the build command after each commit.


##Paths & configuration
Source files are in the **/src** folder. The views are available in the **src/templates** folder (see details below).

When you build your project a **/dist** folder will be created with all static files compiled and rendered files (Html, Css, Js, Images).

These paths may be changed in the **/tasks/config.json** file:
- **buildDir**: Build directory
- **handlebars**
    + **context**: Handlebars context variables.
    + **partials**: Handlebars partials directories
    + **src**: Handlebars files to render
    + **dest**: Html dest path (relative to the build directory)
- **images**:
    + **src**: Images source path
    + **des**: Images dest path (relative to the build directory)
- **js**:
    + **src**: Paths of Js files that will be linted, uglified and minified
    + **name**: Minified Js file name
    + **dest**: Minified Js dest path (relative to the build directory)
- **scss**:
    + **includePaths**: `includePaths` Sass option
    + **lint**: Paths of Scss files to lint
    + **src**: Paths of Scss files to build
    + **name**: Minified Css file name
    + **dest**: Minified Css dest path (relative to the build directory)

##Views (Html / Handlebars)
Handlebars files are rendered with [gulp-compile-handlebars](https://github.com/kaanon/gulp-compile-handlebars)
Handlebars files are available in **/src/templates/views** and Handlebars partials are located in **/src/templates/partials**.

The Handlebars context comes from the file **/src/templates/context.js**.

##Styles (Css / Scss)
Scss files are:

1. Linted with [gulp-scss-lint](https://github.com/juanfran/gulp-scss-lint)
1. Rendered with [gulp-sass](https://github.com/dlmanning/gulp-sass)
2. Clean with [gulp-uncss](https://github.com/ben-eb/gulp-uncss) and [gulp-cssnano](https://github.com/ben-eb/gulp-cssnano)

The sourcemap is rendered with the minified file.

##Scripts
Javascript files are:

1. Linted with [gulp-jshint](https://github.com/spalger/gulp-jshint) and [gulp-jscs](https://github.com/jscs-dev/gulp-jscs).
2. Uglified with [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
3. Concatenated (appended) with already minified libraries specified in `minifiedLibs` in config.json file.

The sourcemap is rendered with the minified file.

##Images
Images are are minified with [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin).


##Deploy on GitHub Pages
####Step 1 - Create Github token env var
Create a new Personal access token on GitHub ([documentation](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)) and add it in your Environment Variables ([Documentation](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings)) on travis. Name it **GITHUB_TOKEN**.

####Step 2 - Create Gulp task
Install `gulp-gh-pages` Gulp plugin:
```shell
npm install gulp-gh-pages --save-dev
```

Create a `github_deploy` gulp task (in **task/** folder of in the **gulpfile.js**).
```javascript
'use strict';

var gulp        = require('gulp');
var config      = require('./config.json');
var ghPages     = require('gulp-gh-pages');

gulp.task('github_deploy', function () {
    return gulp.src('**/*', {cwd: config.buildDir})
    .pipe(ghPages({
        remoteUrl: 'https://' + process.env.GITHUB_TOKEN + '@github.com/' + GITHUB_OWNER + '/' + GITHUB_REPOSITORY + '.git',
        cacheDir: config.deploy.github.cacheDir,
        message: 'Deployed: ' + new Date()
    }));
});

```
**Note:** Don't forget to change GITHUB_OWNER and GITHUB_REPOSITORY.

####Step 3 - Modify package.json
Add this line in the `scripts"`"` in **package.json** file:
```json
"github_deploy": "gulp github_deploy"
```

####Step 4 - Modify .travis.yml
Add this 4 lines in your **.travis.yml** file:
```yaml
after_success:
- git config --global user.name = "NAME"
- git config --global user.email = "EMAIL"
- npm run github_deploy
```
**Note:** Don't forget to change NAME and EMAIL.

##Troubleshooting
We have experienced some troubles with javascript files loaded with relatives URLs and `uncss` plugin in `scss gulp task`.
