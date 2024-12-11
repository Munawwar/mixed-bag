import { splitCasedWords } from "./splitCasedWords";

const multipleUnderscoresRegex = /[_]{2,}/g;
const leadingOrTrailingUnderscoreRegex = /(^_|_$)/g;
/**
 * Convert string to snake case
 */
export function snakeCase(val: string) {
	return splitCasedWords(val, "_")
		.replace(multipleUnderscoresRegex, "_")
		.replace(leadingOrTrailingUnderscoreRegex, "")
		.toLowerCase();
}