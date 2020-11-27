# cache-money
Small node library for caching.

Inspired by [node-cache](https://github.com/node-cache/node-cache)

## Usage
```
const Cache = require('cache').Cache;

const cache = new Cache();

cache.set('foo', 'bar');
const bar = cache.get('foo');
```
