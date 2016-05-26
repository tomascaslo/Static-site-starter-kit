/* eslint-env node */
'use strict';

var contexts = require('./contexts');

var commons = require('./commons');

var context = {
  title: 'My New Page',
  baseUrl: 'http://example.com',
  buildTime: new Date(),
  release: global._release,

  isIndex: function isIndex() {
    return this.path.name === 'index';
  },
  
  getPathName: function getPathName() {
    return this.path.name;
  },

  url: function url() {
    var page = this.path.name === 'index' ? '' : '/' + this.path.name;
    var dir = this.path.dir ? '/' + this.path.dir : '';
    return this.baseUrl + dir + page;
  },
  
  // Shared data among views
  shared: contexts.shared,

  // Common functions among views
  getMainHeader: commons.getMainHeader,
  getSubheader: commons.getSubheader,
  getCssClasses: commons.getCssClasses,
  isSection: commons.isSection,

  // Data per page
  index: contexts.indexPage,
};

module.exports = context; 