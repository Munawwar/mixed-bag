import { isObjectLike } from "./lang";
export * from "./lang";
export * from "./string";

const { isArray } = Array;

export function identity<T>(v: T): T {
	return v;
}

export function castArray<T>(v?: T | T[]): T[] {
	if (!arguments.length) return [];
	// @ts-ignore
	return isArray(v) ? v : [v];
}

// Defensively create an array if not one. Almost like a constructor
function createArray(arr: any) {
	return isArray(arr) ? arr : [];
}

/**
 * Support form:
 * - 'key'
 * - ['key', value]
 * - { 'key1': value1, 'key2': value2 }
 * - function
 */
export type IterateeConvertibleTypes<T, K extends keyof T, Out> =
	| K
	| [K, T[K]]
	| Partial<T>
	| ((item: T, index: number, collection: T[]) => Out);

// variation - "user"
export function iteratee<T, K extends keyof T>(
	iter: K,
): (item: T, index: number, collection: T[]) => T[K];
// variation - ["user", "fred"]
export function iteratee<T, K extends keyof T>(
	iter: [K, T[K]],
): (item: T, index: number, collection: T[]) => boolean;
// variation - { "user", "fred" }
export function iteratee<T>(
	iter: Partial<T>,
): (item: T, index: number, collection: T[]) => boolean;
// variation - function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function iteratee<T, K extends keyof T, Out>(
	iter: (item: T, index: number, collection: T[]) => Out,
): (item: T, index: number, collection: T[]) => Out;

export function iteratee<T, K extends keyof T, Out>(
	iter: IterateeConvertibleTypes<T, K, Out>,
): ((item: T, index: number, collection: T[]) => Out | boolean) | undefined {
	let fn;
	if (typeof iter === "string") {
		fn = (item: T) => (item?.[(iter as unknown) as keyof T] as unknown) as Out;
	} else if (isArray(iter)) {
		fn = (item: T) => item?.[iter[0]] === iter[1];
	} else if (isObjectLike(iter)) {
		fn = (item: T) =>
			Object.entries(iter).every(
				([key, val]) => item?.[(key as unknown) as keyof T] === val,
			);
	} else if (typeof iter === "function") {
		fn = iter;
	}
	return fn;
}

const createIteratee = iteratee;

export type PredicateConvertibleTypes<T> =
	| string
	| [string, any]
	| Record<string, any>
	| ((item: T) => boolean);

/**
 * Supports form:
 * - 'key' (boolean check)
 * - ['key', 'value']
 * - { key1: 'value1', key2: 'value2'}
 * - function
 */
const createPredicate = <T>(
	predicate: PredicateConvertibleTypes<T> = x => !!x,
): ((item: T) => boolean) | undefined => {
	let fn;
	if (typeof predicate === "string") {
		fn = (item: T) => !!(item as any)?.[predicate];
	} else if (isArray(predicate)) {
		fn = (item: T) => (item as any)?.[predicate[0]] === predicate[1];
	} else if (typeof predicate === "object") {
		fn = (item: T) => {
			return Object.keys(predicate).every(
				v => !(v in predicate) || (item as any)?.[v] === predicate[v],
			);
		};
	} else if (typeof predicate === "function") {
		fn = predicate;
	}
	return fn;
};

/**
 * Creates an array of `arr` values not included in the other given arrays.
 * The order and references of result values are determined by the first array.
 */
export function difference<T>(arr: readonly T[], ...values: readonly T[][]) {
	const uniqValues = new Set(values.flatMap(identity));
	return createArray(arr).filter(item => !uniqValues.has(item));
}

export function intersection<T>(...arrays: readonly T[][]) {
	const counter = new Map();
	arrays.forEach(array => {
		array.forEach(item => {
			counter.set(item, (counter.get(item) || 0) + 1);
		});
	});
	return Array.from(counter.entries())
		.filter(([, count]) => count == arrays.length)
		.map(([item]) => item);
}

/**
 * Sort objects by object properties
 */
