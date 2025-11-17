# Card Component Guide

คอมโพเนนต์ `Card` ถูกออกแบบมาให้ reuse ง่าย พร้อมมี helper สำหรับจัดการข้อความแบบ rich content ได้สะดวก รายละเอียดทั้งหมดรวมอยู่ในไฟล์นี้

## การติดตั้ง / import

```tsx
import Card, { formatCardText } from "@/components/card/card.component";
```

## Props ที่รองรับ

| prop        | ประเภท                | ค่าเริ่มต้น | รายละเอียด |
|-------------|-----------------------|--------------|-------------|
| `children`  | `ReactNode`           | —            | เนื้อหาภายในการ์ด ใช้ได้ทั้ง JSX ปกติหรือผลลัพธ์จาก `formatCardText` |
| `padding`   | `number \| string`    | `1.5rem`     | กำหนดระยะห่างภายในการ์ด ถ้าให้เป็น number จะตีเป็น px ให้อัตโนมัติ ส่วน string สามารถใช้ shorthand เช่น `"1rem 2rem"` หรือ `clamp(1rem, 4vw, 2.5rem)` |
| `className` | `string`              | —            | ใช้ต่อ tailwind class เพิ่มเติม เช่น ปรับสี / เงา / layout |
| `style`     | `CSSProperties`       | —            | ใช้ในกรณีที่ต้องการ override inline style โดยตรง เช่น กำหนด `style={{ padding: "24px 32px" }}` (จะมี priority มากกว่า prop `padding`) |

> หมายเหตุ: ภายใน component จะรวม `className` กับ `card` ให้ทันที เพราะฉะนั้นอย่าลืมใส่เฉพาะคลาสที่ต้องการเพิ่ม

## Helper: `formatCardText`

จุดเด่นของ card ตัวนี้คือ helper `formatCardText` ที่แปลงโครงสร้างข้อมูลให้ง่ายต่อการเขียนข้อความยาว ๆ เช่นหัวข้อ หลายบรรทัด bullet list หรือ spacer ช่องว่าง โดยไม่ต้องเขียน `<p>` / `<ul>` เอง

### รูปแบบข้อมูลที่รับได้

```ts
type CardTextInput =
  | string                                      // ใช้เปิดย่อหน้าปกติ, ถ้าขึ้นต้น "- " จะเป็น bullet
  | { type: "h1" | "h2" | "h3"; text: string } // heading
  | { type: "p"; text: string }                 // paragraph
  | { type: "list"; items: string[] }           // bullet list แบบกำหนดเอง
  | { type: "spacer" };                         // เว้นช่องว่าง
```

- string ว่าง (`""`) จะถูกตีเป็น spacer ให้อัตโนมัติ
- string ที่เริ่มด้วย `- ` จะเข้า list buffer เพื่อสร้าง bullet ให้ต่อเนื่อง

### ตัวอย่างการใช้งาน

```tsx
<Card padding={32}>
  {formatCardText([
    { type: "h1", text: "Echo Studio" },
    {
      type: "p",
      text: "สร้างประสบการณ์เว็บที่ดูสะอาด เรียบหรู และสบายตา",
    },
    { type: "h3", text: "จุดเด่น" },
    {
      type: "list",
      items: [
        "gradients ที่นุ่มนวล",
        "glass cards ที่โปร่งใส",
        "motion ไหลลื่น",
      ],
    },
  ])}
</Card>
```

หรือถ้าอยากให้ bullet สั้น ๆ ก็สามารถใช้ string ธรรมดา

```tsx
<Card>
  {formatCardText([
    { type: "h2", text: "Tips" },
    "ตั้งค่า padding เป็นตัวเลขหรือ string",
    "- numeric => px",
    "- string => 1rem 2rem",
  ])}
</Card>
```

## การปรับแต่งเพิ่มเติม

1. **สีพื้นหลัง / เงา** – ที่ไฟล์ `card.component.css` มี class `.card` ใช้ `@layer components` สามารถแก้ไขหรือ override ผ่าน `className` ได้ เช่น `className="bg-white/80 shadow-none"`  
2. **ระยะห่างภายใน** – ใช้ prop `padding` เป็น number หรือ string ได้ทันที, หรือระบุ `style={{ padding: "20px 30px" }}` หากต้องการค่าเฉพาะบุคคล  
3. **Typography** – class `.card__rich-text`, `.card__heading` ฯลฯ ถูกเตรียมไว้ให้ใช้ tailwind @apply แล้ว หากต้องการฟอนต์หรือสีเฉพาะสามารถแก้ใน CSS ตรงนั้นได้เลย

## โครงสร้างไฟล์

```
src/components/card/
 ├─ card.component.tsx   // Logic ของ Card + helper formatCardText
 ├─ card.component.css   // สไตล์โดยใช้ @apply
 └─ README.md            // ไฟล์เอกสาร (ไฟล์นี้)
```

ด้วยรูปแบบนี้ เมื่อต้องการเพิ่มองค์ประกอบใหม่ เช่น footer, CTA button หรือ modifier class พิเศษ ก็สามารถแยกเป็นไฟล์ย่อยในโฟลเดอร์ `card/` แล้ว import เพิ่มใน `card.component.tsx` ได้ทันที
