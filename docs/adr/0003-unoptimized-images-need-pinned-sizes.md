# Images render unoptimized, so every display size is pinned in markup

Election runs on the Cloudflare Workers free plan, which has no image-optimization service, so `images.unoptimized` is set and every image is served at its original file size. With the optimizer gone, any `<Image>` whose rendered size is left to the file (`className="size-auto"`, auto widths) suddenly renders at its intrinsic dimensions — party logos are 148×63 but the UI was designed around the ~30–60px the optimizer used to produce, which blew up layouts on first deploy. The rule now: each `<Image>` declares `width`/`height` props matching its intended display size at the source's intrinsic ratio (Tailwind preflight's `height: auto` keeps the ratio correct), and `size-auto`/auto-width sizing is not used.

## Consequences

- Adding a new image means measuring its intrinsic ratio and pinning the display size — there is no optimizer to compensate.
- Remote S3 images cannot be resized server-side either; components that must fill a fixed box use `object-contain` (e.g., the formation cards).
- Upgrading to Workers Paid would reintroduce an optimizer (via OpenNext's Cloudflare Images integration) and relax this rule — tracked as a deliberate trade-off, not an oversight.
