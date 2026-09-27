# คู่มือ Deploy — portfolio-101 บน Cloudflare Workers

ทุกแอป deploy ด้วย script ที่อยู่ใน repo จากเครื่องที่ login Cloudflare ไว้แล้ว **ไม่มี CI/CD** — Cloudflare dashboard ใช้สำหรับดู logs/metrics เท่านั้น

## ภาพรวม

| App | ประเภท | Deploy ด้วย | URL หลัง deploy |
|---|---|---|---|
| `apps/portfolio` | Static Assets worker (ไม่มี server) | `pnpm deploy:portfolio` | https://portfolio.t-paliwong.workers.dev |
| `apps/election` | OpenNext SSR worker (มี API routes) | `pnpm deploy:election` | https://election.t-paliwong.workers.dev |
| `apps/web` | Turborepo starter — **ไม่ deploy** | — | — |

`pnpm deploy` = deploy ทั้งสองแอปเรียงกัน (portfolio ก่อน แล้ว election) แต่ละแอปเป็น worker อิสระกัน ตัวใดพังไม่กระทบอีกตัว

---

## เตรียมเครื่องใหม่ (ทำครั้งเดียว)

```bash
# 1. ต้องมี Node 18+ และ pnpm 9 (repo pin ไว้ใน packageManager ของ root package.json)
npm i -g pnpm@9   # หรือ corepack enable

# 2. ติดตั้ง dependencies
pnpm install

# 3. Login Cloudflare (จะเปิด browser ให้กด Allow — ใช้ credential เดียวกันทั้ง repo)
pnpm exec wrangler login

# 4. เช็คว่า login สำเร็จ (ต้องเห็น account name/email)
pnpm exec wrangler whoami
```

OAuth token เก็บไว้ที่เครื่องนี้ — ไม่ต้องตั้ง `CLOUDFLARE_API_TOKEN` เพราะไม่มี CI

---

## วงจรงานประจำวัน

### election (เพิ่ม feature / แก้ bug)

```bash
# 1. รัน dev server — client จะยิง API ที่ localhost:3000 ซึ่งก็คือตัวมันเอง
pnpm dev:election                    # → http://localhost:3000

# 2. แก้โค้ด ทดสอบบน dev server ให้จบ

# 3. (แนะนำ) preview บน runtime จริง (workerd) ก่อนขึ้นจริง
pnpm --filter election preview       # → http://localhost:8787
#    script นี้ build ด้วย NEXT_PUBLIC_API_URL=http://localhost:8787
#    แล้วรัน worker จริงด้วย wrangler dev — ทดสอบ API routes บน workerd ได้

# 4. Deploy ขึ้น production
pnpm deploy:election
```

`pnpm deploy:election` ทำอะไรบ้าง (ตามลำดับ):

1. `cross-env NEXT_PUBLIC_API_URL=https://election.t-paliwong.workers.dev/api opennextjs-cloudflare build`
   - รัน `next build` (client bundle จะ bake URL production เข้าไป — process env ชนะ `.env.local` ที่เก็บ localhost ไว้)
   - สร้าง `.open-next/` (worker.js + assets)
2. `wrangler deploy` — upload worker + assets แล้วสลับ traffic ทันที (second-level deploy)

### portfolio

```bash
# 1. Dev
pnpm dev:portfolio                   # → http://localhost:3000

# 2. (แนะนำ) preview แบบ static assets จริง
pnpm --filter portfolio preview      # → http://localhost:8787

# 3. Deploy
pnpm deploy:portfolio
```

`pnpm deploy:portfolio` = `next build` (สร้าง `out/` แบบ static export) → `wrangler deploy` (upload ไฟล์ใน `out/` เป็น static assets ไม่มี server)

### ตรวจสอบหลัง deploy (copy-paste ได้เลย)

```bash
# election — หน้าเว็บ + API ครบทุกตัว (ต้องได้ 200 ทั้งหมด)
for p in / /parliament /geo /formation /api/parties /api/districts /api/formation \
         /api/candidates /api/regions/1 /api/regions/geo/party-count; do
  printf "%-32s -> " "$p"
  curl -s -o /dev/null -w "%{http_code}\n" "https://election.t-paliwong.workers.dev$p"
done

# portfolio
for p in / /about /contact /experience /projects; do
  printf "%-14s -> " "$p"
  curl -s -o /dev/null -w "%{http_code}\n" "https://portfolio.t-paliwong.workers.dev$p"
done
```

นอกจาก status 200 ถ้าแก้พวกรูป/หน้าสำคัญ ให้เปิดจริงด้วยตาหรือ screenshot ด้วย — เคยมีกรณี 200 แต่ layout พัง (ดู ADR-0003)

---

## ข้อจำกัดที่ต้องรู้ก่อนแก้โค้ด (จากแพลนฟรี Cloudflare)

