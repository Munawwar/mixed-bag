
const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);
const htmlUnescapes = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&#39;": "'",
};

function unescapeHtmlChar(key: keyof typeof htmlUnescapes): string {
	return htmlUnescapes[key];
}

export function unescape(string: string) {
	string = String(string);
	return string && reHasEscapedHtml.test(string)
		? string.replace(reEscapedHtml, unescapeHtmlChar as (k: string) => string)
		: string;
}