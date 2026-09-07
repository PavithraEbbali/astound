/* ============================================================
   SITE CONTENT — typed single source of truth.
   Brief §0 ("never invent a fact") + §6 (price lockup, market variance).

   Components consume this file exclusively. No plan rate, speed,
   qualifier, or disclaimer string may be hardcoded in JSX.

   EVERY commercial figure carries provenance:
     { value, source, observedAt, conditions, captureMarket }

   CAPTURE MARKET (§6): every figure below was read from astound.com
   with NO region selected — the site's own region picker still said
   "To get started, select your region". These are therefore Astound's
   national default rates, not a resolved local market. Astound prices
   by market, so each figure renders through PriceLockup in
   market-variance mode ("starting at ... call for your area's rate").

   Re-verify each `source` URL and refresh `observedAt` before any ad
   flight. An expired figure is a Google Ads misrepresentation risk.
   ============================================================ */

import { PARTNER } from "./site";

/* ---------- Provenance wrapper ---------- */

export type Sourced<T> = {
  value: T;
  /** Canonical astound.com URL the figure was read from. */
  source: string;
  /** ISO date the figure was last verified against `source`. */
  observedAt: string;
  /** Eligibility / promotional conditions attached to the figure. */
  conditions: string;
  /** Which Astound market the figure was captured in (§6). */
  captureMarket: string;
};

const OBSERVED = "2026-09-07";
const NATIONAL = "National default — no region selected on astound.com";

/* ---------- Canonical price model (§6) ---------- */

export type Price = {
  dollars: number;
  /** Whole cents, 0-99. Always rendered as two digits. */
  cents: number;
  unit: "mo" | "line/mo";
  /** lockup__qual — the discount/term condition. */
  qual: string;
  /** lockup__step — post-promo + tax posture. */
  step: string;
};

/** Spoken price for the sr-only line, derived from the typed model. */
export function priceSpoken(p: Price): string {
  const amount = `$${p.dollars}.${String(p.cents).padStart(2, "0")}`;
  return p.unit === "line/mo"
    ? `Starting at ${amount} per line per month`
    : `Starting at ${amount} per month`;
}

/** "Pricing as of Sep 2026 · details below" — derived, never stale-by-hand. */
export function pricingAsOf(observedAt: string): string {
  const d = new Date(`${observedAt}T00:00:00Z`);
  const stamp = d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  return `Pricing as of ${stamp} · details below`;
}

/** §6 market-variance line. Required beside every price on the site. */
export const MARKET_VARIANCE = "Pricing varies by market — call for your area's rate.";

const AUTOPAY_QUAL = "with autopay & e-bill discount (ACH enrollment required)";
const PFL_STEP = "Price for Life — rate does not increase · plus taxes, surcharges & fees";

/* ---------- Hero (§4 rewrites) ---------- */

export const hero = {
  /** Banned-phrase-free. Replaces the previous subhead, which made
      a domestic-staffing claim, an anti-phone-tree claim, and a
      promise to lock in pricing (§4). */
  /* Headline names the product and the speed, both sourced. The old
     "Smart Home, Smarter Internet" was a pun that said nothing, and
     the old subline ran three parallel clauses off one "We", which is
     the cadence that reads as machine-written. */
  headline: ["Fiber-powered internet,", "up to 1.5 Gig."],
  /** The word rendered in the brand gradient. */
  headlineAccent: "1.5 Gig",
  subline: `We are an authorized ${PARTNER} reseller. Give us your address and an agent confirms what Astound can actually deliver there, before anything is ordered. You pay Astound's price.`,
  /** Max 4 chips, each verifiable and sourced in the fine print. */
  trustChips: [
    "No annual contract on Price for Life plans*",
    "Free self-install where available*",
    "30-day money-back guarantee*",
    "Fiber-powered speeds up to 1.5 Gig*",
  ],
} as const;

/* ---------- ZIP availability widget (§5, option b) ----------
   Front end only: no backend ships with this build, so the widget
   makes NO serviceability claim. It validates format and routes to
   the order line. It must never assert "available". */

export const zipWidget = {
  eyebrow: "Check availability",
  title: `See what ${PARTNER} offers at your address`,
  body: `Availability is determined address by address, not by ZIP code. Enter your ZIP to start, then an agent confirms the exact speeds and price for your address while you are on the line.`,
  label: "ZIP code",
  placeholder: "5-digit ZIP",
  submit: "Check availability",
  invalid: "Enter a valid 5-digit US ZIP code.",
  /** Shown after a valid ZIP. Deliberately claims no verdict either way. */
  result: `call to confirm exact availability and today's rate for your address. Coverage published by the FCC National Broadband Map is provider-reported and not address-specific.`,
  fccNote: "Coverage reference: FCC National Broadband Map (provider-reported data).",
  fccUrl: "https://broadbandmap.fcc.gov/",
} as const;

