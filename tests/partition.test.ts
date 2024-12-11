import expect from "expect";
import { partition } from "../src";

const users = [
	{ user: "barney", age: 36, active: false },
	{ user: "fred", age: 40, active: true },
	{ user: "pebbles", age: 1, active: false },
];

describe("partition", () => {
	it("should partition array", () => {
		expect(partition(users, o => o.active)).toEqual([
			[{ user: "fred", age: 40, active: true }],
			[
				{ user: "barney", age: 36, active: false },
				{ user: "pebbles", age: 1, active: false },
			],
		]);
	});

	it("should not throw on non-array", () => {
		expect(partition(null as any)).toEqual([[], []]);
		expect(partition(undefined as any)).toEqual([[], []]);
		expect(partition("test" as any)).toEqual([[], []]);
	});

	it("should use object predicate", () => {
		expect(partition(users, { age: 1, active: false })).toEqual([
			[{ user: "pebbles", age: 1, active: false }],
			[
				{ user: "barney", age: 36, active: false },
				{ user: "fred", age: 40, active: true },
			],
		]);
	});

	it("should use array predicate", () => {
		expect(partition(users, ["active", false])).toEqual([
			[
				{ user: "barney", age: 36, active: false },
				{ user: "pebbles", age: 1, active: false },
			],
			[{ user: "fred", age: 40, active: true }],
		]);
	});

	it("should use property predicate", () => {
		expect(partition(users, "active")).toEqual([
			[{ user: "fred", age: 40, active: true }],
			[
				{ user: "barney", age: 36, active: false },
				{ user: "pebbles", age: 1, active: false },
			],
		]);
	});
});
