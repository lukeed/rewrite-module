const read = require('fs').readFileSync;
const join = require('path').join;
const test = require('ava');
const fn = require('../');

const file = join(__dirname, 'fixtures', 'foo.js');
const data = read(file, 'utf8');

const tmp = data
	.replace('var ', '')
	.replace(/export /gi, 'exports.')
	.replace('function foo', 'foo = function');

const output = fn(file, tmp);

test('returns an object', t => t.is(typeof output, 'object'));
test('returns all keys', t => t.is(Object.keys(output).length, 2));
test('object key names', t => t.deepEqual(Object.keys(output), ['hello', 'foo']));
test('typeof output.hello', t => t.is(typeof output.hello, 'string'));
test('typeof output.foo', t => t.is(typeof output.foo, 'function'));
test('value of output.hello', t => t.is(output.hello, 'world'));
test('value of output.foo', t => t.is(output.foo(16, 3), 19));

test('filepath must be defined', t => {
	const err = t.throws(() => fn(), TypeError);
	t.is(err.message, 'Filepath must be a string; got undefined');
});

test('filepath must be string', t => {
	const err = t.throws(() => fn(123), TypeError);
	t.is(err.message, 'Filepath must be a string; got number');
});

test('contents must be defined', t => {
	const err = t.throws(() => fn('foo'), TypeError);
	t.is(err.message, 'Contents must be a string; got undefined');
});

test('contents must be string', t => {
	const err = t.throws(() => fn('foo', 123), TypeError);
	t.is(err.message, 'Contents must be a string; got number');
});
