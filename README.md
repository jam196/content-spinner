# string-content-spinner

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Node.js recursive content spinner algorithm.

### API

#### `spin` function

Spin a string.

Parameters:

```js
spin(stringToSpin: string);
```

Example:

```js
const spin = require('string-content-spinner');

const result = spin('{Hello|Good morning} world');

console.log(result);
```

This will log either `Hello world` or `Good morning`.

#### `factory` function

Generates a new `spin` function with custom section markers and delimiter.

Parameters:

```js
factory(openSectionMarker: string, closeSectionMarker: string, delimiter: string);
```

Example:

```js
// Get factory function
const spinFactory = require('string-content-spinner').factory;

// Generate new spin function with custom section markers and delimiter
const spin = spinFactory('[[', ']]', '::');

// Use it!
const result = spin('Hello [[world::mars]]');

console.log(result);
```

This will log either `Hello world` or `Hello mars`.

### Development

#### NPM commands

- `npm lint`: lint JS files
- `npm lint`: lint JS files
Run `npm test` to run tests. `pre-commit` is set up with `prettier`, `jslint` and test run.


