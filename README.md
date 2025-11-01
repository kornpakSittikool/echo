<div align="center">

# Echo — Next.js 15 + React 19 + Tailwind 4 🚀

เว็บแอปด้วย Next.js (App Router) พร้อมสภาพแวดล้อม Dev/Watch บน Docker และแนวทางโค้ดที่อ่านง่าย ใช้ร่วมกันในทีมได้ทันที

<br />

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-20+-339933?logo=nodedotjs&logoColor=white)

</div>

## สารบัญ
- [ภาพรวม](#ภาพรวม)
- [เทคโนโลยี](#เทคโนโลยี)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [เริ่มใช้งาน](#เริ่มใช้งาน)
  - [Docker (แนะนำ)](#docker-แนะนำ)
  - [รันบนเครื่อง (ไม่ใช้ Docker)](#รันบนเครื่อง-ไม่ใช้-docker)
- [สคริปต์สำคัญ](#สคริปต์สำคัญ)
- [ESLint และกฎโค้ด](#eslint-และกฎโค้ด)
- [แนวทางการเขียนโค้ด](#แนวทางการเขียนโค้ด)
- [Troubleshooting](#troubleshooting)
- [Nginx (ตัวเลือกเสริม)](#nginx-ตัวเลือกเสริม)
- [หมายเหตุสำหรับโปรดักชัน](#หมายเหตุสำหรับโปรดักชัน)

## ภาพรวม
โปรเจกต์ Next.js ที่เตรียมโครงสร้างให้พร้อมใช้งาน ทั้งการพัฒนาแบบ Hot Reload บน Docker, การตั้งค่า ESLint แบบ Type‑Aware, และแนวทางการตั้งชื่อ/แยกคอมโพเนนต์ชัดเจนสำหรับทีม

## เทคโนโลยี
- Next.js 15, React 19
- Tailwind CSS v4
- Framer Motion, Lucide Icons
- TypeScript (strict) + Path alias `@/*`

## โครงสร้างโปรเจกต์
```
src/
  app/                # App Router (layout.tsx, page.tsx, globals.css)
  components/         # UI components (เช่น navbar/*.component.tsx, *.component.css)
public/               # รูปและไฟล์สาธารณะ
eslint.config.mjs     # คอนฟิก ESLint (Flat Config)
next.config.ts        # การตั้งค่า Next.js
tsconfig.json         # TypeScript + path alias @/*
postcss.config.mjs    # Tailwind 4
```

## เริ่มใช้งาน

### Docker (แนะนำ)
รันครั้งแรก (พร้อม Hot Reload):

```bash
docker compose up --build
```

รันรอบถัดไป:

```bash
docker compose up
```

เปิดเว็บ: http://localhost:3000

หมายเหตุสำคัญ:
- Compose ตั้งค่า watch บน Windows แล้ว (`WATCHPACK_POLLING/INTERVAL`, `CHOKIDAR_USEPOLLING/INTERVAL`)
- แก้โค้ดแล้วรีโหลดอัตโนมัติ ไม่ต้อง build image ใหม่ทุกครั้ง
- ถ้าแก้ `package.json`/`package-lock.json` หรือ `Dockerfile` ให้ build ใหม่ด้วย `docker compose up --build`

คำสั่งที่ใช้บ่อย:

```bash
# ติดตั้ง/ลบแพ็กเกจในคอนเทนเนอร์
docker compose exec client npm i <pkg>
docker compose exec client npm un <pkg>

# ปิดและล้าง (ลบ volumes + orphan)
docker compose down -v --remove-orphans
```

### รันบนเครื่อง (ไม่ใช้ Docker)
Prerequisites: Node.js 20+, npm 10+

```bash
npm ci
npm run dev
# เปิดเว็บ: http://localhost:3000
```

## สคริปต์สำคัญ
- `npm run dev` — รัน dev server (ใช้ผ่าน Docker ได้)
- `npm run build` — สร้างโปรดักชันบิลด์
- `npm run start` — รันเซิร์ฟเวอร์โปรดักชันจากผลลัพธ์ที่ build แล้ว

## ESLint และกฎโค้ด
- คอนฟิก: ESLint 9 (Flat Config) + Next.js + TypeScript‑ESLint แบบ Type‑Aware ดูไฟล์ `eslint.config.mjs`
- Ignore โฟลเดอร์มาตรฐาน: `node_modules`, `.next`, `out`, `dist`, `coverage`
- เปิด Type‑Aware สำหรับ `src/**/*.{ts,tsx}` ด้วย `parserOptions.project: true`

รันตรวจโค้ด:

```bash
npm run lint             # ตรวจอย่างเดียว
npm run lint -- --fix    # แก้ไขอัตโนมัติ
# หรือผ่าน Docker
docker compose exec client npm run lint
```

กฎสำคัญ (สรุป):
- `@typescript-eslint/no-explicit-any: error` — ห้ามใช้ `any`
- `import/no-default-export: error` — ห้าม default export (ยกเว้นไฟล์ App Router)
- `no-restricted-syntax` (ImportNamespaceSpecifier) — ห้าม `import * as X from '...'`
- `no-restricted-imports` (`../../*`, `../../../*`) — หลีกเลี่ยง relative import ลึกๆ ให้ใช้ alias `@/*`
- `eqeqeq: ['error','always']` — ใช้ `===`/`!==` เสมอ
- `no-console: warn` — `console.*` เตือน

ข้อแนะนำในการใช้งานกฎ:
- ใช้ named exports สำหรับคอมโพเนนต์: `export function Navbar() {}` + import แบบ `import { Navbar } from '@/components/navbar/navbar.component'`
- ใช้ path alias `@/*` แทน `../../..`
- หากจำเป็นต้องยกเว้นกฎ ให้ปิดเฉพาะจุดพร้อมเหตุผล เช่น:

```ts
// eslint-disable-next-line import/no-default-export -- Next.js page needs default export
export default function Page() { /* ... */ }
```

ข้อยกเว้นสำหรับ Next.js (App Router):
- ไฟล์ `src/app/**/page.tsx`, `layout.tsx` ต้องใช้ `export default` ตาม convention จึงอนุญาตให้ปิด `import/no-default-export` รายไฟล์ด้วยคอมเมนต์ด้านบน

## แนวทางการเขียนโค้ด
- โครงสร้างไฟล์
  - หน้าหลัก/เลย์เอาต์: `src/app/page.tsx`, `src/app/layout.tsx`
  - เส้นทางใหม่: เพิ่ม `src/app/<route>/page.tsx`
  - คอมโพเนนต์: `src/components/<feature>/<name>.component.tsx` + สไตล์ `*.component.css`
- คอมโพเนนต์ (React 19, Function Component)
  - ใช้ฟังก์ชันคอมโพเนนต์ + hooks มาตรฐาน, แยกคอมโพเนนต์ให้เล็กและชัดเจน
  - ตั้งชื่อไฟล์สม่ำเสมอ `<name>.component.tsx`
- สไตล์ (Tailwind 4 + CSS เฉพาะคอมโพเนนต์)
  - ใช้ Tailwind เป็นหลัก; ถ้าจำเป็นค่อยเพิ่ม `*.component.css`
  - โกลบอลสไตล์แก้ที่ `src/app/globals.css`
- แอนิเมชัน (Framer Motion)
  - ใช้ `motion.*`; เก็บ variants/objects ที่ใช้ซ้ำไว้นอกตัวคอมโพเนนต์เพื่อลด re-render
- ไอคอน (Lucide)
  - นำเข้าจาก `lucide-react` ตามการใช้งานจริง
- TypeScript
  - โหมด `strict: true` เปิดใช้งานแล้ว และใช้ path alias `@/*`

## Troubleshooting
- Hot Reload ไม่มา:
  - หยุดด้วย `Ctrl+C` แล้วรัน `docker compose up --build --remove-orphans`
  - ลบอาร์ติแฟกต์เดิม: ลบโฟลเดอร์ `.next` บนโฮสต์ (ถ้ามี)
  - รีเซ็ตสภาพแวดล้อม: `docker compose down -v && docker compose up --build`

## Nginx (ตัวเลือกเสริม)
- ใช้ทดสอบร่วมกับ Next.js โหมดพัฒนา หรือจำลอง reverse proxy เบื้องต้น (gzip/cache ไฟล์ static + headers พื้นฐาน)
- มี service `nginx` ใน `docker-compose.yml`

วิธีใช้งาน:

```bash
docker compose up
```

- Nginx: http://localhost:8080
- Next.js Dev: http://localhost:3000
- ไฟล์คอนฟิก: `nginx/default.conf` (proxy ไป `client:3000`, รองรับ WebSocket/HMR, gzip `/_next/static/*`)
- หากต้องการพอร์ต 80 ปรับ `nginx` -> `ports` เป็น `"80:80"`

## หมายเหตุสำหรับโปรดักชัน
- แยกขั้นตอน build (`next build`) และรัน (`next start`)
- วาง Nginx หน้า Next.js เพื่อเสิร์ฟ static + จัดการ headers/caching (แนะนำ Docker multi‑stage)
- หากต้องการตัวอย่าง deploy เพิ่มเติม แจ้งได้เลย

เคล็ดลับการทำงานร่วมกัน
- แยกฟีเจอร์เป็นโฟลเดอร์ย่อยใน `src/components` เพื่อให้ง่ายต่อการค้นหา/ดูแล
- รักษาการตั้งชื่อสม่ำเสมอ: `*.component.tsx`, `*.component.css`
- หลีกเลี่ยงการผูก state ลึกเกินไป; ใช้ props ให้ไหลลง และยก state ขึ้นเมื่อจำเป็น
- ตรวจสอบการรีเฟรชอัตโนมัติหลังแก้โค้ดเสมอ (ดูส่วน Troubleshooting ด้านบน)

Nginx + Reverse Proxy (ตัวเลือกเสริม)
- ใช้สำหรับทดสอบร่วมกับ Next.js ในโหมดพัฒนา หรือจำลอง reverse proxy เบื้องต้น (เปิด gzip/cache สำหรับไฟล์ static และตั้งค่า header พื้นฐาน)
- มี service `nginx` อยู่ใน `docker-compose.yml`
- วิธีใช้งาน
  - รัน: `docker compose up`
  - Nginx: http://localhost:8080
  - Next.js Dev: http://localhost:3000
- ไฟล์/การตั้งค่าที่เกี่ยวข้อง
  - คอนฟิก: `nginx/default.conf`
  - proxy ไปยัง service `client:3000`
  - รองรับ WebSocket/HMR ในโหมด dev และ gzip + cache สำหรับ `/_next/static/*`
  - หากต้องการใช้พอร์ต 80 ให้แก้ `nginx` -> `ports` เป็น "80:80" แทน "8080:80"

หมายเหตุสำหรับโปรดักชัน
- แยกขั้นตอน build (`next build`) และรัน (`next start`)
- วาง Nginx ไว้หน้าอีกชั้นเพื่อเสิร์ฟ static และจัดการ HTTP headers/caching (แนะนำ Docker multi‑stage)
- หากต้องการตัวอย่างไฟล์สำหรับ deploy โปรดแจ้งได้เลย
