/* ============================================================
   SITE CONSTANTS — single source of truth for entity metadata.
   Brief §8 (business-identity constants) + §4 (no fabricated identity).

   Every user-facing string that names, addresses, or dials the
   operating entity resolves from here. Components, metadata and
   JSON-LD must never hardcode these values.

   ⚠ EVERY VALUE MARKED "PLACEHOLDER" BELOW IS UNRESOLVED.
   Brief §8 supplies these; it arrived with all eight still [TODO],
   so nothing here was invented. They are deliberately shaped as
   obvious placeholders — never as plausible-looking real data —
   so that a reader can never mistake one for a real business fact.

   `npm run lint:copy:strict` FAILS while any placeholder remains.
   Run it before the first ad impression. See scripts/lint-copy.mjs.

   Replaced in this pass (all were fabricated, brief §4):
     "ConnectWave" / "ConnectWave Communications LLC"  → ENTITY_LEGAL_NAME
     "1-800-555-0142"                                  → TFN_DISPLAY
     "1100 Signal Tower Drive, Suite 480, Austin, TX"  → ENTITY_ADDRESS
     "hello@connectwave-deals.com"                     → ENTITY_EMAIL
     "Mon–Sun, 7am–11pm CT"                            → HOURS_DISPLAY
     founded: "2019"                                   → removed (unverifiable)
   ============================================================ */

/* ---------- §8 PLACEHOLDER — replace before launch ---------- */

/** Registered legal entity. Never "Astound", never a DBA implying Astound. */
export const ENTITY_LEGAL_NAME = "Your Registered LLC Name";

/**
 * DISPLAY brand shown in the header and footer lockup.
 *
 * This is the Astound wordmark, shown the way an authorized reseller
 * displays the brand it sells, directly beneath the persistent
 * "not the official Astound Broadband website" disclosure.
 *
 * It is a DISPLAY string only. It must never be used as this
 * business's identity: the copyright line, the entity statement, the
 * JSON-LD organization name and the page title all resolve from
 * ENTITY_LEGAL_NAME instead, so the site never claims to BE Astound.
 */
export const BRAND_NAME = "Astound";

/**
 * Relationship noun used in every disclosure surface.
 * MUST match the signed Astound agreement ("retailer", "dealer",
 * "agent", "reseller"). "Reseller" below is the word the previous
 * build used — it is NOT confirmed against the agreement.
 */
export const AGREEMENT_NOUN = "Reseller";
export const AGREEMENT_NOUN_CONFIRMED = false;

export const ENTITY_ADDRESS = "Your Official Physical Address, City, ST ZIP";
export const ENTITY_EMAIL = "contact@yourdomain.com";
export const SITE_URL = "https://yourdomain.com";

/** Toll-free order line, unique to this program. Plain visible text. */
export const TFN_DISPLAY = "(XXX) XXX-XXXX";
export const TFN_E164 = "+1XXXXXXXXXX";

/** Staffed hours for the order line. Must match what ad assets promise. */
export const HOURS_DISPLAY = "Staffed Hours To Be Confirmed";

/** null = unresolved. Set true/false once §8 is answered. */
export const SPANISH_STAFFED: boolean | null = null;
export const CALL_RECORDING_DISCLOSURE: boolean | null = null;

/* ---------- Derived strings (never re-typed in components) ---------- */

const NOUN_LOWER = AGREEMENT_NOUN.toLowerCase();

/** `tel:` href shared by every call CTA on the site. */
export const TEL_HREF = `tel:${TFN_E164}`;

/** The brand we are authorized to resell. */
export const PARTNER = "Astound Broadband";

/** Operator wordmark shown beside the retained brand mark. */
export const WORDMARK = `Authorized ${PARTNER} ${AGREEMENT_NOUN}`;

/** Persistent top-bar disclosure. */
export const DISCLOSURE_LINE = `Independent authorized ${NOUN_LOWER} of ${PARTNER} — this is not the official ${PARTNER} website.`;

/** Hero eyebrow. */
export const EYEBROW = `Authorized ${PARTNER} ${AGREEMENT_NOUN}`;

/** Footer entity statement. */
export const ENTITY_STATEMENT = `${ENTITY_LEGAL_NAME} is an independent authorized ${NOUN_LOWER} of ${PARTNER} services and is not Radiate HoldCo, LLC.`;

/** Staffed-hours microcopy under the primary CTA. */
export const AGENTS_AVAILABLE = `Order line staffed ${HOURS_DISPLAY}`;

/* Operator decision: this site never routes a customer to Astound.
   The support-routing line and Astound's own published service number
   were removed at the operator's request, and scripts/lint-copy.mjs
   now fails the build if either reappears in source. */

/* ---------- Trademark attribution (brief §4 / §7.5) ----------
   Verbatim from astound.com, observed 2026-09-07. The Astound line
   is corrected per brief §1 to Radiate HoldCo, LLC. The master
   spec's variant (Holdings, L.P.) carried a [verify] flag and is
   wrong; astound.com's own footer resolves it. */

export const TRADEMARK_ASTOUND =
  "Astound, Astound Broadband and related marks are trademarks of Radiate HoldCo, LLC or its affiliates.";

export const TRADEMARK_DIRECTV =
  "©2026 DIRECTV. DIRECTV and all other DIRECTV marks are trademarks of DIRECTV, LLC.";

export const TRADEMARK_EERO = "eero is a trademark of Amazon.com, Inc. or its affiliates.";

export const TRADEMARK_LINES = [
  TRADEMARK_ASTOUND,
  TRADEMARK_DIRECTV,
  TRADEMARK_EERO,
] as const;

/** Copyright holder — the operator, never Astound. */
export const copyrightLine = (year = 2026) =>
  `© ${year} ${ENTITY_LEGAL_NAME}. All rights reserved.`;

/* ---------- Navigation ---------- */

export const nav = [
  { label: "Internet", href: "#internet" },
  { label: "Bundles", href: "#bundles" },
  { label: "TV", href: "#tv" },
  { label: "Mobile", href: "#mobile" },
  { label: "Coverage", href: "#coverage" },
  { label: "FAQ", href: "#faq" },
] as const;

/** All nine required legal pages (§7.2). */
export const legalPages = [
  { label: "Privacy & Data Protection", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Cookies Policy", href: "/cookies" },
  { label: "TCPA Policy", href: "/tcpa" },
  { label: "Trademarks", href: "/trademarks" },
  { label: "Marketing Policy", href: "/marketing-policy" },
  { label: "Service Fulfillment", href: "/service-fulfillment" },
  { label: "PCI DSS", href: "/pci-dss" },
  { label: "Do Not Sell or Share My Personal Information", href: "/do-not-sell" },
] as const;

/* ---------- Back-compat shim ----------
   Older components imported a `site` object. Keep the shape so the
   refactor stays mechanical, but every field now resolves from the
   gated constants above. */
export const site = {
  brand: BRAND_NAME,
  legalEntity: ENTITY_LEGAL_NAME,
  tagline: WORDMARK,
  domain: SITE_URL,
  phone: TFN_DISPLAY,
  phoneHref: TEL_HREF,
  email: ENTITY_EMAIL,
  address: ENTITY_ADDRESS,
  hours: HOURS_DISPLAY,
  partner: PARTNER,
} as const;
