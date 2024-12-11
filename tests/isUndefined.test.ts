import expect from "expect";
import { isUndefined } from "../src";

describe("isUndefined", () => {
	it("should return true for undefined", () => {
		expect(isUndefined(undefined)).toEqual(true);
	});
	it("should return false for null", () => {
		expect(isUndefined(null)).toEqual(false);
	});
});
