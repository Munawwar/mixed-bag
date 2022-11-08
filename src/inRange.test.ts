import expect from "expect";
import { inRange } from ".";

describe("inRange", () => {
	it("should work with 2 arguments", () => {
		expect(inRange(3, 2, 4)).toEqual(true);
		expect(inRange(-1, 0, 3)).toEqual(false);
		expect(inRange(-3, -2, -6)).toEqual(true);
	});

	it("should work with singe argument", () => {
		expect(inRange(4, 8)).toEqual(true);
		expect(inRange(4, 2)).toEqual(false);
		expect(inRange(2, 2)).toEqual(false);
		expect(inRange(1.2, 2)).toEqual(true);
		expect(inRange(5.2, 4)).toEqual(false);
	});
});
