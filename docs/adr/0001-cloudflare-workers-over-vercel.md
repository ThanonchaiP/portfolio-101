# Host the apps on Cloudflare Workers instead of Vercel

Both apps are Next.js, for which Vercel is the default host, but we deploy them to Cloudflare Workers on the free plan — one platform for both apps, no hosting cost, and deploys are plain repo scripts (`pnpm deploy:portfolio` / `pnpm deploy:election`) rather than a git-integrated platform. Portfolio ships as pure Static Assets because every page is static; only Election needs the OpenNext adapter (see ADR-0002).

## Considered Options

- **Vercel** — the zero-config Next.js host, rejected in favour of Cloudflare's free tier and a single account for both apps.
- **Cloudflare Workers (chosen)** — free plan covers both apps; trade-offs below.

## Consequences

- Cloudflare's built-in image optimization needs a paid plan, so both apps run with `images.unoptimized` (their images are small local/S3 assets).
- Initial URLs were `*.workers.dev`; both apps now serve on custom domains (`portfolio.14again.online`, `election.14again.online` — the zone is on the same account), attached in each app's `wrangler.jsonc` with `workers_dev` disabled, so the workers.dev URLs no longer serve.
- Election's Worker bundle must stay under the free plan's 3 MB compressed size limit.
