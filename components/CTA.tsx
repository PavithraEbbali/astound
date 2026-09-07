"use client";

import { Phone, ArrowRight } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import {
  TEL_HREF,
  TFN_DISPLAY,
  AGENTS_AVAILABLE,
  PARTNER,
  AGREEMENT_NOUN,
} from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   CLOSING CTA — §4 rewrites.

   Removed:
     the no-pressure/no-jargon sign-off  → banned family
     the "Trusted by 1,500+ connected households" line →
        unverifiable count, same family as the removed star rating
     the three avatar SVGs that decorated that count (the files
        themselves are untouched and still used in WhyUs)
     MagneticButton (cursor-follow, §3)
   ============================================================ */

export default function CTA() {
  return (
    <section className="cw-section">
      <div className="cw-shell">
        <ScrollReveal className={s.cta}>
          <h2>Ready to get connected?</h2>
          <p>
            Tell us your address and what you need. We check what {PARTNER} can deliver there, go through
            the rates that apply to your market, and place the order on the call.
          </p>

          <div className={s.ctaActions}>
            <a href={TEL_HREF} className={`cw-btn ${s.ctaWhite}`}>
              <span style={{ display: "inline-flex", gap: ".5rem", alignItems: "center" }}>
                <Phone size={18} /> Call {TFN_DISPLAY}
              </span>
            </a>
            <a href="#coverage" className={`cw-btn ${s.ctaGhost}`}>
              <span style={{ display: "inline-flex", gap: ".5rem", alignItems: "center" }}>
                Check my address <ArrowRight size={18} />
              </span>
            </a>
          </div>

          <p style={{ fontSize: "0.78rem", marginTop: "1.6rem", opacity: 0.85 }}>
            {AGENTS_AVAILABLE}. We are an independent authorized {AGREEMENT_NOUN.toLowerCase()} of{" "}
            {PARTNER}.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
