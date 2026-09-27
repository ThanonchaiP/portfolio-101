# portfolio

Personal portfolio ธีม VS Code (Next.js 16) — เพจทั้งหมดเป็น static ล้วน

## Deploy

Deploy เป็น **Static Assets worker** (ไม่มี server): `next build` แบบ static export สร้าง `out/` แล้ว upload ขึ้น Cloudflare

```bash
pnpm dev:portfolio                  # ที่ root — dev server
pnpm --filter portfolio preview     # preview บน workerd จริง → localhost:8787
pnpm deploy:portfolio               # ที่ root — build + deploy
```

ข้อจำกัด: static export จึงเพิ่ม API route / Server Action / middleware ไม่ได้ และรูปทำงานแบบ unoptimized (ต้อง pin ขนาด — ดู `docs/adr/0003` ที่ root)

คู่มือเต็ม: `../../docs/deploying.md`
