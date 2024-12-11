import { isObjectLike } from "./isObjectLike";

const objectPrototype = Object.getPrototypeOf({});
export function isPlainObject(val: any) {
	if (!isObjectLike(val)) return false;
	return Object.getPrototypeOf(val) === objectPrototype;
}