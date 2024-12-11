import expect from "expect";
import { clamp } from "../src";

describe("clamp", () => {
	it("should clamp to lower bound", () => {
		expect(clamp(-10, -5, 5)).toEqual(-5);
		expect(clamp(1, -5, 5)).toEqual(1);
	});

	it("should clamp to upper bound", () => {
		expect(clamp(10, -5, 5)).toEqual(5);
		expect(clamp(1, -5, 5)).toEqual(1);
	});

	it("should clamp when lower bound is unspecified", () => {
		expect(clamp(5, 3)).toEqual(3);
		expect(clamp(-5, 3)).toEqual(-5);
	});
});
