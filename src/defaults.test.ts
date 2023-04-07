import expect from "expect";
import { defaults } from ".";

describe("defaults", () => {
	it("should assign defaults", () => {
		let object = defaults({ a: 1 }, { b: 2 }, { a: 3 });
		expect(object).toEqual({ a: 1, b: 2 });

		// more tricky case with repeating 'b' value. It should take the first 'b' value
		object = defaults({ a: 1 }, { b: 2 }, { b: 3 }, { a: 3 });
		expect(object).toEqual({ a: 1, b: 2 });
	});
});
