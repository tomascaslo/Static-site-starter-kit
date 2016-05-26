module.exports = function() {
	return this[this.getPathName()] && this[this.getPathName()].cssClasses || {};
};
