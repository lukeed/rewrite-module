# rewrite-module [![Build Status](https://travis-ci.org/lukeed/rewrite-module.svg?branch=master)](https://travis-ci.org/lukeed/rewrite-module)

> Rewrite a module's exports by applying string transformations, then return for immediate use! No `eval()`!


## Install

```
$ npm install --save rewrite-module
```


## Usage

```js
const rewriteModule = require('rewrite-module');

rewriteModule('unicorns');
//=> 'unicorns & rainbows'
```


## API

### rewriteModule(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License

MIT © [Luke Edwards](https://lukeed.com)
