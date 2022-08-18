![`Mixed bag` bundle size](https://img.badgesize.io/https:/cdn.jsdelivr.net/npm/mixed-bag@0.12.0/dist/esm/index.min.js?compression=gzip)

# `Mixed Bag` - Tiny 2kb Lodash alternative

Lodash is an amazing utility library for JavaScript, but with recent additions to the ECMAScript much of it can be replaced with vanilla features. This library aims to be a thinner alternative with modern browsers in mind.

_Note: This library hasn't been battle tested yet. Help us test it out._

Supported functions:

- `_.at`
- `_.camelCase`
- `_.capitalize`
- `_.castArray`
- `_.chunk`
- `_.clone`
- `_.cloneDeep`
- `_.compact`
- `_.concat`
- `_.defaultsDeep` (only considers own properties)
- `_.difference`
- `_.every`
- `_.findIndex`
- `_.findLastIndex`
- `_.find`
- `_.filter`
- `_.flatten`
- `_.flatMap`
- `_.flow`
- `_.forEach`
- `_.get`
- `_.groupBy`
- `_.has`
- `_.head`
- `_.indexOf`
- `_.identity`
- `_.includes`
- `_.initial`
- `_.intersection`
- `_.isObject`
- `_.isObjectLike`
- `_.isEmpty`
- `_.isEqual`
- `_.isNil`
- `_.isNumber`
- `_.isUndefined`
- `_.join`
- `_.kebabCase`
- `_.keyBy`
- `_.last`
- `_.map`
- `_.mapKeys`
- `_.mapValues`
- `_.merge`
- `_.omit`
- `_.omitBy`
- `_.once`
- `_.orderBy`
- `_.pick`
- `_.pickBy`
- `_.range`
- `_.reverse`
- `_.set`
- `_.slice`
- `_.snakeCase`
- `_.some`
- `_.sortBy`
- `_.split`
- `_.startCase`
- `_.sumBy`
- `_.take`
- `_.upperFirst`
- `_.uniq`
- `_.uniqBy`
- `_.uniqueId`
- `_.unset`

## Differences from lodash

- Assumes browser/runtime can run ES2020
- Mostly only handles `null` and `undefined`. Does not try to handle NaN or 0 vs -0.
- Makes limited attempts (or none) to coerce types. Does not coerce "array-like" objects into arrays.
- "Collection" functions (like map, difference etc) cannot be used on objects. A "collection" is just arrays.

## Installation

```bash
npm install mixed-bag
# or via yarn
yarn add mixed-bag
```

## License

MIT, see [the LICENSE file](./LICENSE)

## Credits

This project was forked from [smoldash](https://github.com/marvinhagemeister/smoldash)