/* ---------- Plan shape ---------- */

export type Plan = {
  id: string;
  name: string;
  /** Marketing speed label exactly as Astound writes it. */
  speed: string;
  blurb: string;
  price: Sourced<Price> | null;
  /** Used when Astound publishes no price for the product. */
  priceNote?: string;
  features: string[];
  featured?: boolean;
  image?: { file: string; pos: string };
};

/* ============================================================
   §2 SECTION STRUCTURE DECISION
   Astound sells ONE Internet line, not separate "fiber" and
   "cable" products. Its own FAQ: "Astound offers fiber powered
   internet in selected locations. Availability varies by area."
   So this is a single Internet section ordered fastest-and-most-
   fiber-first, honoring the requested fiber→cable intent without
   inventing a second product category that does not exist.
   ============================================================ */

export const internetPlans: Plan[] = [
  {
    id: "gig15",
    name: "1.5 Gig Internet",
    speed: "1,500 Mbps",
    blurb:
      "Astound's fastest fiber-powered tier. The Price for Life rate is the rate you keep — Astound states it does not increase for as long as you keep the service.",
    price: {
      value: {
        dollars: 65,
        cents: 0,
        unit: "mo",
        qual: AUTOPAY_QUAL,
        step: PFL_STEP,
      },
      source: "https://www.astound.com/internet/price-for-life/",
      observedAt: OBSERVED,
      conditions:
        "Price for Life. Fiber-powered. Free installation ($99.95 value). No contracts. Observed speeds may vary; one-time fees extra; restrictions apply. Price reflects autopay & e-bill discount with ACH.",
      captureMarket: NATIONAL,
    },
    features: [
      "Fiber-powered where Astound has built fiber",
      "Free professional installation ($99.95 value)",
      "No annual contract",
      "Whole Home WiFi included with 2 Gig+ service",
    ],
    featured: true,
    image: { file: "family.jpeg", pos: "center 60%" },
  },
  {
    id: "gig",
    name: "Gig Internet",
    speed: "1,000 Mbps",
    blurb:
      "Gigabit fiber-powered service at a rate Astound locks for the life of the account, with no annual contract attached.",
    price: {
      value: {
        dollars: 45,
        cents: 0,
        unit: "mo",
        qual: AUTOPAY_QUAL,
        step: PFL_STEP,
      },
      source: "https://www.astound.com/internet/price-for-life/",
      observedAt: OBSERVED,
      conditions:
        "Price for Life. Fiber-powered. Free installation ($99.95 value). No contracts. Observed speeds may vary; one-time fees extra; restrictions apply. Price reflects autopay & e-bill discount with ACH. Also advertised on the astound.com homepage as \"$45/mo Gig WiFi FOREVER\".",
      captureMarket: NATIONAL,
    },
    features: [
      "Fiber-powered where Astound has built fiber",
      "Free professional installation ($99.95 value)",
      "No annual contract",
      "Standard WiFi included",
    ],
    image: { file: "mobile-woman.jpeg", pos: "center 35%" },
  },
  {
    id: "other-speeds",
    name: "Lower speed tiers",
    speed: "Varies by address",
    blurb:
      "Astound sells additional, slower tiers below Gig. Which ones reach your address, and at what rate, depends on the market. We confirm both on the call.",
    price: null,
    priceNote:
      "Astound does not publish one national rate for these tiers. Call for the rate at your address.",
    features: [
      "Speeds and rates set by Astound and vary by market",
      "Delivered over fiber where built, coax elsewhere",
      "Confirmed on your official Astound order",
    ],
    image: { file: "home-phone.jpeg", pos: "center center" },
  },
];

/* ---------- TV — the DIRECTV partnership (§4 compliance gap) ---------- */

