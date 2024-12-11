import { splitCasedWords } from "./splitCasedWords";

const capitalizeWordsRegex = /(^| )[^ ]/g;
const multipleSpacesRegex = /[ ]{2,}/g;
/**
 * Convert string to start case
 */
export function startCase(val: string) {
	return splitCasedWords(val)
		.replace(capitalizeWordsRegex, m => m.toUpperCase())
		.replace(multipleSpacesRegex, " ")
		.trim();
}