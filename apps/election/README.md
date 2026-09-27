# election

เว็บผลการเลือกตั้ง 66 เรียลไทม์ (Next.js 15) — หน้าเว็บเป็น client components ดึงข้อมูลผ่าน react-query จาก API routes ของตัวเอง (`/api/*`)

## Deploy

Deploy ผ่าน **OpenNext adapter** (`@opennextjs/cloudflare`) เป็น SSR worker เพราะมี API routes ที่ต้องรัน server-side จริง (รายเหตุผล: `docs/adr/0002` ที่ root)

```bash
pnpm dev:election                   # ที่ root — dev server (client ยิง API ที่ localhost:3000 คือตัวมันเอง)
pnpm --filter election preview      # preview บน workerd จริง → localhost:8787
pnpm deploy:election                # ที่ root — build + deploy
```

ข้อควรรู้:

- `NEXT_PUBLIC_API_URL` ถูก bake ตอน build — deploy script (`build:worker` ใน package.json นี้) ส่งค่า production เข้าไปผ่าน cross-env และต้องมี `/api` ป้ายท้ายเสมอ
- `/api/candidates` เป็น `force-dynamic` โดยเจตนา ห้ามเอาออก และ route ที่ self-call ต้อง derive origin จาก `API_URL` — เหตุผลทั้งหมดใน `docs/adr/0002` ที่ root
- รูปทำงานแบบ unoptimized (แพลนฟรีไม่มี optimizer) — pin ขนาดทุก `next/image` ตาม `docs/adr/0003` ที่ root

คู่มือเต็ม: `../../docs/deploying.md`
