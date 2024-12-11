const nonAlphanumericRegex = /[^\p{L}\p{Nd}]+/gu;
const uThenLRegex = /(\p{Lu}\p{Ll})/gu;
const otherCasesRegex = /(\p{Ll}\p{Lu}|\p{L}\p{Nd}|\p{Nd}\p{L})/gu;
export function splitCasedWords(val: string, separator = " ") {
	return String(val)
		.replace(nonAlphanumericRegex, separator) // replace non-alphanumeric characters
		.replace(uThenLRegex, `${separator}$1`) // e.g. "Ab" -> " Ab"
		.replace(otherCasesRegex, m => m.split("").join(separator)); // e.g. "aB" -> "a B" or "A1" -> "A 1" or "1A" -> "1 A"
}