export function orderBy<T, K extends keyof T, Out>(
	arr: T[],
	iteratees: IterateeConvertibleTypes<T, K, Out>[],
	orders?: ("asc" | "desc")[],
): T[] {
	const normalizedIteratees = iteratees.map((item: any) =>
		iteratee<T, K, Out>(item),
	);
	return createArray(arr)
		.slice()
		.sort((a: any, b: any) => {
			for (let i = 0; i < normalizedIteratees.length; i++) {
				const itemA = normalizedIteratees[i](a, -1, arr);
				const itemB = normalizedIteratees[i](b, -1, arr);
				let order = orders?.[i];
				if (order !== "asc" && order !== "desc") {
					order = "asc";
				}
				if (itemA === itemB) continue;
				return (itemA < itemB ? -1 : 1) * (order == "desc" ? -1 : 1);
			}
			return 0;
		});
}

/**
 * Sort objects by object properties
 */
export function sortBy<T>(arr: T[], keys: Array<keyof T>): T[] {
	return orderBy(arr, keys);
}

/**
 * Take out the first N items of an array
 */
export function take<T>(arr: T[], n: number): T[] {
	return createArray(arr).slice(0, n);
}

/**
 * Get the first element of an array
 */
// TODO: What value is this?
export function head<T>(arr: T[]): T | undefined {
	return createArray(arr)[0];
}
/**
 * Gets all but the last element of array.
 */
export function initial<T>(arr: T[]): T[] {
	return take(arr, -1);
}
/**
 * Get the last element of an array
 */
export function last<T>(arr: T[]): T | undefined {
	return createArray(arr)[arr.length - 1];
}
/**
 * Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.
 * Unlike lodash this does not mutate array.
 */
export function reverse<T>(arr: T[]): T[] {
	return createArray(arr).slice().reverse();
}

/**
 * Converts all elements in array into a string separated by separator.
 */
export function join<T>(arr: T[], separator?: string) {
	return createArray(arr).join(separator);
}
/**
 * Splits string by separator.
 */
export function split(
	string: string,
	separator: string | RegExp,
	limit?: number,
) {
	return string.split(separator, limit);
}

/**
 * Get multiple object or array value by paths. Example path: `a[0].b.c`
 */
export function at(
	source: Record<string, unknown> | any[],
	paths: string[] | string,
) {
	const out = [];

	if (typeof paths === "string") {
		paths = [paths];
	}

	for (let i = 0; i < paths.length; i++) {
		const path: string = paths[i] || "";
		const parts = path.split(/[.[\]]/g);
		let haystack: any = source;
		let found = true;
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (part === "") continue;
			if (!(part in haystack)) {
				found = false;
				break;
			}
			haystack = haystack[part];
		}

		if (found) {
			out.push(haystack);
		}
	}

	return out;
}

/**
 * Return item by path or default value if not present
 */
export function get<T = any>(
	source: Record<string, unknown> | any[],
	path: string | number | Array<string | number>,
	defaultValue?: T,
): T | undefined {
	if (isArray(path)) {
		path = path.join(".");
	}

	const parts = String(path).split(/[.[\]]/g);
	let haystack: any = source;
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (part === "") continue;
		if (!(part in haystack)) return defaultValue;
		haystack = haystack[part];
	}

	return haystack;
}

export function set<T = any>(
	target: Record<string, unknown> | any[],
	path: string | number | Array<string | number>,
	value?: T,
): typeof target {
	if (isArray(path)) {
		path = path.join(".");
	}

	const parts = String(path).split(/[.[\]]/g);
	let obj: any = target || {};
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (part === "") continue;
		if (i === parts.length - 1) {
			obj[part] = value;
		} else {
			if (!obj[part]) {
				const isNumeric = /^\d+$/.test(String(part));
				obj[part] = isNumeric ? [] : {};
			}
			obj = obj[part];
		}
	}

	return target;
}

export function unset(
	target: Record<string, unknown> | any[],
	path: string | number | Array<string | number>,
): typeof target {
	if (isArray(path)) {
		path = path.join(".");
	}

	const parts = String(path).split(/[.[\]]/g);
	let obj: any = target || {};
	for (let i = 0; obj && i < parts.length; i++) {
		const part = parts[i];
		if (part === "") continue;
		if (i === parts.length - 1) {
			delete obj[part];
		} else {
			obj = obj[part];
		}
	}

	return target;
}

const empty = {};
/**
 * Check if an item is in an object by path
 */
export function has(
	source: Record<string, unknown> | any[],
	path: string | Array<string | number>,
) {
	return get(source, path, empty) !== empty;
}

/**
 * Pick values out of an object by paths and return them in a new object
 */
