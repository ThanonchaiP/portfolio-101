# Election runs as an OpenNext SSR worker even though every page is a client component

Election looks statically exportable — all pages are `"use client"` shells that fetch data in the browser — but it also serves API routes that must execute server-side: `/api/candidates` merges local candidate JSON with party data fetched from `API_URL` at request time, and the region routes call the app's own API through its origin. A static export would either break the build (prerendering `/api/candidates` fetches an origin that may not exist during `next build`) or lose those endpoints. Election therefore deploys through `@opennextjs/cloudflare` with its routes kept as-is.

## Consequences

- `/api/candidates` is deliberately `force-dynamic` (see its in-code comment) while the other six API routes are `force-static` — don't "fix" the inconsistency.
- Routes that self-call the app must derive the origin from `API_URL` (`new URL(API_URL).origin`), never from `request.url`: Next hands statically rendered handlers a placeholder URL (`http://localhost:3000`), which 403s against the Worker at runtime.
- The routes' self-calls (`/api/regions/[regionId]` → `/api/districts`, `/api/candidates`) run as worker subrequests; the free plan allows 50 per request, well above Election's fan-out.
- `NEXT_PUBLIC_API_URL` must point at Election's own production URL and is passed explicitly to the deploy build, because process env beats the committed `.env.local`, which pins `localhost:3000` for local dev.
