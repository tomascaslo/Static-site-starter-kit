'use strict';

var path              = require('path');
var gulp              = require('gulp');
var config            = require('./config.json');
var data              = require('gulp-data');
var handlebars        = require('gulp-compile-handlebars');
var handlebarsIntl    = require('handlebars-intl');
var removeEmptyLines  = require('gulp-remove-empty-lines');
var rename            = require('gulp-rename');


// Register HandlebarsIntl helper in Handlebars module
handlebarsIntl.registerWith(handlebars.Handlebars);

// Add json handlebarsJson helper in Handlebars module
handlebars.Handlebars.registerHelper('toJson', JSON.stringify);

// Handlebars custom context
var contextPath = path.resolve(config.handlebars.context);

// Compile handlebars templates
gulp.task('handlebars', function handlebarsfn() {

  // Flush require context cache
  // for Handlebars custom context
  delete require.cache[contextPath];

  return gulp.src(config.handlebars.src)
  .pipe(data(function fn(file) {
    // Get views root path
    var root = path.resolve(__dirname, '../' + config.handlebars.viewsDir);
    return {path: path.parse(path.relative(root, file.path))};
  }))
  .pipe(handlebars(
    require(contextPath),
    {batch: config.handlebars.partials}
  ))
  .pipe(removeEmptyLines())
  .pipe(rename({extname: '.html'}))
  .pipe(gulp.dest(config.handlebars.dest, {cwd: config.buildDir}));
});
