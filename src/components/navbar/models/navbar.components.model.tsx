export interface INavbarMenuItemProps {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  visible?: boolean;
}

export class NavbarModel {
  constructor(public readonly data: Readonly<INavbarMenuItemProps[]>) {}

  /** 🔹 เพิ่มเมนูใหม่ */
  add(item: INavbarMenuItemProps) {
    return new NavbarModel([...this.data, item]);
  }

  /** 🔹 ลบเมนู */
  remove(id: string) {
    return new NavbarModel(this.data.filter((i) => i.id !== id));
  }

  /** 🔹 อัปเดตเมนู (set ทับ field บางอัน) */
  update(id: string, patch: Partial<INavbarMenuItemProps>) {
    return new NavbarModel(this.data.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  /** 🔹 แสดงเฉพาะเมนูที่มองเห็น */
  visible() {
    return this.data.filter((i) => i.visible ?? true);
  }
}
