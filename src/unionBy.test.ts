import expect from "expect";
import { unionBy } from ".";

describe("unionBy", () => {
	it("should do union by custom function", () => {
		expect(unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
	});
	it("should do union by object short-hand", () => {
		expect(unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x")).toEqual([
			{ x: 1 },
			{ x: 2 },
		]);
	});
});
