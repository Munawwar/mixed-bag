import expect from "expect";
import { zip, unzip } from ".";

describe("zip", () => {
	it("should zip", () => {
		expect(zip(["a", "b"], [1, 2], [true, false])).toEqual([
			["a", 1, true],
			["b", 2, false],
		]);

		// More tricky case, where one array is longer than the others
		expect(zip(["a", "b"], [1, 2, 3], [true, false])).toEqual([
			["a", 1, true],
			["b", 2, false],
			[undefined, 3, undefined],
		]);
	});

	it("should not throw on non-array", () => {
		expect(zip(null as any)).toEqual([]);
		expect(zip(undefined as any)).toEqual([]);
		expect(zip("test" as any)).toEqual([]);
	});
});

describe("unzip", () => {
	it("should unzip zipped arrays", () => {
		const arrays = [
			["a", "b"],
			[1, 2],
			[true, false],
		];
		expect(unzip(zip(...arrays))).toEqual(arrays);

		// More tricky case
		expect(
			unzip([
				["a", 1],
				["b", 2, false],
			]),
		).toEqual([
			["a", "b"],
			[1, 2],
			[undefined, false],
		]);
	});
});
