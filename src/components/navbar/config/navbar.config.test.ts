import { describe, expect, it } from "vitest";
import { NAV_ITEMS } from "./navbar.config";

describe("NAV_ITEMS", () => {
  const expected = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ];

  it("exports the expected labels and hrefs in order", () => {
    expect(NAV_ITEMS).toEqual(expected);
  });

  it("has unique labels and hrefs", () => {
    const labels = NAV_ITEMS.map((item) => item.label);
    const hrefs = NAV_ITEMS.map((item) => item.href);
    expect(new Set(labels).size).toBe(labels.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
