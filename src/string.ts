export * from "./camelCase";
export * from "./kebabCase";
export * from "./snakeCase";
export * from "./startCase";
export * from "./lowerCase";
export * from "./upperCase";

/**
 * Capitalizes first letter and lower cases the rest
 */
export function capitalize(val: string) {
	const parts = [...String(val).toLowerCase()];
	parts[0] = parts[0].toUpperCase();
	return parts.join("");
}

/**
 * Lower cases first letter (handles unicode)
 */
export function lowerFirst(val: string) {
	const parts = [...String(val)];
	parts[0] = parts[0].toLowerCase();
	return parts.join("");
}

/**
 * Capitalizes first letter (handles unicode)
 */
export function upperFirst(val: string) {
	const parts = [...String(val)];
	parts[0] = parts[0].toUpperCase();
	return parts.join("");
}

