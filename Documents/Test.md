# Unit Test Suite Overview

โฟลเดอร์นี้รวบรวมสคริปต์และการตั้งค่าทั้งหมดที่ใช้สำหรับทดสอบด้วย Vitest โดยเน้นเฉพาะไฟล์ `.ts` ตามข้อกำหนดของโปรเจ็กต์

## พื้นฐานที่ตั้งค่าไว้

- **Test runner**: Vitest (`npm run test`)
- **Coverage**: `npm run test:coverage` (ใช้ provider `v8` ส่งออกเป็น text + lcov)
- **Environment**: `jsdom` (เหมาะกับการทดสอบที่ต้องสัมผัส DOM)
- **Matcher เพิ่มเติม**: `@testing-library/jest-dom` ผ่านไฟล์ `vitest.setup.ts`
- **Path alias**: ใช้ `@` ชี้ไปที่ `src/` ตาม Next.js/TS config

## รายการเทสที่มีอยู่

| ไฟล์ | สิ่งที่ทดสอบ | หมายเหตุ |
|------|--------------|----------|
| `src/components/card/utils/card.utils.test.ts` | ฟังก์ชัน `buildClassName` และ `normalizePadding` | ตรวจสอบการรวม className, การแปลง padding |
| `src/components/card/text/card.text.test.ts` | ตัว parser `parseLinesToChunks` | ครอบคลุม paragraph, spacer, list, heading, rich inputs |
| `src/components/card/card.component.test.tsx` | (ไม่ถูกรันใน workflow ปัจจุบัน) การ render การ์ดและ helper `formatCardText` | มีไว้สำหรับอ้างอิง/ขยายในอนาคต หากนโยบายอนุญาตการทดสอบ `.tsx` |

> หมายเหตุ: Vitest ถูกตั้งค่าให้รันเฉพาะ `.ts` ทดสอบตามเงื่อนไขล่าสุด ดังนั้นไฟล์ `.test.tsx` จะไม่ถูกรวมอยู่ในการรันหรือ coverage โดยดีฟอลต์

## วิธีรัน

```bash
npm run test          # รันทุก test (.ts)
npm run test:coverage # รัน test พร้อมเก็บ coverage
```

ผลลัพธ์ coverage จะอยู่ในโฟลเดอร์ `coverage/` และสามารถเปิด `coverage/lcov-report/index.html` เพื่อดูแบบกราฟิกได้
