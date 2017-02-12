'use strict';

const Script = require('vm').Script;
const reqLike = require('require-like');

const box = {};

module.exports = function (filepath, contents) {
	if (typeof filepath !== 'string') {
		throw new TypeError(`Filepath must be a string; got ${typeof filepath}`);
	} else if (typeof contents !== 'string') {
		throw new TypeError(`Contents must be a string; got ${typeof contents}`);
	}
	// setup mock env
	Object.assign(box, global);
	box.module = {exports};
	box.exports = exports;
	box.require = reqLike(filepath);
	// define a script
	const scr = new Script(contents);
	// `eval()` new content elsewhere
	scr.runInNewContext(box);
	// return new `tasks` object
	return box.module.exports;
};
