import { describe, expect, it } from "vitest";
import { NavbarService } from "./navbar.component.service";

describe("NavbarService.getMenuItems", () => {
  it("returns only visible menu items in correct order", () => {
    const service = new NavbarService();
    const items = service.getMenuItems();
    expect(items.find((i) => i.id === "admin")).toBeUndefined();
    expect(items.map((i) => i.id)).toEqual(["home", "docs", "github"]);
  });

  it("applies label update to docs", () => {
    const service = new NavbarService();
    const items = service.getMenuItems();
    const docs = items.find((i) => i.id === "docs");
    expect(docs?.label).toBe("Documentation");
  });

  it("marks github as external with the correct href", () => {
    const service = new NavbarService();
    const items = service.getMenuItems();
    const github = items.find((i) => i.id === "github");
    expect(github?.external).toBe(true);
    expect(github?.href).toBe("https://github.com/your/repo");
  });
});
