import expect from "expect";
import { differenceBy } from "../src";

describe("differenceBy", () => {
	it("should find difference by object short-hand", () => {
		expect(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2]);
	});
	it("should find difference by custom function", () => {
		expect(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], "x")).toEqual([
			{ x: 2 },
		]);
	});
});
