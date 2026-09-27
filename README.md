# portfolio-101

Monorepo ส่วนตัว (pnpm + Turborepo) — แอป Next.js ทุกตัว deploy บน **Cloudflare Workers**

## แอปใน repo

| App | คืออะไร | URL |
|---|---|---|
| `apps/portfolio` | Personal portfolio ธีม VS Code — static ล้วน | https://portfolio.14again.online |
| `apps/election` | เว็บผลเลือกตั้ง 66 เรียลไทม์ — มี API routes รันบน OpenNext | https://election.14again.online |
| `apps/web` | Turborepo starter — ยังไม่ใช้งาน ไม่ deploy | — |

Shared packages: `@repo/ui`, `@repo/eslint-config`, `@repo/typescript-config`

## คำสั่งที่ใช้จริง

```bash
pnpm install              # ติดตั้งครั้งแรก (ต้องมี Node 18+ / pnpm 9)

pnpm dev:election         # dev เว็บ election        → localhost:3000
pnpm dev:portfolio        # dev เว็บ portfolio      → localhost:3000

pnpm deploy               # deploy ทั้งสองแอปขึ้น Cloudflare
pnpm deploy:election      # deploy เฉพาะ election
pnpm deploy:portfolio     # deploy เฉพาะ portfolio

pnpm build                # build ทุกแอป (turbo)
pnpm lint                 # lint ทุกแอป
```

ต้อง `pnpm exec wrangler login` ครั้งแรกก่อน deploy — รายละเอียดทั้งหมด (preview บน workerd, ตรวจหลัง deploy, rollback, troubleshooting) อยู่ที่ **[docs/deploying.md](docs/deploying.md)**

## เอกสาร

- [docs/deploying.md](docs/deploying.md) — คู่มือ deploy ละเอียด: วงจรงาน, ข้อจำกัดของแพลนฟรี, rollback, troubleshooting
- [CONTEXT.md](CONTEXT.md) — ศัพท์ที่ใช้ในโปรเจกต์ (glossary)
- [docs/adr/](docs/adr/) — การตัดสินใจเชิงสถาปัตยกรรม: เลือก Workers แทน Vercel, election ใช้ OpenNext, กฎการใช้รูปแบบ unoptimized
