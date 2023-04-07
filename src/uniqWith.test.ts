import expect from "expect";
import { uniqWith, isEqual } from ".";

describe("uniqWith", () => {
	it("should work with a custom comparator", () => {
		expect(
			uniqWith(
				[
					{ x: 1, y: 2 },
					{ x: 2, y: 1 },
					{ x: 1, y: 2 },
				],
				isEqual,
			),
		).toEqual([
			{ x: 1, y: 2 },
			{ x: 2, y: 1 },
		]);
	});
});
