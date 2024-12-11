import expect from "expect";
import { without } from "../src";

describe("without", () => {
	it("should remove items specified in order", () => {
		expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
	});

	it("should not throw on non-array", () => {
		expect(without(null as any)).toEqual([]);
		expect(without(undefined as any)).toEqual([]);
		expect(without("test" as any)).toEqual([]);
	});
});
