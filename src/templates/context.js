/* eslint-env node */
'use strict';

var contexts = require('./contexts');

module.exports = {
  title: 'Hello World!',
  baseUrl: 'http://example.com',
  buildTime: new Date(),
  release: global._release,

  url: function url() {
    var page = this.path.name === 'index' ? '' : '/' + this.path.name;
    var dir = this.path.dir ? '/' + this.path.dir : '';
    return this.baseUrl + dir + page;
  },

	index: contexts.indexPage,
};
