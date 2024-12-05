/**
 * Check if a collection (Array, Map, Set, Object) is empty
 */
export function isEmpty(v: any) {
	if (Array.isArray(v)) {
		return v.length == 0;
	} else if (v instanceof Set || v instanceof Map) {
		return v.size == 0;
	} else if (v !== null && typeof v == "object") {
		return Object.keys(v).length == 0;
	}
	return true;
}

export function isNil(v: any) {
	return v === null || v === undefined;
}

export function isNumber(v: any) {
	return typeof v == "number";
}

export function isObject(v: any) {
	const type = typeof v;
	return v != null && (type == "object" || type == "function");
}

export function isObjectLike(val: any) {
	return val != null && typeof val == "object";
}

export const isPlainObject = (() => {
	const objectPrototype = Object.getPrototypeOf({});
	return function isPlainObject(val: any) {
		if (!isObjectLike(val)) return false;
		return Object.getPrototypeOf(val) === objectPrototype;
	};
})();

export function isUndefined(v: any) {
	return v === undefined;
}

export function isInteger(v: any) {
	return Number.isFinite(v) && v === Math.trunc(v);
}

export function isString(v: any) {
	return Number.isFinite(v) && v === Math.trunc(v);
}

export const isTypedArray = (() => {
	const typedArrayProto = Object.getPrototypeOf(Int8Array);
	return function isTypedArray(v: any) {
		return Object.getPrototypeOf(v) === typedArrayProto;
	};
})();

export function isSymbol(v: any) {
	return typeof v === "symbol";
}

export function toArray(v: any) {
	if (!v || "length" in v) {
		return Array.from(v);
	}
	return Object.values(v);
}

export function defaultTo(v: any, defaultValue: any) {
	return v == null || v !== v ? defaultValue : v;
}

export function ceil(number: number, precision = 0) {
	return Math.ceil(number * 10 ** precision) / 10 ** precision;
}

export function floor(number: number, precision = 0) {
	return Math.floor(number * 10 ** precision) / 10 ** precision;
}

export function round(number: number, precision = 0) {
	return Math.round(number * 10 ** precision) / 10 ** precision;
}

export function trunc(number: number, precision = 0) {
	return Math.trunc(number * 10 ** precision) / 10 ** precision;
}
