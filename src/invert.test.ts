import expect from "expect";
import { invert, invertBy } from ".";

describe("invert", () => {
	const object = { a: 1, b: 2, c: 1 };
	it("should invert an object", () => {
		expect(invert(object)).toEqual({ "1": "c", "2": "b" });
	});
	it("should not throw on non-object", () => {
		expect(invert(null as any)).toEqual({});
		expect(invert(undefined as any)).toEqual({});
	});
});

describe("invertBy", () => {
	const object = { a: 1, b: 2, c: 1 };
	it("should invert with no function", () => {
		expect(invertBy(object)).toEqual({ "1": ["a", "c"], "2": ["b"] });
	});

	it("should invert with function", () => {
		expect(invertBy(object, v => `group${v}`)).toEqual({
			group1: ["a", "c"],
			group2: ["b"],
		});
	});

	it("should not throw on non-object", () => {
		expect(invertBy(null as any)).toEqual({});
		expect(invertBy(undefined as any)).toEqual({});
	});
});
