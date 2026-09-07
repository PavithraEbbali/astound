# Independent Authorized Astound Broadband Reseller (Next.js)

A marketing site for an **independent authorized reseller** of Astound Broadband, plus nine policy
pages. Next.js 15 (App Router) + React 19 + TypeScript.

> ⚠️ **This site cannot go live yet.** Every business-identity constant (legal entity, agreement
> noun, address, email, toll-free number, staffed hours, Spanish staffing, call-recording
> disclosure) is an unresolved placeholder. See **Before going live** below.

> ⚠️ **Compliance by design.** Every layout makes clear this is an *independent authorized reseller*
> and **not** the official Astound website. Do not remove the reseller banner, the footer
> disclosure, or the `/disclaimer` and `/trademarks` pages.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # runs the copy gate, then builds
npm start        # serve the production build
```

## The copy gate

`scripts/lint-copy.mjs` is a build-time compliance check. It scans `app/`, `components/`, `lib/`
and `public/` for banned phrases, unsubstantiated claims, and the retired fabricated identity.

```bash
npm run lint:copy          # runs automatically as prebuild; blocks a bad build
npm run lint:copy:strict   # ALSO fails on unresolved identity placeholders
```

`lint:copy` must pass for `npm run build` to produce output. **`lint:copy:strict` must pass before
the first ad impression.** It currently fails by design, listing every unresolved constant.

If a flagged phrase is genuinely compliant in context, add the exact line to
`scripts/lint-allowlist.txt` — do not weaken the rule.

## Where things live

| What | Where |
|------|-------|
| Business identity (entity, phone, address, hours) | `lib/site.ts` |
| Trademark lines | `lib/site.ts` (`TRADEMARK_*`) |
| Every price, plan, fee and disclaimer | `lib/content.ts` |
| Colors, fonts, radii | `app/globals.css` (`--cw-*` tokens) |
| Legal page bodies | `app/<slug>/page.tsx` |

**No price, plan name, or fee may be hardcoded in JSX.** Everything commercial lives in
`lib/content.ts` wrapped in `Sourced<T>`, which carries the astound.com URL it came from, the date
it was read, the conditions attached, and the capture market.

## Pricing provenance

All figures were read from astound.com on **2026-09-07** with **no region selected**, so they are
Astound's national defaults, not a resolved market. Astound prices by market, so every price
renders through `components/PriceLockup.tsx` in market-variance mode ("starting at … call for your
area's rate").

Re-verify each `source` URL and refresh `observedAt` before any ad flight. An expired figure is a
Google Ads misrepresentation risk.

## Animation policy

One approach only: Framer Motion. Allowed are one-shot entrance reveals, a single stagger, the FAQ
accordion, header condense-on-scroll, hover/focus states, and the bundle calculator's live total.

Infinite marquees, cursor-follow effects, 3D tilt, scroll-scrubbed scenes and fake live telemetry
are banned and were removed.

**One exemption:** the isometric smart-home scene in the hero (`/smart-hero-home.png` plus
`components/FiberLines.tsx`) is preserved deliberately at the operator's request. Do not strip or
tone it down, and do not apply the animation policy to it.

## Availability checking

The site ships **no backend** and performs **no serviceability lookup**. The ZIP field validates
format, captures the ZIP, and routes to the order line without claiming a verdict either way. It
must never render an unconditional "available" response.

## Before going live

1. Fill in every constant in `lib/site.ts`. The agreement noun **must** match the wording in the
   signed Astound agreement, then set `AGREEMENT_NOUN_CONFIRMED = true`.
2. Resolve `SPANISH_STAFFED` and `CALL_RECORDING_DISCLOSURE` to real booleans.
3. Update `public/llms.txt` with the same details.
4. Run `npm run lint:copy:strict` and confirm it passes.
5. Re-verify every figure in `lib/content.ts` against its `source` URL and update `observedAt`.
6. Resolve the Whole Home WiFi price. Astound publishes three conflicting figures across its own
   pages ($5, $10, and up to $40/mo), so this build deliberately shows none.
7. Confirm you hold a genuine authorized-reseller agreement with Astound and that your use of the
   Astound name matches its branding guidelines.
8. Have counsel review the policy pages for your jurisdiction.