export const tv = {
  heading: `TV through ${PARTNER}'s DIRECTV offer`,
  intro: `${PARTNER} partners with DIRECTV for live TV delivered over your Astound internet connection, with no satellite dish. Astound also sells its own Astound TV product, powered by TiVo.`,
  directv: {
    name: "DIRECTV via Astound",
    device: "DIRECTV's Gemini device with voice remote",
    points: [
      "Live TV, satellite-free, over your Astound internet connection",
      "Local channels, live sports and news",
      "Voice remote, cloud DVR and On Demand",
      "2-year price guarantee",
      "Requires Astound Internet; minimum 100 Mbps and an HDMI-capable TV",
    ],
    source: "https://www.astound.com/tv/",
    observedAt: OBSERVED,
    priceNote:
      "Astound does not publish a national price for this package. Call for the rate and channel lineup at your address.",
  },
  astoundTv: {
    name: "Astound TV (powered by TiVo)",
    points: [
      "Live TV packages with local channels, sports and news",
      "Cloud DVR and On Demand",
      "Voice remote; Astound TV+ app for additional devices",
    ],
    source: "https://www.astound.com/tv/",
    observedAt: OBSERVED,
    priceNote: "Astound does not publish a national price for Astound TV. Call for your area's rate.",
  },
} as const;

/* ---------- Mobile ---------- */

export const mobile = {
  heading: "Astound Mobile",
  intro:
    "Astound Mobile requires an active Astound Internet line. The introductory offer is a monthly bill credit, not a permanently free line — the terms below are Astound's own.",
  offer: {
    headline: "One unlimited line, free for 12 months",
    points: [
      "One unlimited mobile line, applied as a monthly bill credit for 12 months",
      "Requires active Astound Internet",
      "Maximum 5 lines per account",
      "After 20GB, unlimited plans slow to 768 Kbps",
      "No rollover data; additional data $10/GB",
    ],
    source: "https://www.astound.com/mobile/",
    observedAt: OBSERVED,
    captureMarket: NATIONAL,
  },
  paidPlans: {
    priceNote:
      "Astound publishes unlimited lines from $30/mo for a single line and $15/mo per line on multi-line plans, and by-the-gig from $15/mo. Rates vary by market — call for your area's rate.",
    source: "https://www.astound.com/mobile/",
    observedAt: OBSERVED,
  },
} as const;


/* ---------- Mobile plans (split out per Astound's own three tiers) ----------
   astound.com/mobile/ advertises these as three distinct products with
   three distinct starting rates, so they get three cards rather than one
   paragraph cramming all three figures together. */

export const mobilePlans: Plan[] = [
  {
    id: "mobile-unlimited",
    name: "Unlimited",
    speed: "Single line",
    blurb:
      "One unlimited line on Astound's 5G service. Data is full speed to 20GB each month, then slows.",
    price: {
      value: { dollars: 30, cents: 0, unit: "mo", qual: "starting rate; requires active Astound Internet", step: "plus taxes, surcharges & fees" },
      source: "https://www.astound.com/mobile/",
      observedAt: OBSERVED,
      conditions: "Starting-at rate published by Astound. Requires active Astound Internet. Maximum 5 lines per account. After 20GB, unlimited plans slow to 768 Kbps. No rollover data; additional data $10/GB. Rates vary by market.",
      captureMarket: NATIONAL,
    },
    features: [
      "Unlimited talk, text and data",
      "Full speed to 20GB, then 768 Kbps",
      "Requires active Astound Internet",
    ],
  },
  {
    id: "mobile-family",
    name: "Unlimited family",
    speed: "Multi-line",
    blurb:
      "Astound's multi-line rate. You can mix and match plan types across the lines on one account.",
    price: {
      value: { dollars: 15, cents: 0, unit: "line/mo", qual: "starting rate; requires active Astound Internet", step: "plus taxes, surcharges & fees" },
      source: "https://www.astound.com/mobile/",
      observedAt: OBSERVED,
      conditions: "Starting-at rate published by Astound. Requires active Astound Internet. Maximum 5 lines per account. After 20GB, unlimited plans slow to 768 Kbps. No rollover data; additional data $10/GB. Rates vary by market.",
      captureMarket: NATIONAL,
    },
    features: [
      "Mix and match plan types per line",
      "Maximum 5 lines per account",
      "Requires active Astound Internet",
    ],
    featured: true,
    image: { file: "mobile-woman.jpeg", pos: "center 35%" },
  },
  {
    id: "mobile-gig",
    name: "By the Gig",
    speed: "Single line",
    blurb:
      "A capped-data plan for lighter users. Astound caps the 1.5GB and 3GB plans rather than slowing them.",
    price: {
      value: { dollars: 15, cents: 0, unit: "mo", qual: "starting rate; requires active Astound Internet", step: "plus taxes, surcharges & fees" },
      source: "https://www.astound.com/mobile/",
      observedAt: OBSERVED,
      conditions: "Starting-at rate published by Astound. Requires active Astound Internet. Maximum 5 lines per account. After 20GB, unlimited plans slow to 768 Kbps. No rollover data; additional data $10/GB. Rates vary by market.",
      captureMarket: NATIONAL,
    },
    features: [
      "Pay for the data you actually use",
      "1.5GB and 3GB plans are capped",
      "Additional data $10/GB, no rollover",
    ],
  },
];

