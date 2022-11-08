import expect from "expect";
import { union } from ".";

describe("union", () => {
	it("should do union on numbers", () => {
		expect(union([2], [1, 2])).toEqual([2, 1]);
	});
});
