import {
  INavbarMenuItemProps,
  NavbarModel,
} from "./models/navbar.components.model";

export class NavbarService {
  getMenuItems(): INavbarMenuItemProps[] {
    const base = new NavbarModel([])
      .add({ id: "home", label: "Home", href: "/" })
      .add({ id: "docs", label: "Docs", href: "/docs" })
      .add({ id: "admin", label: "Admin", href: "/admin" })
      .add({
        id: "github",
        label: "GitHub",
        href: "https://github.com/your/repo",
        external: true,
      });

    const updated = base
      .update("docs", { label: "Documentation" })
      .update("admin", { visible: false });

    return updated.visible();
  }
}
