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
- `_.clamp`
- `_.clone`
- `_.cloneDeep`
- `_.compact`
- `_.countBy`
- `_.defaultsDeep` (only considers own properties)
- `_.defaultTo`
- `_.difference`
- `_.differenceBy`
- `_.every`
- `_.find`
- `_.findIndex`
- `_.findLast`
- `_.findLastIndex`
- `_.filter`
- `_.flatten`
- `_.flatMap`
- `_.flow`
- `_.forEach`
- `_.get`
- `_.groupBy`
- `_.has`
- `_.identity`
- `_.inRange`
- `_.intersection`
- `_.intersectionBy`
- `_.invert`
- `_.invertBy`
- `_.isInteger`
- `_.isObject`
- `_.isObjectLike`
- `_.isPlainObject`
- `_.isString`
- `_.isSymbol`
- `_.isTypedArray`
- `_.isEmpty`
- `_.isEqual`
- `_.isNil`
- `_.isNumber`
- `_.isUndefined`
- `_.kebabCase`
- `_.keyBy`
- `_.last`
- `_.lowerCase`
- `_.lowerFirst`
- `_.map`
- `_.escape`
- `_.maxBy`
- `_.mean`
- `_.meanBy`
- `_.minBy`
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
- `_.snakeCase`
- `_.some`
- `_.sortBy`
- `_.startCase`
- `_.sum`
- `_.sumBy`
- `_.toArray`
- `_.unescape`
- `_.union`
- `_.unionBy`
- `_.uniq`
- `_.uniqBy`
- `_.uniqueId`
- `_.upperCase`
- `_.upperFirst`
- `_.unset`
- `_.without`
- `_.xor`
- `_.xorBy`

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

# Functions yet to be implemented

```
_.ary
_.debounce
_.reject
_.throttle
_.unzip
_.zip
```

# Functions undecided:

```
_.differenceWith
_.dropRightWhile
_.dropWhile
_.findKey
_.findLastKey
_.flattenDeep
_.flattenDepth
_.intersectionWith
_.nth
_.pull
_.pullAll
_.pullAllBy
_.pullAllWith
_.pullAt
_.remove
_.sortedIndex
_.sortedIndexBy
_.sortedIndexOf
_.sortedLastIndex
_.sortedLastIndexBy
_.sortedLastIndexOf
_.sortedUniq
_.sortedUniqBy
_.takeRightWhile
_.takeWhile
_.unionWith
_.uniqWith
_.unzipWith
_.xorWith
_.zipObject
_.zipObjectDeep
_.zipWith
_.each
_.eachRight
_.forEachRight
_.flatMapDeep
_.flatMapDepth
_.forEachRight
_.invokeMap
_.partition
_.reduceRight
_.sample
_.sampleSize
_.shuffle
_.size
_.after
_.before
_.curry
_.curryRight
_.flip
_.memoize
_.overArgs
_.partial
_.partialRight
_.rearg
_.unary
_.wrap
_.cloneDeepWith
_.cloneWith
_.conformsTo
_.eq
_.gt
_.gte
_.isArguments
_.isArrayBuffer
_.isArrayLike
_.isArrayLikeObject
_.isEqualWith
_.isLength
_.isMatch
_.isMatchWith
_.isSafeInteger
_.lt
_.lte
_.toFinite
_.toInteger
_.toLength
_.toNumber
_.toPlainObject
_.toSafeInteger
_.toString
_.ceil
_.floor
_.round
_.random
_.assignIn
_.assignInWith
_.assignWith
_.create
_.defaults
_.entries (handles maps and sets)
_.entriesIn
_.toPairs (handles maps and sets)
_.toPairsIn
_.extend
_.assignIn
_.extendWith
_.assignInWith
_.forIn
_.forInRight
_.forOwn
_.forOwnRight
_.functions
_.functionsIn
_.hasIn
_.invoke
_.keys
_.keysIn
_.mergeWith
_.result
_.setWith
_.toPairs
_.toPairsIn
_.transform
_.update
_.updateWith
_.values
_.valuesIn
_.prototype[Symbol.iterator]
_.prototype.at
_.prototype.chain
_.prototype.commit
_.prototype.next
_.prototype.plant
_.prototype.reverse
_.prototype.toJSON
_.value
_.prototype.value
_.prototype.valueOf
_.deburr
_.escapeRegExp
_.pad
_.truncate
_.words
_.attempt
_.bindAll
_.cond
_.conforms
_.flowRight
_.iteratee
_.matches
_.matchesProperty
_.method
_.methodOf
_.mixin
_.noConflict
_.noop
_.nthArg
_.over
_.overEvery
_.overSome
_.property
_.propertyOf
_.rangeRight
_.runInContext
_.times
_.toPath
_.VERSION
```

