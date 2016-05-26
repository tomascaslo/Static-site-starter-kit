module.exports = {
	links: {
		index: createPath('/index'),
		external: {}
	}
};

function createPath(name) {
	if(global._release) {
		return name;
	}

	return name + '.html';
}
