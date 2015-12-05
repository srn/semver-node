# semver-node [![Build Status](https://travis-ci.org/srn/semver-node.svg?branch=master)](https://travis-ci.org/srn/semver-node)

> node semver range resolution. Uses [nodejs.org/dist](https://nodejs.org/dist/) as source.

## Install

```sh
$ npm i -S semver-node
```

## Usage

ES6/7

```js
import semverNode, { resolve } from 'semver-node';

async function stable() {
  let { stable } = await semverNode();
  // => 5.1.1
}

async function resolve() {
  let versions = await semverNode();

  resolve(versions, '>=0.8.5 <=0.8.14')
  // => 0.8.14
}
```

ES5

```js
const semverNode = require('semver-node')

semverNode().then(versions => console.log(versions.stable))
// => 5.1.1

semverNode().then(versions => semverNode.resolve(versions, '>=0.8.5 <=0.8.14'))
// => 0.8.14
```

See the [tests](test.js) for more examples.

### API

`semverNode` exports a Promise by default and a `resolve` convenience helper method.

#### semverNode(mirror)

##### mirror

Type: `string`

The URL to request. Defaults to `https://nodejs.org/dist/`.

##### resolve(versions, range)

Resolves the specified `range`. i.e. `.resolve(versions, '>=0.8.5 <=0.8.14')`.

## Related

- [semver-node-cli](https://github.com/srn/semver-node-cli)

## License

MIT © [Søren Brokær](http://srn.io)
