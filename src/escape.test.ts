import expect from "expect";
import { escape } from ".";

describe("escape", () => {
	it("should escape string", () => {
		expect(escape("fred, barney, & pebbles")).toEqual(
			"fred, barney, &amp; pebbles",
		);
	});
});
