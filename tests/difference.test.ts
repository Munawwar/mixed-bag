import expect from "expect";
import { difference } from "../src";

describe("difference", () => {
	it("should find difference", () => {
		expect(difference([2, 1], [2, 3])).toEqual([1]);
	});
});
