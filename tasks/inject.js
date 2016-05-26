'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var path = require('path');
var inject = require('gulp-inject');
var _ = require('lodash');
var config = require('./config.json');
var npmFiles = require('./npm-files.json');

var npmFilesArray = getFilesArray(npmFiles);

gulp.task('copy', function copyfn(){

  return gulp.src(npmFilesArray)
  .pipe(gulpif(isjs, gulp.dest('./dist/js/')))
  .pipe(gulpif(iscss, gulp.dest('./dist/css/')));
});

gulp.task('inject', ['copy'], function injectfn() {
  var jsFiles = _.map(getSorted('js'), function(file) { return './dist/js/' + path.basename(file); });
  var cssFiles = _.map(getSorted('css'), function(file) { return './dist/css/' + path.basename(file); });

  jsFiles.push('!./dist/js/all.min.js');
  cssFiles.push('!./dist/css/all.min.css');

  return gulp.src('./dist/*.html')
  .pipe(inject(gulp.src(jsFiles, {read: false}), {name: 'node_modules', relative: true}))
  .pipe(inject(gulp.src(cssFiles, {read: false}), {name: 'node_modules', relative: true}))
  .pipe(gulp.dest('./dist'));  
});

function isjs(file) {
  return path.extname(file.path) === '.js';
}

function iscss(file) {
  return path.extname(file.path) === '.css';
}

function getSorted(fileType) {
  return _.filter(npmFilesArray, function(file) {
    return path.extname(file) === ('.' + fileType);
  });
}

function getFilesArray(filesObj) {
  var npmFilesObj = {};
  var npmFilesWeightedArray = [];
  var keys = [];
  var key;

  _.forEach(filesObj, function(lib) {
  _.forEach(lib, function(file) {
    var fileWeight, filePath;
    
    if (typeof file.weight === 'undefined' || isNaN(file.weight)) {
    file.weight = 0;
    }
    
    fileWeight = file.weight.toString();
      filePath = './' + file.path;
    if (npmFilesObj.hasOwnProperty(fileWeight)) {
    npmFilesObj[fileWeight].push(filePath);
    } else {
    npmFilesObj[fileWeight] = [filePath];
    }
  });
  });
  
  for (key in npmFilesObj) {
  if (npmFilesObj.hasOwnProperty(key)) {
    keys.push(key);
  }
  }

  keys.sort();

  _.forEach(keys, function(key) {
    npmFilesWeightedArray = _.concat(npmFilesWeightedArray, npmFilesObj[key]);
  });

  return npmFilesWeightedArray;
}
