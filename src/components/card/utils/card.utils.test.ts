import { describe, expect, it } from "vitest";
import { buildClassName, normalizePadding } from "./card.utils";

describe("card utils", () => {
  describe("buildClassName", () => {
    it("joins truthy classes and skips falsy ones", () => {
      const result = buildClassName("card", undefined, "shadow", "", "rounded");
      expect(result).toBe("card shadow rounded");
    });

    it("returns empty string when no classes are provided", () => {
      expect(buildClassName()).toBe("");
    });
  });

  describe("normalizePadding", () => {
    it("returns default padding when value is undefined", () => {
      expect(normalizePadding()).toBe("1.5rem");
    });

    it("appends px when padding is a number", () => {
      expect(normalizePadding(32)).toBe("32px");
    });

    it("returns string values as-is", () => {
      expect(normalizePadding("2rem 3rem")).toBe("2rem 3rem");
    });
  });
});
