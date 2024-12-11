const typedArrayProto = Object.getPrototypeOf(Int8Array);
export function isTypedArray(v: any) {
	return Object.getPrototypeOf(v) === typedArrayProto;
}