import { splitCasedWords } from "./splitCasedWords";

const multipleLettersRegex = /(\p{L})(\p{L}*)/gu;
const firstCapitalLettersRegex = /^[ ]*\p{Lu}+/u;
const spaceRegex = / /g;
/**
 * Convert string to camel case
 */
export function camelCase(val: string) {
	return splitCasedWords(val)
		.replace(
			multipleLettersRegex,
			(m, g1, g2 = "") => `${g1.toUpperCase()}${g2.toLowerCase()}`,
		) // e.g HTML -> Html
		.replace(firstCapitalLettersRegex, m => m.toLowerCase()) // downcase the first set of capital letters
		.replace(spaceRegex, "");
}
