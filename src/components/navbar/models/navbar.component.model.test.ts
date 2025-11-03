import { describe, expect, it } from "vitest";
import {
  INavbarMenuItemProps,
  NavbarModel,
} from "./navbar.components.model";

const seed = (): NavbarModel =>
  new NavbarModel([
    { id: "home", label: "Home", href: "/" },
    { id: "docs", label: "Docs", href: "/docs" },
    { id: "admin", label: "Admin", href: "/admin", visible: false },
  ] as Readonly<INavbarMenuItemProps[]>);

describe("NavbarModel", () => {
  it("adds a new menu item immutably", () => {
    const model = new NavbarModel([]);
    const next = model.add({ id: "blog", label: "Blog", href: "/blog" });
    expect(model.data).toEqual([]);
    expect(next.data).toEqual([
      { id: "blog", label: "Blog", href: "/blog" },
    ]);
  });

  it("removes a menu item by id immutably", () => {
    const model = seed();
    const next = model.remove("docs");

    expect(model.data.map((i) => i.id)).toEqual([
      "home",
      "docs",
      "admin",
    ]);
    expect(next.data.map((i) => i.id)).toEqual(["home", "admin"]);
  });

  it("update applies partial patch to matching id", () => {
    const model = seed();
    const next = model.update("docs", {
      label: "Documentation",
      external: true,
    });

    const origDocs = model.data.find((i) => i.id === "docs");
    const updatedDocs = next.data.find((i) => i.id === "docs");
    expect(origDocs?.label).toBe("Docs");
    expect(updatedDocs).toMatchObject({
      id: "docs",
      label: "Documentation",
      external: true,
    });
    expect(next.data.find((i) => i.id === "home")).toMatchObject({
      id: "home",
      label: "Home",
    });
  });

  it("update with non-existing id returns new model with same data", () => {
    const model = seed();
    const next = model.update("missing", { label: "X" });

    expect(next).not.toBe(model); // new instance
    expect(next.data).toEqual(model.data); // same data
  });

  it("visible returns items with visible !== false (default visible)", () => {
    const model = seed();
    const visible = model.visible();

    expect(visible.map((i) => i.id)).toEqual(["home", "docs"]);
  });
});