# Function that will not be implemented because of close native alternative:

```
_.add (use + sign)
_.assign (Object.assign)
_.bind (Use Function.bind or arrow function)
_.concat (arr.concat)
_.constant (already short to write `() => c`)
_.defer (Use setTimeout with delay 1 ms)
_.delay (Use setTimeout)
_.divide (use / sign)
_.drop (arr.slice(n))
_.dropRight (arr.slice(0, -n))
_.endsWith (string.endsWith)
_.head, _.first (arr[0])
_.fill (array.fill)
_.fromPairs (Object.fromEntries)
_.indexOf (arr.indexOf)
_.initial (arr.slice(0, -1))
_.includes (arr.includes)
_.isArray (Array.isArray)
_.isBoolean (typeof x === 'boolean' is good enough vs lodash's implementation)
_.isBuffer (Buffer.isBuffer)
_.isDate (x instanceof Date)
_.isError (`x instanceof Error` is close enough)
_.isFinite (Number.isFinite)
_.isFunction (typoef x === 'function')
_.isMap (x instanceof Map)
_.isNaN (isNaN or Number.isNaN)
_.isNull (x === null)
_.isNumber (typeof x === 'number')
_.isRegExp (x instanceof RegExp)
_.isSet (x instanceof Set)
_.isWeakMap ()
_.isWeakSet
_.join (arr.join)
_.lastIndexOf (arr.lastIndexOf)
_.max (use Math.max(...args))
_.min (use Math.min(...args))
_.multiply (use * sign)
_.negate (already short to write (...args) => !func(...args))
_.now (Date.now())
_.toUpper (string.toUpperCase)
_.padEnd (string.padEnd)
_.padStart (string.padStart)
_.parseInt (global parseInt or Number.parseInt)
_.repeat (string.repeat)
_.replace (string.replace)
_.rest (Use function.call())
_.spread (Use function.apply())
_.slice (arr.slice)
_.split (string.split)
_.startsWith (string.startsWith)
_.stubArray (already short to write `() => []`)
_.stubFalse (already short to write `() => false`)
_.stubObject (already short to write `() => ({})`)
_.stubString (already short to write `() => ''`)
_.stubTrue (already short to write `() => true`)
_.subtract (use - sign)
_.tail (arr.slice(1))
_.take (arr.slice(0, n))
_.takeRight (arr.slice(-n))
_.toLower (string.toLowerCase)
_.trim (string.trim())
_.trimEnd (string.trimEnd())
_.trimStart (string.trimStart())
_.template (use template literals)
_.templateSettings
_.templateSettings.escape
_.templateSettings.evaluate
_.templateSettings.imports
_.templateSettings.interpolate
_.templateSettings.variable
_.templateSettings.imports._
```

# Functions not going to implemented for other reasons

```
_ and _.chain (bloated. will provide alternative)
_.tap, _.thru (obsoleted by chain alternative)
_.bindKey (too niche use case)
_.isElement (there isn't a sure way of detecting elements in DOM-like environments like jsdom without access to window object)
_.isNative (lodash has a note saying core-js package will not allow this to work properly)
```