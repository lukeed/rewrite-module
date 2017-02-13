'use strict';

const Script = require('vm').Script;
const dirname = require('path').dirname;

const box = {};

module.exports = object => {
	object = object || {};
	const file = object.file;
	const data = object.data;

	if (typeof data !== 'string') {
		throw new TypeError(`Data must be a string; got ${typeof data}`);
	} else if (file && typeof file !== 'string') {
		throw new TypeError(`File must be a string; got ${typeof file}`);
	}

	// setup mock env
	Object.assign(box, global);
	box.module = {exports};
	box.exports = exports;
	box.require = require;

	if (file) {
		box.__filename = file;
		box.__dirname = dirname(file);
	}

	// define a script
	const scr = new Script(data);
	// `eval()` new content elsewhere
	scr.runInNewContext(box);
	// return new `tasks` object
	return box.module.exports;
};
