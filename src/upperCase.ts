import { splitCasedWords } from "./splitCasedWords";

/**
 * Splits pascal/camel/snake case words and upper cases them.
 */
export function upperCase(val: string) {
	return splitCasedWords(val).trim().toUpperCase();
}
