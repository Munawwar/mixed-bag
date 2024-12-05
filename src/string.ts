const splitCasedWords = (() => {
	const nonAlphanumericRegex = /[^\p{L}\p{Nd}]+/gu;
	const uThenLRegex = /(\p{Lu}\p{Ll})/gu;
	const otherCasesRegex = /(\p{Ll}\p{Lu}|\p{L}\p{Nd}|\p{Nd}\p{L})/gu;
	return function splitCasedWords(val: string, separator = " ") {
		return String(val)
			.replace(nonAlphanumericRegex, separator) // replace non-alphanumeric characters
			.replace(uThenLRegex, `${separator}$1`) // e.g. "Ab" -> " Ab"
			.replace(otherCasesRegex, m => m.split("").join(separator)); // e.g. "aB" -> "a B" or "A1" -> "A 1" or "1A" -> "1 A"
	};
})();

/**
 * Convert string to camel case
 */
export const camelCase = (() => {
	const multipleLettersRegex = /(\p{L})(\p{L}*)/gu;
	const firstCapitalLettersRegex = /^[ ]*\p{Lu}+/u;
	const spaceRegex = / /g;
	return function camelCase(val: string) {
		return splitCasedWords(val)
			.replace(
				multipleLettersRegex,
				(m, g1, g2 = "") => `${g1.toUpperCase()}${g2.toLowerCase()}`,
			) // e.g HTML -> Html
			.replace(firstCapitalLettersRegex, m => m.toLowerCase()) // downcase the first set of capital letters
			.replace(spaceRegex, "");
	};
})();

/**
 * Convert string to snake case
 */
export const snakeCase = (() => {
	const multipleUnderscoresRegex = /[_]{2,}/g;
	const leadingOrTrailingUnderscoreRegex = /(^_|_$)/g;
	return function snakeCase(val: string) {
		return splitCasedWords(val, "_")
			.replace(multipleUnderscoresRegex, "_")
			.replace(leadingOrTrailingUnderscoreRegex, "")
			.toLowerCase();
	};
})();

/**
 * Convert string to kebab case
 */
export const kebabCase = (() => {
	const multipleDashesRegex = /[-]{2,}/g;
	const leadingOrTrailingDashRegex = /(^-|-$)/g;
	return function kebabCase(val: string) {
		return splitCasedWords(val, "-")
			.replace(multipleDashesRegex, "-")
			.replace(leadingOrTrailingDashRegex, "")
			.toLowerCase();
	};
})();

/**
 * Convert string to start case
 */
export const startCase = (() => {
	const capitalizeWordsRegex = /(^| )[^ ]/g;
	const multipleSpacesRegex = /[ ]{2,}/g;
	return function startCase(val: string) {
		return splitCasedWords(val)
			.replace(capitalizeWordsRegex, m => m.toUpperCase())
			.replace(multipleSpacesRegex, " ")
			.trim();
	};
})();

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
