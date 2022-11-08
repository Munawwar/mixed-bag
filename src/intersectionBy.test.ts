import expect from "expect";
import { intersectionBy } from ".";

describe("intersectionBy", () => {
	it("should find intersection by custom function", () => {
		expect(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([2.1]);
	});
	it("should find intersection by object short-hand", () => {
		expect(intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x")).toEqual([
			{ x: 1 },
		]);
	});
});