/* ---------- Home phone ---------- */

export const homePhone = {
  heading: "Astound Home Phone",
  name: "Astound Nationwide Calling",
  price: {
    value: {
      dollars: 9,
      cents: 99,
      unit: "mo" as const,
      qual: "as published by Astound for Nationwide Calling",
      step: "plus taxes, surcharges & fees",
    },
    source: "https://www.astound.com/phone/",
    observedAt: OBSERVED,
    conditions:
      "Not all phone features or services are available in all areas. Calls to international countries are rated per minute.",
    captureMarket: NATIONAL,
  } as Sourced<Price>,
  points: [
    "Unlimited local and nationwide long-distance calling",
    "Voicemail with email delivery, call forwarding, call waiting, caller ID",
    "Call blocking and spam filtering via Nomorobo",
    "Keep your current number where supported",
  ],
} as const;

/* ---------- §7 Value-added services ---------- */

export const addOns = [
  {
    id: "standard-wifi",
    name: "Standard WiFi",
    body: "Included with Price for Life internet plans. Astound provides the router.",
    priceNote: "Included",
    source: "https://www.astound.com/internet/price-for-life/",
  },
  {
    id: "whole-home-wifi",
    name: "Whole Home WiFi powered by eero",
    body: "Mesh coverage using eero devices and the eero app. Included with 2 Gig+ service. On lower speeds it is a paid add-on.",
    /* §1 flagged two conflicting figures. A third was found on a third
       page, so the conflict is unresolved and NO figure is published:
         astound.com homepage:      "$10/mo for lower speeds or add'l devices"
         astound.com homepage:      "Up to $40/mo for Whole Home WiFi equipment"
         /policies-disclaimers/:    "$5/mo" for lower speeds or additional devices
       Operator decision (2026-09-07): publish no figure, route to call. */
    priceNote: "Pricing varies by plan and market — call for your rate.",
    source: "https://www.astound.com/policies-disclaimers/",
  },
  {
    id: "eero-plus",
    name: "eero Plus",
    body: "Paid security add-on covering the devices on your network. Requires Whole Home WiFi powered by eero.",
    priceNote: "$9.99/mo",
    source: "https://www.astound.com/internet/wifi/",
  },
  {
    id: "price-for-life",
    name: "Price for Life",
    body: "Astound's rate-lock program on select Gig+ fiber plans. Astound states the monthly rate does not increase for as long as you keep the service, with no contract and no cancellation penalty.",
    priceNote: "Included at the rates shown above",
    source: "https://www.astound.com/internet/price-for-life/",
  },
] as const;

/* ---------- Bundle calculator line items (§4 "keep, don't touch") ----------
   The calculator is preserved. These are the same sourced figures the
   plan cards render, so the estimate cannot drift from the printed
   prices. Items Astound does not publish a national rate for are
   marked `callForRate` and contribute 0 to the estimate. */

export type BundleOption = {
  id: string;
  label: string;
  price: number;
  callForRate?: boolean;
  note?: string;
};

export const bundleOptions: BundleOption[] = [
  { id: "gig", label: "Gig Internet (1,000 Mbps)", price: 45, note: "Price for Life" },
  { id: "gig15", label: "1.5 Gig Internet (1,500 Mbps)", price: 65, note: "Price for Life" },
  { id: "mobile", label: "Unlimited mobile line", price: 0, note: "Free for 12 months with Astound Internet" },
  { id: "phone", label: "Home Phone (Nationwide Calling)", price: 9.99 },
  { id: "tv", label: "TV via DIRECTV", price: 0, callForRate: true, note: "Astound publishes no national rate" },
  { id: "wifi", label: "Whole Home WiFi (eero)", price: 0, callForRate: true, note: "Included with 2 Gig+; otherwise call for rate" },
];

/* ---------- Coverage (§1 real service areas) ----------
   Source: astound.com region selector, observed 2026-09-07. */

