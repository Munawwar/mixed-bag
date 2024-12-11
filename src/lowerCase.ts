import { splitCasedWords } from "./splitCasedWords";

/**
 * Splits pascal/camel/snake case words and lower cases them.
 */
export function lowerCase(val: string) {
	return splitCasedWords(val).trim().toLowerCase();
}