export function pick<T extends Record<string, unknown>>(
	obj: T,
	path: string | string[],
): Partial<T> {
	const paths = !isArray(path) ? [path] : path;
	const out: Partial<T> = {};
	paths.forEach(path => {
		set(out, path, get(obj, path));
	});
	return out;
}

/**
 * Pick values out of an object by predicate and return them in a new object
 */
export function pickBy<T extends Record<string, unknown>>(
	obj: T,
	predicate: <K extends keyof T>(value: T[K], key: K) => boolean,
) {
	const out: Partial<T> = {};
	Object.keys(obj).forEach(key => {
		if (predicate((obj as any)[key], key)) {
			(out as any)[key] = obj[key];
		}
	});

	return out;
}

/**
 * Omit values out of an object by paths and return them in a new object.
 * Works only on plain objects - a simplified version of lodash omit().
 */
export function omit<T extends Record<string, unknown>>(
	obj: T,
	path: string | string[],
): Partial<T> {
	if (!obj) return {};
	const paths = !isArray(path) ? [path] : path;
	const isDeep = paths.some(path => /[.[\]]/.test(path));
	const out: Partial<T> = isDeep ? cloneDeep(obj) : { ...obj }; // lodash does a deep clone only for deep paths
	paths.forEach(path => {
		unset(out, path);
	});
	return out;
}

/**
 * This method creates an object composed of the own and inherited numerable string keyed
 * properties of object that predicate doesn't return truthy for.
 * Works only on plain objects - a simplified version of lodash omit().
 */
export function omitBy<T extends Record<string, unknown>, K extends keyof T>(
	obj: T,
	predicate: (item: T[K], key: K, obj: T) => boolean = () => true,
): Partial<T> {
	if (!obj) return {};
	const fn = createPredicate(predicate);
	const out: Partial<T> = {};
	for (const key in obj) {
		const value = obj[key];
		if (!(fn as any)(value, key, obj)) {
			out[key] = value; // lodash doesn't do a deep clone
		}
	}
	return out as any;
}

/**
 * Loop over a collection and call the callback on each item
 */
export function forEach<T>(
	value: T,
	callback: (value: any, index: number | string, collection: T) => void,
) {
	if (isArray(value)) {
		value.forEach(callback as any);
	} else if (value instanceof Set || value instanceof Map) {
		value.forEach(callback as any);
	} else if (isObjectLike(value)) {
		Object.keys(value).forEach(key => {
			callback((value as any)[key], key, value);
		});
	}
}

/**
 * Get index of an item in an array
 */
export function indexOf<T>(arr: T[], value: T, startIndex = 0): number {
	if (!isArray(arr)) return -1;
	if (startIndex === 0) return arr.indexOf(value);

	for (let i = startIndex; i < arr.length; i++) {
		if (arr[i] === value) return i;
	}
	return -1;
}

// TODO: Compress this or remove it
export function includes<T>(arr: T[], value: T, startIndex = 0): boolean {
	return indexOf(arr, value, startIndex) > -1;
}

/**
 * Get items of an array from start index to end index.
 */
// TODO: Compress this or remove it
export function slice<T>(arr: T[], startIndex: number, endIndex?: number): T[] {
	return createArray(arr).slice(startIndex, endIndex);
}

/**
 * Flatten an array by a single level
 */
// TODO: Compress this or remove it
export function flatten(arr: any) {
	return createArray(arr).flatMap(x => x);
}

/**
 * Concat values into array like native Array.prototype.concat
 */
export function chunk(arr: any[], size = 1) {
	arr = createArray(arr);
	const chunks = [];
	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}
	return chunks;
}

/**
 * Concat values into array like native Array.prototype.concat
 */
// TODO: Compress this or remove it
export function concat(arr: any[], ...args: any[]) {
	return createArray(arr).concat(...args);
}

/**
 * Remove falsy values from array
 */
export function compact(arr: unknown[]) {
	return createArray(arr).filter(x => !!x);
}

/* Used to generate unique IDs. */
const idCounter: Record<string, number> = {};

/**
 * Generates a unique ID
 */
