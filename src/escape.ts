const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
const htmlEscapes = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

function escapeHtmlChar(key: keyof typeof htmlEscapes): string {
	return htmlEscapes[key];
}

export function escape(string: string) {
	string = String(string);
	return string && reHasUnescapedHtml.test(string)
		? string.replace(reUnescapedHtml, escapeHtmlChar as (k: string) => string)
		: string;
}
