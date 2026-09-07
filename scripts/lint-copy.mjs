#!/usr/bin/env node
/* ============================================================
   COPY LINT — build-time compliance gate (brief §4, §9).

   Fails the build if any banned phrase, any fabricated entity
   identity, or any leftover placeholder reaches shippable source.

   Runs as `prebuild`, so `npm run build` cannot produce output
   containing banned voice or a retired fake identity.

   Usage:
     node scripts/lint-copy.mjs          # banned voice + fake identity
     node scripts/lint-copy.mjs --strict # ALSO fail on §8 placeholders

   §8 business-identity constants arrived unresolved ([TODO]), so
   lib/site.ts ships obvious placeholders. `--strict` is the
   pre-launch gate: it MUST pass before the first ad impression.
   ============================================================ */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const STRICT = process.argv.includes("--strict");

const SCAN_DIRS = ["app", "components", "lib", "public"];
const SCAN_EXT = [".ts", ".tsx", ".css", ".md", ".txt"];
const SKIP_DIRS = new Set(["node_modules", ".next", "out", ".git", "scripts"]);

/* ---------- §5.1 banned voice ----------
   Locality, in-person, and anti-call-center claims. An independent
   phone-order reseller cannot substantiate any of these, and Google
   Ads treats them as misrepresentation of the business model. */
const BANNED_VOICE = [
  "answered by real people",
  "real people",
  "talk to a human",
  "just a local team",
  "local team",
  "local crew",
  "local specialists",
  "in-store",
  "in store",
  "face to face",
  "face-to-face",
  "walk in, walk out",
  "walk into our store",
  "storefront",
  "our office",
  "neighborhood roots",
  "people who live where you do",
  "from here, for here",
  "across the counter",
  "no call-center maze",
  "call-center maze",
  "phone-tree maze",
  "phone tree maze",
  "no phone tree",
  "no ticket number",
  "who picks up the phone",
  "picks up the phone",
  "same-day setup in store",
  "same-day setup in-store",
  /* §4 — Astound-specific findings in the previous build */
  "u.s.-based agents",
  "u.s. based agents",
  "us-based agents",
  "u.s.-based team",
  "u.s.-based support",
  "u.s. based support",
];

/* ---------- Unsubstantiated superlatives / invented guarantees ---------- */
const BANNED_CLAIMS = [
  "verified today",
  "best price guaranteed",
  "price lock for life",
  "nationwide coverage",
  "available everywhere",
  "guaranteed lowest",
  /* §4 — invented-guarantee and no-hidden-fees families */
  "lock in the deal",
  "no hidden fees",
  "no surprise contracts",
  "no surprise fees",
  "zero pressure",
  "no pressure, no runaround",
  "no pressure",
  "limited-time gift cards",
  /* §4 — fake telemetry */
  "live speed",
  /* §4 — unsourced ratings and counts */
  "4.8/5",
  "4.8 / 5",
  "customer rating",
  "instant results",
];

/* ---------- Retired fabricated identity (must never reappear) ----------
   Also guards two operator decisions:
     - this site never routes a customer to Astound, so Astound's own
       published service number must never appear in source
     - the "read from astound.com on <date> with no region selected"
       stamp was removed from user-facing copy (provenance still lives
       in lib/content.ts, which is not user-facing) */
const BANNED_IDENTITY = [
  "connectwave",
  "connectwave communications",
  "1-800-555-0142",
  "8005550142",
  "555-0142",
  "1100 signal tower",
  "hello@connectwave-deals.com",
  "connectwave-deals.com",
  "radiate holdings, l.p.",
  "radiate holdings",
  /* Astound's own customer-service line — never shown to customers here. */
  "1-800-427-8686",
  "1.800.427.8686",
  "8004278686",
  /* The removed support-routing statement, in the phrasings it could return in. */
  "for account, billing or outage support",
  "contact astound broadband directly",
  "contact astound directly",
  "new orders only —",
];

/* ---------- §8 placeholders that must be replaced before launch ---------- */
const PLACEHOLDERS = [
  "Your Registered LLC Name",
  "Your Brand Name",
  "(XXX) XXX-XXXX",
  "+1XXXXXXXXXX",
  "yourdomain.com",
  "Your Official Physical Address",
  "Staffed Hours To Be Confirmed",
];

/* ---------- Allowlist ----------
   Exact strings permitted verbatim even where a substring check
   would otherwise flag them. Lines containing one are exempt. */
function loadAllowlist() {
  try {
    return readFileSync(join(ROOT, "scripts", "lint-allowlist.txt"), "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
  } catch {
    return [];
  }
}
const ALLOWLIST = loadAllowlist();

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SCAN_EXT.some((e) => entry.endsWith(e))) out.push(full);
  }
  return out;
}

function scan(file, groups) {
  const findings = [];
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    if (ALLOWLIST.some((a) => line.includes(a))) return;
    for (const { label, terms } of groups) {
      for (const term of terms) {
        if (!lower.includes(term.toLowerCase())) continue;
        findings.push({
          file: relative(ROOT, file).split(sep).join("/"),
          line: i + 1,
          label,
          term,
          text: line.trim().slice(0, 120),
        });
      }
    }
  });
  return findings;
}

const files = SCAN_DIRS.flatMap((d) => {
  try {
    return walk(join(ROOT, d));
  } catch {
    return [];
  }
});

const errors = files.flatMap((f) =>
  scan(f, [
    { label: "banned voice (§5.1)", terms: BANNED_VOICE },
    { label: "unsubstantiated claim (§4)", terms: BANNED_CLAIMS },
    { label: "retired fabricated identity (§4)", terms: BANNED_IDENTITY },
  ])
);

const placeholders = STRICT
  ? files.flatMap((f) => scan(f, [{ label: "unreplaced §8 placeholder", terms: PLACEHOLDERS }]))
  : [];

/* ---------- §8 non-string confirmations ---------- */
const unconfirmed = [];
if (STRICT) {
  const siteSrc = readFileSync(join(ROOT, "lib", "site.ts"), "utf8");
  const checks = [
    ["AGREEMENT_NOUN_CONFIRMED", /AGREEMENT_NOUN_CONFIRMED\s*=\s*true/],
    ["SPANISH_STAFFED", /SPANISH_STAFFED[^=]*=\s*(true|false)/],
    ["CALL_RECORDING_DISCLOSURE", /CALL_RECORDING_DISCLOSURE[^=]*=\s*(true|false)/],
  ];
  for (const [name, re] of checks) {
    if (!re.test(siteSrc)) {
      unconfirmed.push({
        file: "lib/site.ts",
        line: 0,
        label: "unresolved §8 constant",
        term: name,
        text: `${name} is still unresolved — brief §8 must supply it.`,
      });
    }
  }
}

const all = [...errors, ...placeholders, ...unconfirmed];

if (all.length === 0) {
  console.log(
    `copy-lint: clean — ${files.length} files scanned${STRICT ? " (strict: §8 placeholders checked)" : ""}`
  );
  process.exit(0);
}

console.error(`\ncopy-lint: ${all.length} violation(s) found\n`);
for (const f of all) {
  console.error(`  ${f.file}:${f.line}  [${f.label}]  "${f.term}"`);
  console.error(`    ${f.text}\n`);
}
console.error("Fix the copy above, or add an exact allowlist entry if it is compliant in context.\n");
process.exit(1);