export function uniqueId(prefix = "$uid$") {
	const id = (idCounter[prefix] = (idCounter[prefix] || 0) + 1);
	return "" + (prefix === "$uid$" ? "" : prefix) + id;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function once<T extends (...args: any[]) => any>(fn: T): T {
	let result: ReturnType<T>;
	let called = false;
	return function once_wrapped(this: any, ...args: any[]) {
		if (!called) {
			called = true;
			result = fn.apply(this, args);
		}
		return result;
	} as any;
}

/**
 * Create a duplicate free version of an array
 */
export function uniq<T>(arr: T[]): T[] {
	return Array.from(new Set(createArray(arr)).values());
}

/**
 * Create a duplicate free version of an array by a user iteratee
 */
export function uniqBy<T, R = any>(arr: T[], iteratee: R | ((v: T) => R)) {
	const seen = new Map<R, T>();
	const type = typeof iteratee;

	createArray(arr).forEach(item => {
		let key: any = iteratee;
		if (type === "string" && isObjectLike(item)) {
			key = (item as any)[iteratee];
		} else if (type === "function") {
			key = (iteratee as any)(item);
		}
		if (!seen.has(key)) {
			seen.set(key, item);
		}
	});

	return Array.from(seen.values());
}

export type AnyFunction = (...args: any[]) => any;

/**
 * Pass the result of the first function to the next one.
 */
export function flow(...fns: AnyFunction[]) {
	return function (this: any, ...args: any[]) {
		let result = fns[0].apply(this, args);
		for (let i = 1; i < fns.length; i++) {
			result = fns[i].call(this, result);
		}

		return result;
	};
}

/**
 * Shallow clone of a value
 */
export function clone<T>(value: T): T {
	if (isArray(value)) {
		return value.slice() as any;
	} else if (value instanceof RegExp) {
		return new RegExp(value.source, value.flags) as any;
	} else if (value instanceof Set) {
		return new Set(value) as any;
	} else if (value instanceof Map) {
		return new Map(value) as any;
	} else if (value instanceof Date) {
		return new Date(value) as any;
	} else if (isObjectLike(value)) {
		return { ...value };
	}
	return value;
}

/**
 * Deeply clone a value
 */
export function cloneDeep<T>(value: T): T {
	// Can't use structuredClone native function yet as it is not available in workers
	// nor in currently 'live' Safari versions
	if (isArray(value)) {
		return value.slice().map(cloneDeep) as any;
	} else if (value instanceof RegExp) {
		return new RegExp(value.source, value.flags) as any;
	} else if (value instanceof Set) {
		const out = new Set();
		value.forEach(v => out.add(cloneDeep(v)));
		return out as any;
	} else if (value instanceof Map) {
		const out = new Map();
		value.forEach((v, k) => out.set(k, cloneDeep(v)));
		return out as any;
	} else if (value instanceof Date) {
		return new Date(value) as any;
	} else if (isObjectLike(value)) {
		const out: Record<string, any> = {};
		for (const k in value) {
			out[k] = cloneDeep(value[k]);
		}
		return out as any;
	}

	return value;
}

/**
 * Deeply merge multiple objects
 */
export function merge(...objs: Record<string, any>[]): Record<string, any> {
	const a = objs[0] as any;

	for (let i = 1; i < objs.length; i++) {
		const b = objs[i] as any;

		for (const k in b) {
			if (isObjectLike(a[k]) && isObjectLike(b[k])) {
				merge(a[k], b[k]);
			} else {
				a[k] = b[k];
			}
		}
	}

	return objs[0];
}

/**
 * Iterate the collection and return the index of the element where the predicate returns true
 */
export function findIndex<T>(
	collection: T[],
	predicate: PredicateConvertibleTypes<T> = x => !!x,
	fromIndex = 0,
): number {
	if (!isArray(collection)) return -1;
	const fn = createPredicate(predicate);
	for (let i = fromIndex; i < collection.length; i++) {
		if ((fn as any)(collection[i], i, collection)) {
			return i;
		}
	}
	return -1;
}

/**
 * Iterate the collection and return the index of the element where the predicate returns true
 */
export function findLastIndex<T>(
	collection: T[],
	predicate: PredicateConvertibleTypes<T> = x => !!x,
	fromIndex = collection.length - 1,
): number {
	if (!isArray(collection)) return -1;
	const fn = createPredicate(predicate);
	for (let i = fromIndex; i >= 0; i--) {
		if ((fn as any)(collection[i], i, collection)) {
			return i;
		}
	}
	return -1;
}

/**
 * Iterate the collection and return the element where the predicate returns true
 */
export function find<T>(
	collection: T[],
	predicate: PredicateConvertibleTypes<T> = x => !!x,
	fromIndex = 0,
): T | undefined {
	const index = findIndex(collection, predicate, fromIndex);
	return index < 0 ? undefined : collection[index];
}

/**
 * Iterate the collection and return the elements where the predicate returns true
 */
export function filter<T>(
	collection: T[],
	predicate: PredicateConvertibleTypes<T> = x => !!x,
): T[] {
	return createArray(collection).filter(createPredicate(predicate) as any);
}

/**
 * Iterate the collection and return true if predicate returns true for at least one element
 */
export function some<T>(
	collection: T[],
	predicate: PredicateConvertibleTypes<T> = x => !!x,
): boolean {
	return findIndex(collection, predicate) > -1;
}

/**
 * Iterate the collection and return true if predicate returns true for all elements
 */
export function every<T>(
	collection: T[],
	predicate: PredicateConvertibleTypes<T> = x => !!x,
): boolean {
	const fn = createPredicate(predicate);
	// if we find one element which does not satisfy predicate, then return false
	return findIndex(collection, item => !(fn as any)(item)) < 0;
}

/**
 * Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee
 */
export function reduce<T, K extends keyof T, Out>(
	collection: T[],
	iteratee: K | ((item: T, index: number, collection: T[]) => unknown) = (
		x: T,
	) => x as unknown,
	accumulator: Out,
): Out {
	const fn = createIteratee<T, K>(iteratee as any);
	return createArray(collection).reduce(fn as any, accumulator);
}

/**
 * Sums up the result of iteratee over a collection
 * (iteratee derives computes its value for each item of the collection)
 */
export function sumBy<
	T extends { [Key: string | number]: number },
	K extends keyof T
>(
	collection: T[],
	iteratee: K | ((item: T, index: number, collection: T[]) => number) = (
		x: T,
	) => (x as unknown) as number,
): number {
	const fn = createIteratee<T, K>(iteratee as any);
	return createArray(collection).reduce(
		(sum: number, item, index, arr) =>
			sum + ((fn(item, index, arr) as unknown) as number),
		0,
	);
}

/**
 * Returns new collection with each element as result of it being called on iteratee function
 */

// overloaded signatures
export function map<T, K extends keyof T>(collection: T[], iteratee: K): T[K][];
export function map<T, Out>(
	collection: T[],
	iteratee?: (item: T, index: number, collection: T[]) => Out,
): Out[];

export function map<T, K extends keyof T, Out>(
	collection: T[],
	iteratee: K | ((item: T, index: number, collection: T[]) => Out) = x =>
		(x as unknown) as Out,
): Out[] {
	const fn = createIteratee<T, K, Out>(iteratee as any);
	return createArray(collection).map(fn);
}

export function flatMap<T, K extends keyof T, Out>(
	collection: T[],
	iteratee: K | ((item: T, index: number, collection: T[]) => Out) = x =>
		(x as unknown) as Out,
): Out[] {
	const fn = createIteratee<T, K, Out>(iteratee as any);
	return createArray(collection).flatMap(fn);
}

/**
 * Deep compare values
 */
export function isEqual<T>(a: T, b: T): boolean {
	if (a === b) return true; // fast path
	if (a === null || b === null) {
		return a === b;
	} else if (isArray(a) && isArray(b)) {
		if (a.length !== b.length) return false;

		for (let i = 0; i < a.length; i++) {
			if (!isEqual(a[i], b[i])) return false;
		}

		return true;
	} else if (a instanceof Date && b instanceof Date) {
		return +a === +b;
	} else if (a instanceof RegExp && b instanceof RegExp) {
		return "" + a === "" + b;
	} else if (a instanceof Set && b instanceof Set) {
		if (a.size !== b.size) return false;

		for (const v of a.values()) {
			if (!b.has(v)) return false;
		}
		return true;
	} else if (a instanceof Map && b instanceof Map) {
		if (a.size !== b.size) return false;

		for (const [k, v] of a.entries()) {
			if (!b.has(k)) return false;
			if (!isEqual(b.get(k), v)) return false;
		}
		return true;
	} else if (typeof a === "object" && typeof b === "object") {
		const entriesA = Object.entries(a);
		const keysB = Object.keys(b);
		if (entriesA.length !== keysB.length) return false;

		for (const [k, v] of entriesA) if (!isEqual(v, (b as any)[k])) return false;
		return true;
	}
	return false;
}

/**
 * Generate a range of numbers
 */
export function range(start: number, end?: number, step = 1) {
	if (typeof end === "undefined") {
		end = start;
		start = 0;
	}
	const result = [];
	for (let i = start; i < end; i += step) {
		result.push(i);
	}
	return result;
}

/**
 * Creates object to items in collection using keys from iteratee
 */
export function keyBy<T, K extends keyof T, MapKey extends string | number>(
	collection: T[],
	iteratee: K | ((item: T, index: number, collection: T[]) => MapKey),
): { [key in MapKey]: T } {
	const fn = createIteratee<T, K, MapKey>(iteratee as any);
	return createArray(collection).reduce((accumulator, item, index) => {
		const key = fn(item, index, collection);
		accumulator[key] = item;
		return accumulator;
	}, {} as { [key in MapKey]: T });
}

/**
 * Creates object to items in collection using keys from iteratee
 */
export function groupBy<T, K extends keyof T, MapKey extends string | number>(
	collection: T[],
	iteratee: K | ((item: T, index: number, collection: T[]) => MapKey),
): { [key in MapKey]: T[] } {
	const fn = createIteratee<T, K, MapKey>(iteratee as any);
	return createArray(collection).reduce((accumulator, item, index) => {
		const key = fn(item, index, collection);
		if (!accumulator[key]) accumulator[key] = [];
		accumulator[key].push(item);
		return accumulator;
	}, {} as { [key in MapKey]: T[] });
}

/**
 * Creates object using keys from iteratee
 */
export function mapKeys<
	Obj extends { [key: string]: any },
	MapKey extends string | number
>(
	object: Obj,
	iteratee: (value: Obj[keyof Obj], key: keyof Obj, collection: Obj) => MapKey,
): { [key in MapKey & string]: Obj[keyof Obj] } {
	if (!object || typeof object !== "object")
		return {} as { [key in MapKey & string]: Obj[keyof Obj] };
	return Object.entries(object).reduce((accumulator, [key, value]) => {
		const newKey = String(iteratee(value, key, object));
		accumulator[newKey as MapKey & string] = value;
		return accumulator;
	}, {} as { [key in MapKey & string]: Obj[keyof Obj] });
}

/**
 * Creates object using values from iteratee
 */
export function mapValues<
	Obj extends { [key: string]: { [innerKey: string]: any } },
	Key extends keyof Obj,
	InnerKey extends keyof Obj[Key]
>(object: Obj, iteratee: InnerKey): { [key: string]: Obj[Key][InnerKey] };
export function mapValues<
	Obj extends { [key in any]: any },
	NewV,
	K extends keyof Obj
>(
	object: Obj,
	iteratee: (value: Obj[K], key: K, collection: Obj) => NewV,
): { [key in K]: NewV };

export function mapValues<
	Obj extends { [key in any]: any },
	NewV,
	K extends keyof Obj
>(
	object: Obj,
	iteratee: (value: Obj[K], key: K, collection: Obj) => NewV,
): { [key in K]: NewV } {
	if (!object || typeof object !== "object") return {} as { [key in K]: NewV };
	return Object.entries(object).reduce((accumulator, [key, value]) => {
		let fn = iteratee;
		if (typeof iteratee === "string") {
			fn = (val: Obj[K]) => val[iteratee];
		}
		const newValue = fn(value as Obj[K], key as K, object);
		accumulator[key as K] = newValue;
		return accumulator;
	}, {} as { [key in K]: NewV });
}

/**
 * Recursively merge defaults from source object to target.
 * Unlike lodash, this implementation looks only at own properties (via Object.keys())
 */
export function defaultsDeep(target: any, ...sources: any[]) {
	if (isObjectLike(target)) {
		for (let i = 0; i < sources.length; i += 1) {
			const entries = Object.entries(sources[i]);
			for (let index = 0; index < entries.length; index += 1) {
				const [key, value] = entries[index];
				if (target[key] === undefined) {
					target[key] = value;
				} else if (isObjectLike(target[key]) && isObjectLike(value)) {
					defaultsDeep(target[key], value);
				}
			}
		}
	}
	return target;
}
