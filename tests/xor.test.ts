import expect from "expect";
import { xor, xorBy } from "../src";

describe("xor", () => {
	it("should remove items specified in order", () => {
		expect(xor([2, 1], [2, 3])).toEqual([1, 3]);
		expect(xor([3, 1, 3], [1, 0, 2], [0, 4])).toEqual([3, 2, 4]);
	});

	it("should not throw on non-array", () => {
		expect(xor(null as any)).toEqual([]);
		expect(xor(undefined as any)).toEqual([]);
		expect(xor("test" as any)).toEqual([]);
	});
});

describe("xorBy", () => {
	it("should remove items specified in order", () => {
		expect(xorBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2, 3.4]);
		expect(xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x")).toEqual([{ x: 2 }]);
	});

	it("should not throw on non-array", () => {
		expect(xorBy(null as any)).toEqual([]);
		expect(xorBy(undefined as any)).toEqual([]);
		expect(xorBy("test" as any)).toEqual([]);
	});
});
