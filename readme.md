# rewrite-module [![Build Status](https://travis-ci.org/lukeed/rewrite-module.svg?branch=master)](https://travis-ci.org/lukeed/rewrite-module)

> Rewrite a module's exports by applying string transformations, then return for immediate use! No `eval()`!


## Install

```
$ npm install --save rewrite-module
```


## Usage

```js
// foobar.js
exports.foo = 'FOOBAR_foo';
exports.bar = 'FOOBAR_bar';
```

```js
const { join } = require('path');
const read = require('fs').readFileSync;
const rewriteModule = require('rewrite-module');

const file = join(__dirname, 'foobar.js');
const data = read(file, 'utf8').replace(/FOOBAR/g, 'foobar');

rewriteModule({file, data});
//=> {foo: 'foobar_foo', bar: 'foobar_bar'}
```


## API

### rewriteModule(options)

Returns a new, useable module that's comprised of the `contents` you provided. The return-module directly reflects the input given; so any defined `exports` will be available as object keys.

> **Note:** You can receive a `function` instead of an `object` if that's what you defined. Perhaps a [refresher on exports](https://www.sitepoint.com/understanding-module-exports-exports-node-js/#exporting-a-module)?

#### options.data

Type: `string`<br>
Required: `true`

The transformed string to be evaluated in a new VM.

#### options.file

Type: `string`

The original module's filepath.


## License

MIT © [Luke Edwards](https://lukeed.com)
