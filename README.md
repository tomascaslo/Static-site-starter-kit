# html-static-starter
> This is a static site starter kit powered by
> [Handlebars](http://getbootstrap.com/), [Sass](http://sass-lang.com),
> [Gulp](http://gulpjs.com/), and [BrowserSync](http://www.browsersync.io).


##Installation
```shell
npm install
```

**Note:** gulp-scss-lint plugin requires Ruby and [scss-lint gem](https://github.com/causes/scss-lint). ```gem install scss_lint``` to install it.

##Usage
####Develop
```shell
npm run dev
```
This command build your project without optimize files (minify, uglify, etc.) and start a BrowserSync server, listening new modifications in **/src** folder.

####Build
```shell
npm run build
```
This command build your project in **/dist** folder.


##Paths & configuration
Source files are in the **/src** folder. The views are available in the **src/templates** folder (see details below).

When you build your project a **/dist** folder will be created with all static files compiled and rendered files (Html, Css, Js, Images).

These paths may be changed in the **/tasks/congif.json** file:
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
