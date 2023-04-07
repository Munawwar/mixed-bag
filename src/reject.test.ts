import expect from "expect";
import { reject } from ".";

const users = [
	{ user: "barney", age: 36, active: false },
	{ user: "fred", age: 40, active: true },
];

describe("reject", () => {
	it("should filter falsy values from array", () => {
		expect(reject(users, o => !o.active)).toEqual([
			{ user: "fred", age: 40, active: true },
		]);
	});

	it("should not throw on non-array", () => {
		expect(reject(null as any)).toEqual([]);
		expect(reject(undefined as any)).toEqual([]);
		expect(reject("test" as any)).toEqual([]);
	});

	it("should use object predicate", () => {
		expect(reject(users, { age: 40, active: true })).toEqual([
			{ user: "barney", age: 36, active: false },
		]);
	});

	it("should use array predicate", () => {
		expect(reject(users, ["active", false])).toEqual([
			{ user: "fred", age: 40, active: true },
		]);
	});

	it("should use property predicate", () => {
		expect(reject(users, "active")).toEqual([
			{ user: "barney", age: 36, active: false },
		]);
	});
});
