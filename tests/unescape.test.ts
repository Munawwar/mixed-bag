import expect from "expect";
import { unescape } from "../src";

describe("unescape", () => {
	it("should unescape string", () => {
		expect(unescape("fred, barney, &amp; pebbles")).toEqual(
			"fred, barney, & pebbles",
		);
	});
});
