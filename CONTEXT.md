# portfolio-101

A pnpm monorepo of personal Next.js apps, deployed to Cloudflare Workers.

## Language

### Apps

**Portfolio**:
The VS Code-style personal portfolio app in `apps/portfolio`. Entirely static.
_Avoid_: profolio, personal site

**Election**:
The Thai election-66 result viewer in `apps/election`.
_Avoid_: vote app, polling app

**Election API**:
The REST endpoints Election serves from its own origin (`/api/*`). Election is its own API provider: both the browser and the API routes themselves read from it.
_Avoid_: upstream API, external API

**Web**:
The unused Turborepo starter app in `apps/web`. Not deployed.

### Deployment

**Worker**:
A single Cloudflare Worker — the deploy unit for one app.
_Avoid_: server, lambda, function

**Static Assets**:
A Worker with no server runtime that only serves prebuilt files.

**OpenNext adapter**:
The layer (`@opennextjs/cloudflare`) that runs a Next.js server inside a Worker. Only Election uses it.

**Unoptimized images**:
Images served at their original file size with no resizing service — the app alone decides how large each one displays.

**Deploy**:
Publishing an app's Worker to Cloudflare.
_Avoid_: release, ship
