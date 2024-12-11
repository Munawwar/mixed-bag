import { splitCasedWords } from "./splitCasedWords";

const multipleDashesRegex = /[-]{2,}/g;
const leadingOrTrailingDashRegex = /(^-|-$)/g;
/**
 * Convert string to kebab case
 */
export function kebabCase(val: string) {
	return splitCasedWords(val, "-")
		.replace(multipleDashesRegex, "-")
		.replace(leadingOrTrailingDashRegex, "")
		.toLowerCase();
}