1. **รูปทั้งสองแอปทำงานแบบ unoptimized** — ไม่มี server คอยย่อรูปให้ ทุก `next/image` ต้อง pin ขนาดแสดงผลด้วย `width`/`height` props ที่ตรงสัดส่วนไฟล์จริง และ**ห้าม**ใช้ `className="size-auto"` หรือ auto-width ไม่งั้นรูปจะแสดงขนาดไฟล์จริงแล้วเพี้ยน → `docs/adr/0003`
2. **`/api/candidates` ต้องเป็น `force-dynamic` เสมอ** — ถ้าเอาออก Next จะ prerender ตอน build แล้ว build จะล่มทันที (มัน axios ไปหา origin ตอน build) → `docs/adr/0002`
3. **Route ที่ self-call API ตัวเอง ต้อง derive origin จาก `API_URL`** (`new URL(API_URL as string).origin`) — ห้ามใช้ `new URL(request.url).origin` เพราะ Next แทน `request.url` เป็น placeholder `http://localhost:3000` ใน static handler → `docs/adr/0002`
4. **ขนาด worker ต้องไม่เกิน 3 MB (compressed)** — ขีดจำกัดแพลนฟรี (ADR-0001) ตัวเลขเปลี่ยนตามโค้ด ณ ตอนนี้อยู่ราว 1.9 MB — เช็คก่อน deploy ด้วย dry-run เสมอ:
   ```bash
   cd apps/election && pnpm exec wrangler deploy --dry-run
   # ดูบรรทัด "Total Upload: ... / gzip: ..." — ต้องต่ำกว่า 3072 KiB
   ```
5. **portfolio เป็น static export ล้วน** — เพิ่ม API route / Server Action / middleware ไม่ได้ (build จะ fail) อะไรที่ต้องใช้ server ต้องไปอยู่ที่ election หรือ worker แยก (ADR-0001)
6. **`NEXT_PUBLIC_API_URL` ถูก bake ตอน build** — ถ้าวันหนึ่งเปลี่ยนโดเมน (เช่นได้ 14again.life กลับมา) ต้องไปแก้ค่าใน script `build:worker` ที่ `apps/election/package.json` ด้วย ไม่ใช่แค่ config (ADR-0002)

---

## ดู log / debug บน production

```bash
# ดู log สด (ทิ้งไว้แล้วยิง request จากเว็บ/curl ดู)
cd apps/election && pnpm exec wrangler tail election
```

- election เปิด `observability: true` ไว้ใน `wrangler.jsonc` — ดู log/error ย้อนหลังได้ที่ dashboard → **Workers & Pages → election → Logs**
- portfolio ไม่มี server ปัญหาส่วนใหญ่คือ asset ไม่เจอ (เช็คว่าไฟล์อยู่ใน `public/` จริง)

---

## ย้อน version (rollback)

```bash
# คืน worker กลับไป deployment ก่อนหน้า (ถามยืนยันใน terminal)
cd apps/election && pnpm exec wrangler rollback
cd apps/portfolio && pnpm exec wrangler rollback
```

ถ้าต้นเหตุคือโค้ด วิธีที่ชัวร์กว่าคือ `git revert` แล้ว deploy ใหม่ เพราะ rollback แค่ย้อน version บน Cloudflare โค้ดใน repo ยังเป็นตัวใหม่อยู่

---

## Troubleshooting — ปัญหาที่เคยเจอจริง

| อาการ | ต้นตอ | ทางแก้ |
|---|---|---|
| `next build` ของ election ล่มที่ `/api/candidates` (ECONNREFUSED / Invalid URL) | มีคนเอา `export const dynamic = "force-dynamic"` ออก | ใส่กลับ — ดู ADR-0002 |
| Deploy แล้วเว็บเรียก API ไม่ได้ / โดน 404 | `NEXT_PUBLIC_API_URL` ที่ bake ไปไม่มี `/api` ป้ายท้าย หรือชี้ localhost | เช็ค `build:worker` ใน `apps/election/package.json` |
| API route บางตัว 500 บน prod (log เจอ 403 ที่ localhost) | ใช้ `new URL(request.url).origin` ใน static handler | เปลี่ยนเป็น `new URL(API_URL as string).origin` — ดู ADR-0002 |
| รูปโหลดขึ้นแต่ใหญ่/เพี้ยน | ใช้ `size-auto` หรือไม่ pin ขนาด | pin `width`/`height` ที่สัดส่วนไฟล์ — ดู ADR-0003 |
| `Error: Cannot find module .../next/dist/bin/next` | `node_modules` เสีย (เศษจาก install เก่า) | ลบ `node_modules` ทุกตำแหน่งแล้ว `pnpm install` ใหม่ |
| wrangler ขึ้น 401 / authentication error | OAuth token หมดอายุ | `pnpm exec wrangler login` ใหม่ |
| deploy election fail เรื่อง size limit | bundle เกิน 3 MB | ตรวจ dependency ที่เพิ่มเข้า server bundle; ทางสุดท้ายคืออัปเกรด Workers Paid |

---

## เรื่องที่ยังไม่ได้ทำ (roadmap)

- **Custom domain** `portfolio.14again.life` / `election.14again.life` — ต้องยืนยันว่าโดเมนเป็น zone ในบัญชี Cloudflare นี้ก่อน แล้วเพิ่ม custom domain ใน `wrangler.jsonc` ทั้งสองแอป และอย่าลืมแก้ `build:worker` ของ election (ข้อ 6 ด้านบน)
- **CI/CD อัตโนมัติ** — ตอนนี้ deploy ด้วยมือ ถ้าจะเพิ่ม GitHub Actions ต้องตั้ง `CLOUDFLARE_API_TOKEN` เป็น repo secret
