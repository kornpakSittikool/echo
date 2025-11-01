Echo — Next.js 15 + React 19 + Tailwind 4

โปรเจกต์เว็บด้วย Next.js (App Router) สำหรับการพัฒนาแบบ Dev/Watch ด้วย Docker พร้อมแนวทางโค้ดที่ชัดเจนสำหรับทีม

เทคโนโลยีหลัก
- Next.js 15, React 19
- Tailwind CSS v4
- Framer Motion, Lucide Icons
- TypeScript (strict) + Path alias `@/*`

โครงสร้างหลักของโปรเจกต์
- `src/app` — App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components` — UI components (เช่น `navbar/navbar.component.tsx`, `navbar.component.css`)
- `public` — รูปภาพและไฟล์สาธารณะ
- รากโปรเจกต์: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`

เริ่มใช้งาน (แนะนำ: Docker Dev/Watch)
- รันครั้งแรก (hot reload พร้อมใช้งาน):
  - `docker compose up --build`
- รันรอบถัดไป:
  - `docker compose up`
- เปิดเว็บ: http://localhost:3000

หมายเหตุสำคัญ
- Compose ตั้งค่าการ watch ด้วย polling บน Windows แล้ว (`WATCHPACK_POLLING/INTERVAL`, `CHOKIDAR_USEPOLLING/INTERVAL`).
- เมื่อแก้โค้ดในโฟลเดอร์โปรเจกต์ หน้าเว็บจะรีโหลดอัตโนมัติ ไม่ต้อง build image ใหม่ทุกครั้ง
- ต้อง build ใหม่เมื่อแก้ `package.json`/`package-lock.json` หรือ `Dockerfile`:
  - `docker compose up --build`

คำสั่งที่ใช้บ่อย (ระหว่างพัฒนา)
- ติดตั้งแพ็กเกจ: `docker compose exec client npm i <pkg>`
- ลบแพ็กเกจ: `docker compose exec client npm un <pkg>`
- ปิด/ล้างให้สะอาด (ลบ volumes และ orphan): `docker compose down -v --remove-orphans`

ถ้า hot reload ไม่ทำงาน
- หยุดด้วย `Ctrl+C` แล้วรัน `docker compose up --build --remove-orphans`
- ลบแคช/อาร์ติแฟกต์ก่อนหน้า: ลบโฟลเดอร์ `.next` บนโฮสต์ (ถ้ามี)
- รีเซ็ตสภาพแวดล้อม: `docker compose down -v && docker compose up --build`

รันบนเครื่อง (ไม่ใช้ Docker)
- Prerequisites: Node.js 20+, npm 10+
- ติดตั้ง dependencies: `npm ci`
- รัน dev: `npm run dev`
- เปิดเว็บ: http://localhost:3000

แนวทางการเขียนโค้ด
- โครงสร้างไฟล์
  - หน้าหลัก/เลย์เอาต์: `src/app/page.tsx`, `src/app/layout.tsx`
  - เส้นทางใหม่: เพิ่มไดเรกทอรี `src/app/<route>/page.tsx`
  - คอมโพเนนต์: `src/components/<feature>/<name>.component.tsx` + สไตล์คู่กัน `*.component.css`
- คอมโพเนนต์ (React 19, Function Component เท่านั้น)
  - ใช้ฟังก์ชันคอมโพเนนต์และ hooks มาตรฐาน, ทำคอมโพเนนต์ให้เล็ก/ชัดเจน
  - ตั้งชื่อไฟล์สม่ำเสมอแบบ `<name>.component.tsx`
- สไตล์ (Tailwind 4 + CSS เฉพาะคอมโพเนนต์)
  - ใช้ Tailwind เป็นหลัก; ถ้าจำเป็นเพิ่ม CSS คู่ไฟล์ (`*.component.css`)
  - โกลบอลสไตล์แก้ที่ `src/app/globals.css`
- แอนิเมชัน (Framer Motion)
  - ใช้ `motion.*`; เก็บ variants/object ที่ใช้ซ้ำไว้นอกตัวคอมโพเนนต์เพื่อลด re-render
- ไอคอน (Lucide)
  - นำเข้าไอคอนจาก `lucide-react` ตามการใช้งานจริง
- TypeScript
  - โหมด `strict: true` เปิดใช้งานแล้ว และใช้ path alias `@/*` จาก `tsconfig.json`

สคริปต์สำคัญ
- `npm run dev` — รัน dev server (ใช้ใน Docker ผ่าน compose อยู่แล้ว)
- `npm run build` — สร้างโปรดักชันบิลด์
- `npm run start` — รันเซิร์ฟเวอร์โปรดักชันจากผลลัพธ์ที่ build แล้ว

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
