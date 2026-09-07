import { Phone } from "lucide-react";
import { TEL_HREF, TFN_DISPLAY, AGENTS_AVAILABLE } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   §2.10 STICKY MOBILE CALL BAR

   Persistent tap-to-call bar pinned to the bottom of the viewport
   below 760px. On a phone-order site this is the primary conversion
   surface, so it is deliberately:

     - NOT scroll-gated. It renders on first paint. Gating it behind
       a scroll threshold hides the only order path from anyone who
       converts above the fold.
     - a plain server component. No "use client", no state, no
       effect, so it costs nothing in JS and cannot flash in late.
     - tagged `data-call-cta` for call-tracking attribution, the same
       attribute carried by every other tel: link on the site.

   Height is capped at 64px plus the iOS home-indicator inset, and
   the anchor itself holds a 48px minimum tap target.

   The body reserves matching bottom padding (see .hasCallBar in
   home.module.css) so the bar never covers the footer disclosures,
   the CPRA link, or the copyright line.
   ============================================================ */

export default function StickyCallBar() {
  return (
    <div className={s.callBar} role="region" aria-label="Call to order">
      <a
        href={TEL_HREF}
        data-call-cta
        className={s.callBarLink}
        aria-label={`Call to order ${TFN_DISPLAY}`}
      >
        <Phone size={18} aria-hidden="true" />
        <span className={s.callBarNum}>Call {TFN_DISPLAY}</span>
      </a>
      <span className={s.callBarHours}>{AGENTS_AVAILABLE}</span>
    </div>
  );
}
