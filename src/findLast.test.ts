import expect from "expect";
import { findLast } from ".";

const users = [
	{ user: "barney", age: 36, active: true },
	{ user: "fred", age: 40, active: false },
	{ user: "pebbles", age: 1, active: true },
];

describe("findLast", () => {
	it("should find in array", () => {
		expect(findLast([1, 2, 3, 1], n => n >= 2)).toEqual(3);
	});

	it("should not throw on non-array", () => {
		expect(findLast(null as any)).toEqual(undefined);
		expect(findLast(undefined as any)).toEqual(undefined);
		expect(findLast("test" as any)).toEqual(undefined);
	});

	it("should findLast from index", () => {
		expect(findLast([1, 2, 3], v => v < 3, 1)).toEqual(2);
	});

	it("should use iteratee shorthand", () => {
		expect(findLast(users, { age: 1, active: true })).toEqual({
			user: "pebbles",
			age: 1,
			active: true,
		});
	});

	it("should array predicate", () => {
		expect(findLast(users, ["active", false])).toEqual({
			user: "fred",
			age: 40,
			active: false,
		});
	});

	it("should property predicate", () => {
		expect(findLast(users, "active")).toEqual({
			user: "pebbles",
			age: 1,
			active: true,
		});
	});
});
