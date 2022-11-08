function splitCasedWords(val: string, separator = " ") {
	return String(val)
		.replace(/[^\p{L}\p{Nd}]+/gu, separator) // replace non-alphanumeric characters
		.replace(/(\p{Lu}\p{Ll})/gu, `${separator}$1`) // e.g. "Ab" -> " Ab"
		.replace(/(\p{Ll}\p{Lu}|\p{L}\p{Nd}|\p{Nd}\p{L})/gu, m =>
			m.split("").join(separator),
		); // e.g. "aB" -> "a B" or "A1" -> "A 1" or "1A" -> "1 A"
}

/**
 * Convert string to camel case
 */
export function camelCase(val: string) {
	return splitCasedWords(val)
		.replace(
			/(\p{L})(\p{L}*)/gu,
			(m, g1, g2 = "") => `${g1.toUpperCase()}${g2.toLowerCase()}`,
		) // e.g HTML -> Html
		.replace(/^[ ]*\p{Lu}+/u, m => m.toLowerCase()) // downcase the first set of capital letters
		.replace(/ /g, "");
}

/**
 * Convert string to snake case
 */
export function snakeCase(val: string) {
	return splitCasedWords(val, "_")
		.replace(/[_]{2,}/g, "_")
		.replace(/(^_|_$)/g, "")
		.toLowerCase();
}

/**
 * Convert string to kebab case
 */
export function kebabCase(val: string) {
	return splitCasedWords(val, "-")
		.replace(/[-]{2,}/g, "-")
		.replace(/(^-|-$)/g, "")
		.toLowerCase();
}

/**
 * Convert string to start case
 */
export function startCase(val: string) {
	return splitCasedWords(val)
		.replace(/(^| )[^ ]/g, m => m.toUpperCase())
		.replace(/[ ]{2,}/g, " ")
		.trim();
}

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

/**
 * Splits pascal/camel/snake case words and lower cases them.
 */
export function lowerCase(val: string) {
	return splitCasedWords(val).trim().toLowerCase();
}

/**
 * Splits pascal/camel/snake case words and upper cases them.
 */
export function upperCase(val: string) {
	return splitCasedWords(val).trim().toUpperCase();
}