export const coverage = {
  source: "https://www.astound.com/",
  observedAt: OBSERVED,
  states: [
    { abbr: "CA", state: "California", detail: "Bay Area, Central Coast, Sacramento" },
    { abbr: "IL", state: "Illinois", detail: "Chicago" },
    { abbr: "IN", state: "Indiana", detail: "Evansville, Northwest Indiana" },
    { abbr: "MD", state: "Maryland", detail: "Anne Arundel, Montgomery County" },
    { abbr: "MA", state: "Massachusetts", detail: "Boston and nearby towns" },
    { abbr: "NY", state: "New York", detail: "NYC boroughs" },
    { abbr: "OR", state: "Oregon", detail: "Multiple named areas" },
    { abbr: "PA", state: "Pennsylvania", detail: "Lehigh Valley, NEPA, Philadelphia" },
    {
      abbr: "TX",
      state: "Texas",
      detail: "Austin, Dallas, Houston, San Antonio, Corpus Christi, Waco and more",
    },
    { abbr: "VA", state: "Virginia", detail: "Selected areas" },
    { abbr: "WA", state: "Washington", detail: "Many named areas" },
    { abbr: "DC", state: "Washington, D.C.", detail: "DC Metro" },
  ],
} as const;

/* ---------- Fine print (§6) ---------- */

export const finePrint = [
  {
    id: "pricing",
    title: "Pricing and market variance",
    body: `All rates on this page are ${PARTNER}'s published rates. Astound prices by market, so the rate at your address may differ. Rates reflect Astound's autopay and e-bill discount with ACH enrollment and exclude taxes, surcharges and fees. Astound sets all pricing, speeds, promotions and availability and may change them at any time. Final terms are confirmed on your official Astound order.`,
  },
  {
    id: "fees",
    title: "Activation and installation",
    body: `Astound charges a one-time activation fee of $14.99, in addition to any installation fee. Self-installation is free for new internet service where available. If self-installation is unavailable or unsuccessful, a $99.95 professional installation fee may apply; professional installation is free with a valid coupon code.`,
  },
  {
    id: "guarantee",
    title: "30-Day Money-Back Guarantee",
    body: `Astound's stated terms: "30-Day Money-Back Guarantee for new residential customers who cancel within 30 days of install. Max refund = 1 month's recurring service & equip. fees. Refund issued within 60 days if all conditions met. Excludes usage-based fees."`,
  },
  {
    id: "mobile-terms",
    title: "Astound Mobile",
    body: `Astound Mobile requires active Astound Internet. Maximum 5 lines per account. After 20GB, unlimited plans slow to 768 Kbps. No rollover data; additional data $10/GB. The introductory offer is one unlimited line applied as a monthly bill credit for 12 months.`,
  },
  {
    id: "wifi-equipment",
    title: "Whole Home WiFi equipment",
    body: `Whole Home WiFi powered by eero is included with 2 Gig+ service. On lower speeds it is a paid add-on. Astound publishes conflicting equipment figures across its own pages, so no rate is shown here — call for the rate that applies to your plan and market.`,
  },
] as const;

/* ---------- FAQ ---------- */

export const faqs = [
  {
    q: "Are you the official Astound Broadband website?",
    a: "No. We are an independent, authorized reseller of Astound Broadband services. We help you compare and order plans, but Astound owns its brand and operates the network. Final service terms are confirmed directly on your official Astound order.",
  },
  {
    q: "Does it cost extra to order through a reseller?",
    a: "No. You pay Astound's pricing for the plan you choose. Our help comparing options and placing the order is free to you.",
  },
  {
    q: "How fast is the internet?",
    a: "Astound's published fiber-powered tiers run to 1.5 Gig (1,500 Mbps) on its Price for Life plans. Astound states that fiber-powered internet is available in selected locations and that availability varies by area, so the speeds you can actually get depend on your exact address. We confirm that before you order.",
  },
  {
    q: "What is Price for Life?",
    a: "Price for Life is Astound's own rate-lock program on select Gig and faster fiber plans. Astound states the monthly rate does not increase for as long as you keep the service, with no contract and no cancellation penalty. Taxes, surcharges, fees and one-time charges are not covered by the lock.",
  },
  {
    q: "Is the TV service from Astound or DIRECTV?",
    a: "Astound has partnered with DIRECTV for live TV delivered over your Astound internet connection, with no satellite dish, using DIRECTV's Gemini device. It carries a 2-year price guarantee and requires Astound Internet with at least 100 Mbps. Astound also sells its own Astound TV product, powered by TiVo.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "Astound states that its Price for Life plans have no contract and no cancellation penalty. Other promotions can carry their own terms, and we point those out before you commit.",
  },
  {
    q: "What if I change my mind after ordering?",
    a: "Astound offers a 30-Day Money-Back Guarantee for new residential customers who cancel within 30 days of install. The maximum refund is one month's recurring service and equipment fees, issued within 60 days if all conditions are met, and it excludes usage-based fees.",
  },
] as const;
