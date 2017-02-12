const read = require('fs').readFileSync;
const join = require('path').join;
const test = require('ava');
const fn = require('../');

const file1 = join(__dirname, 'fixtures', 'foo.js');
const file2 = join(__dirname, 'fixtures', 'bar.js');

const data1 = read(file1, 'utf8');
const data2 = read(file2, 'utf8');

const tmp1 = data1
	.replace('var ', '')
	.replace(/export /gi, 'exports.')
	.replace('function foo', 'foo = function');
const tmp2 = data2.replace('FOOBAR', 'bar');

const out1 = fn(file1, tmp1);
const out2 = fn(file2, tmp2);

test('out1: returns an object', t => t.is(typeof out1, 'object'));
test('out1: returns all keys', t => t.is(Object.keys(out1).length, 2));
test('out1: key names', t => t.deepEqual(Object.keys(out1), ['hello', 'foo']));
test('typeof out1.hello', t => t.is(typeof out1.hello, 'string'));
test('typeof out1.foo', t => t.is(typeof out1.foo, 'function'));
test('value of out1.hello', t => t.is(out1.hello, 'world'));
test('value of out1.foo', t => t.is(out1.foo(16, 3), 19));

test('out2: returns a function', t => t.is(typeof out2, 'function'));
test('value of out2', t => t.is(out2(), 'bar'));

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
