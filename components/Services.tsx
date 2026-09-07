"use client";

import { Wifi, Check } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import PriceLockup, { PriceCallout } from "./PriceLockup";
import CallToOrder from "./CallToOrder";
import { internetPlans } from "@/lib/content";
import { PARTNER } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   §2 INTERNET SECTION — structure decision recorded here.

   The brief asked for fiber → cable as two sections. Audited against
   astound.com, Astound does not sell "cable" as a product distinct
   from "fiber": it sells ONE Internet line, and its own FAQ says
   "Astound offers fiber powered internet in selected locations.
   Availability varies by area." Fiber-powered Gig/Gig+ is the top
   tier (fiber where built, coax elsewhere), with standard tiers below.

   So this is a single "Astound Internet Plans" section, ordered
   fastest-and-most-fiber-first (1.5 Gig → Gig → lower tiers). That
   honors the requested ordering using Astound's real product
   structure instead of inventing a second category.

   §3: one ScrollReveal entrance per card. The previous build's
   per-card ScrollMotion variants (up/left/right/zoom) and GlassCard
   3D tilt were removed.

   Layout: three photo cards, fastest first. This is the only section
   that uses the tall photo-card treatment — TV, mobile and home phone
   each have their own layout so the page does not read as one
   component repeated five times.
   ============================================================ */

export default function Services() {
  return (
    <section className="cw-section" id="internet">
      <div className="cw-shell">
        <ScrollReveal className={s.head}>
          <span className="cw-eyebrow">Internet</span>
          <h2 className="cw-h2" style={{ marginTop: "1rem" }}>
            Astound Internet Plans
          </h2>
          <p className="cw-lead" style={{ marginTop: "1rem" }}>
            Astound delivers fiber-powered internet in selected locations, with availability and speed
            varying by address. The plans below are ordered fastest first. We confirm which of them
            actually reach your address before you order.
          </p>
        </ScrollReveal>

        <div className={s.planGrid}>
          {internetPlans.map((plan) => (
            <ScrollReveal key={plan.id} as="div" className={s.svcCell}>
              <div
                id={plan.id}
                className={`${s.svcCard} ${plan.featured ? s.svcCardFeatured : ""}`}
                data-badge={plan.featured ? "Fastest" : undefined}
                style={{ scrollMarginTop: "120px" }}
              >
                {plan.image && (
                  <div className={s.svcImgWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={s.svcImg}
                      src={`/images/${plan.image.file}`}
                      alt=""
                      style={{ objectPosition: plan.image.pos }}
                    />
                  </div>
                )}
                <div className={s.svcIcon}>
                  <Wifi size={22} />
                </div>
                <h3>{plan.name}</h3>
                <p className={s.svcSpeed}>{plan.speed}</p>

                {plan.price ? (
                  <PriceLockup price={plan.price} />
                ) : (
                  <PriceCallout note={plan.priceNote ?? ""} />
                )}

                <p className={s.svcBlurb}>{plan.blurb}</p>
                <ul className={s.svcList}>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={16} strokeWidth={3} /> {f}
                    </li>
                  ))}
                </ul>
                <CallToOrder />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className={s.svcFoot}>
          All rates are {PARTNER}&apos;s published rates. {PARTNER} sets all pricing, speeds, promotions
          and availability, prices by market, and may change any of them at any time. Rates reflect
          Astound&apos;s autopay and e-bill discount with ACH enrollment and exclude taxes, surcharges and
          fees. Final terms are confirmed on your official {PARTNER} order. See the{" "}
          <a href="#fine-print">fine print</a> and our <a href="/disclaimer">Disclaimer</a>.
        </p>
      </div>
    </section>
  );
}
