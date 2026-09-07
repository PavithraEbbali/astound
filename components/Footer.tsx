import { Phone } from "lucide-react";
import AstoundLogo from "./AstoundLogo";
import {
  BRAND_NAME,
  ENTITY_LEGAL_NAME,
  ENTITY_ADDRESS,
  ENTITY_EMAIL,
  TFN_DISPLAY,
  TEL_HREF,
  PARTNER,
  AGREEMENT_NOUN,
  ENTITY_STATEMENT,
  TRADEMARK_LINES,
  copyrightLine,
  legalPages,
  nav,
} from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   FOOTER — §4 compliance fixes.

   Before: a single generic line, "...are trademarks of their
   respective owners."

   After: the three specific attributions required by §7.5, with the
   Astound line corrected per §1 to Radiate HoldCo, LLC. The master
   spec's variant of that entity carried a [verify] flag; the
   astound.com footer, read 2026-09-07, resolves it:
   "© 2026 Radiate HoldCo, LLC d/b/a Astound Broadband".

   The eero line is added because eero is used in the Whole Home
   WiFi product, and the DIRECTV line because TV is a DIRECTV
   partnership.

   All nine §7.2 legal pages are now linked, including the newly
   added Do Not Sell or Share My Personal Information (CPRA).
   ============================================================ */

const explore = [
  ...nav.map((n) => ({ label: n.label, href: `/${n.href}` })),
  { label: "Fine print", href: "/#fine-print" },
];

export default function Footer() {
  const noun = AGREEMENT_NOUN.toLowerCase();

  return (
    <footer className={s.footer}>
      <div className="cw-shell">
        <div className={s.footTop}>
          <div className={s.footBrand}>
            <a href="/#top" className={s.footLogo} aria-label={BRAND_NAME}>
              <AstoundLogo wordmark={BRAND_NAME} invert />
            </a>
            <p className={s.footDesc}>
              An independent authorized {noun} of {PARTNER}. We help households compare and order internet,
              TV, mobile and home phone plans at no added cost to you.
            </p>
            <address className={s.footAddr}>{ENTITY_ADDRESS}</address>
            <a href={`mailto:${ENTITY_EMAIL}`} className={s.footAddr}>
              {ENTITY_EMAIL}
            </a>
            <a href={TEL_HREF} className={s.footCall}>
              <Phone size={16} /> Call {TFN_DISPLAY}
            </a>
          </div>

          <div className={s.footCol}>
            <h4>Explore</h4>
            <ul>
              {explore.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.footCol}>
            <h4>Legal</h4>
            <ul>
              {legalPages.slice(0, 5).map((p) => (
                <li key={p.href}>
                  <a href={p.href}>{p.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.footCol}>
            <h4>Policies</h4>
            <ul>
              {legalPages.slice(5).map((p) => (
                <li key={p.href}>
                  <a href={p.href}>{p.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={s.footDisclosure}>
          <p>
            <strong>
              Independent authorized {noun} — not {PARTNER}.
            </strong>{" "}
            {ENTITY_STATEMENT} This website is not the official {PARTNER} website. See our{" "}
            <a href="/trademarks">Trademarks</a> and <a href="/disclaimer">Disclaimer</a>.
          </p>
          <p>
            <strong>How it works.</strong> Our help comparing options and placing your order is free to you —
            you pay {PARTNER}&apos;s pricing for the plan you choose. All pricing, speeds, promotions and
            availability are set by {PARTNER}, vary by market, and may change at any time. Final terms are
            confirmed on your official {PARTNER} order.
          </p>
          {/* §7.5 — specific trademark attributions. */}
          <div className={s.tmLines}>
            {TRADEMARK_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className={s.footBottom}>
          <span>{copyrightLine()}</span>
          <nav className={s.footBottomLinks} aria-label="Legal">
            <a href="/disclaimer">Disclaimer</a>
            <a href="/privacy">Privacy</a>
            <a href="/tcpa">TCPA</a>
            <a href="/cookies">Cookies</a>
            <a href="/do-not-sell">Do Not Sell or Share</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
