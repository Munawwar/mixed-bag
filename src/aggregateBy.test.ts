import expect from "expect";
import { identity, countBy, maxBy, minBy, mean, meanBy, sum, sumBy } from ".";

describe("countBy", () => {
	it("should count by iteratee", () => {
		expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ "4": 1, "6": 2 });
		expect(countBy(["one", "two", "three"], "length")).toEqual({
			"3": 2,
			"5": 1,
		});
	});

	it("should not throw on non-array", () => {
		expect(countBy(null as any, identity)).toEqual({});
		expect(countBy(undefined as any, identity)).toEqual({});
		expect(countBy("test" as any, identity)).toEqual({});
	});
});

describe("maxBy", () => {
	const objects = [{ n: 1 }, { n: 2 }];
	it("should max by property", () => {
		expect(maxBy(objects, o => o.n)).toEqual({ n: 2 });
		expect(maxBy(objects, "n")).toEqual({ n: 2 });
	});

	it("should not throw on non-array", () => {
		expect(maxBy(null as any, identity)).toEqual(undefined);
		expect(maxBy(undefined as any, identity)).toEqual(undefined);
		expect(maxBy("test" as any, identity)).toEqual(undefined);
	});
});

describe("minBy", () => {
	const objects = [{ n: 1 }, { n: 2 }];
	it("should min by property", () => {
		expect(minBy(objects, o => o.n)).toEqual({ n: 1 });
		expect(minBy(objects, "n")).toEqual({ n: 1 });
	});

	it("should not throw on non-array", () => {
		expect(minBy(null as any, identity)).toEqual(undefined);
		expect(minBy(undefined as any, identity)).toEqual(undefined);
		expect(minBy("test" as any, identity)).toEqual(undefined);
	});
});

describe("mean", () => {
	it("should mean an array of objects", () => {
		expect(mean([4, 2, 8, 6])).toEqual(5);
	});

	it("should not throw on non-array", () => {
		expect(mean(null as any)).toBeNaN();
		expect(mean(undefined as any)).toBeNaN();
		expect(mean("test" as any)).toBeNaN();
	});
});

describe("meanBy", () => {
	const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
	it("should mean an array of objects by property", () => {
		expect(meanBy(objects, o => o.n)).toEqual(5);
	});

	it("should not throw on non-array", () => {
		expect(meanBy(null as any, identity)).toBeNaN();
		expect(meanBy(undefined as any, identity)).toBeNaN();
		expect(meanBy("test" as any, identity)).toBeNaN();
	});
});

describe("sum", () => {
	it("should sum an array of objects", () => {
		expect(sum([4, 2, 8, 6])).toEqual(20);
	});

	it("should not throw on non-array", () => {
		expect(sum(null as any)).toEqual(0);
		expect(sum(undefined as any)).toEqual(0);
		expect(sum("test" as any)).toEqual(0);
	});
});

describe("sumBy", () => {
	const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
	it("should sum an array of objects", () => {
		expect(sumBy(objects, o => o.n)).toEqual(20);
	});

	it("should not throw on non-array", () => {
		expect(sumBy(null as any, identity)).toEqual(0);
		expect(sumBy(undefined as any, identity)).toEqual(0);
		expect(sumBy("test" as any, identity)).toEqual(0);
	});

	it("should property predicate", () => {
		expect(sumBy(objects, "n")).toEqual(20);
	});
});
