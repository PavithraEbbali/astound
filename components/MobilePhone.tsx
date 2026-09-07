"use client";

import { Phone, Check, Wifi } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import PriceLockup from "./PriceLockup";
import CallToOrder from "./CallToOrder";
import { mobile, mobilePlans, homePhone, addOns } from "@/lib/content";
import s from "./home.module.css";

/* ============================================================
   MOBILE → PHONE → value-added services (§2 order, §7).

   The previous build advertised Mobile as "Free / for 1 year with
   internet*" with no mention that it is a bill credit, that Astound
   Internet is required, that lines are capped at 5, or that data
   slows to 768 Kbps after 20GB. All four are Astound's own terms
   and are now stated up front.

   The three paid tiers used to be one card whose body crammed all
   three starting rates into a sentence. astound.com sells them as
   three distinct products, so they are now three cards, each with
   its own sourced price lockup.

   Layouts, deliberately different from the other sections:
     Mobile      compact price-forward tiers, no photography. These
                 are compared against each other, so the rate leads
                 and nothing competes with it.
     Home phone  one wide panel. It is a single product with a
                 feature list, not a set to choose between.
     Add-ons     small four-up grid of equipment and paid extras.
   ============================================================ */

export default function MobilePhone() {
  return (
    <>
      {/* ---------------- MOBILE ---------------- */}
      <section className="cw-section" id="mobile">
        <div className="cw-shell">
          <ScrollReveal className={s.head}>
            <span className="cw-eyebrow">Mobile</span>
            <h2 className="cw-h2" style={{ marginTop: "1rem" }}>
              {mobile.heading}
            </h2>
            <p className="cw-lead" style={{ marginTop: "1rem" }}>
              {mobile.intro}
            </p>
          </ScrollReveal>

          {/* The intro offer is an offer, not a tier. It sits above the
              comparison so it cannot be mistaken for a fourth plan. */}
          <ScrollReveal as="div" className={s.offerBanner}>
            <div className={s.offerBody}>
              <span className={s.offerBadge}>Intro offer</span>
              <h3>{mobile.offer.headline}</h3>
              <ul className={s.offerList}>
                {mobile.offer.points.map((p) => (
                  <li key={p}>
                    <Check size={15} strokeWidth={3} /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.offerCta}>
              <CallToOrder variant="solid" />
            </div>
          </ScrollReveal>

          <div className={s.tierGrid}>
            {mobilePlans.map((plan) => (
              <ScrollReveal
                key={plan.id}
                as="div"
                className={`${s.tierCard} ${plan.featured ? s.tierCardFeatured : ""}`}
              >
                {/* Name row then meta row on every card, so the price and
                    feature list line up across all three regardless of
                    whether the card carries the flag. */}
                <div className={s.tierHead}>
                  <span className={s.tierName}>{plan.name}</span>
                  {plan.featured && <span className={s.tierFlag}>Best value</span>}
                </div>
                <span className={s.tierMeta}>{plan.speed}</span>
                {plan.price && <PriceLockup price={plan.price} />}
                <div className={s.tierRule} />
                <ul className={s.tierList}>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={15} strokeWidth={3} /> {f}
                    </li>
                  ))}
                </ul>
                <CallToOrder />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOME PHONE ---------------- */}
      <section className="cw-section" id="phone" style={{ background: "var(--cw-mist)" }}>
        <div className="cw-shell">
          <ScrollReveal className={s.head}>
            <span className="cw-eyebrow">Home phone</span>
            <h2 className="cw-h2" style={{ marginTop: "1rem" }}>
              {homePhone.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal as="div" className={s.panel}>
            <div className={s.panelMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home-phone.jpeg" alt="" />
            </div>
            <div className={s.panelBody}>
              <h3>{homePhone.name}</h3>
              <PriceLockup price={homePhone.price} />
              <ul className={`${s.svcList} ${s.panelGrid}`}>
                {homePhone.points.map((p) => (
                  <li key={p}>
                    <Check size={16} strokeWidth={3} /> {p}
                  </li>
                ))}
              </ul>
              <div className={s.panelCta}>
                <CallToOrder />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- §7 VALUE-ADDED SERVICES ---------------- */}
      <section className="cw-section" id="add-ons">
        <div className="cw-shell">
          <ScrollReveal className={s.head}>
            <span className="cw-eyebrow">
              <Wifi size={14} /> WiFi equipment &amp; add-ons
            </span>
            <h2 className="cw-h2" style={{ marginTop: "1rem" }}>
              Equipment and paid extras
            </h2>
          </ScrollReveal>

          <div className={s.addOnGrid}>
            {addOns.map((a) => (
              <ScrollReveal as="div" key={a.id} className={s.addOnCard}>
                <h3>{a.name}</h3>
                <p>{a.body}</p>
                <span className={s.addOnPrice}>{a.priceNote}</span>
                <CallToOrder />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
