import { MARKET_VARIANCE, priceSpoken, pricingAsOf, type Price, type Sourced } from "@/lib/content";
import s from "./home.module.css";

/* ============================================================
   §6 CANONICAL PRICE LOCKUP — the only price renderer on the site.

   Structure is fixed: "starting at", then a single baseline-aligned
   flex row ($ + amount + /mo), the promo condition, the step-up
   line, the §6 market-variance line, and a dated fine-print link.

   The visible row is hidden from the accessibility tree and paired
   with an sr-only sentence generated from the SAME typed model, so
   the spoken price cannot drift from the printed one.

   Astound prices by market, so market-variance mode is not optional
   here — every price on this site renders through this component.
   ============================================================ */

export default function PriceLockup({
  price,
  invert = false,
}: {
  price: Sourced<Price>;
  /** Use on dark grounds. */
  invert?: boolean;
}) {
  const p = price.value;
  const cents = `.${String(p.cents).padStart(2, "0")}`;

  return (
    <div className={`${s.lockup} ${invert ? s.lockupInvert : ""}`}>
      <p className={s.lockupLead}>Starting at</p>
      <p className={s.lockupRow} aria-hidden="true">
        <span className={s.lockupCur}>$</span>
        <span className={s.lockupInt}>{p.dollars}</span>
        <span className={s.lockupCents}>{cents}</span>
        <span className={s.lockupPer}>{p.unit === "line/mo" ? "/line/mo" : "/mo"}</span>
      </p>
      <p className="cw-sr">
        {priceSpoken(p)} in most areas. {MARKET_VARIANCE}
      </p>
      <p className={s.lockupQual}>{p.qual}</p>
      <p className={s.lockupStep}>{p.step}</p>
      <p className={s.lockupVariance}>{MARKET_VARIANCE}</p>
      <p className={s.lockupFine}>
        <a href="#fine-print">{pricingAsOf(price.observedAt)}</a>
      </p>
    </div>
  );
}

/** Used where Astound publishes no national rate at all. */
export function PriceCallout({ note }: { note: string }) {
  return (
    <div className={s.lockup}>
      <p className={s.lockupCallout}>Call for your area&apos;s rate</p>
      <p className={s.lockupQual}>{note}</p>
    </div>
  );
}
