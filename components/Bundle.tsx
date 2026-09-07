"use client";

import { useMemo, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import CallToOrder from "./CallToOrder";
import { bundleOptions } from "@/lib/content";
import { PARTNER } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   BUILD YOUR BUNDLE — §4 "keep, don't touch".

   The calculator is preserved: tap services on and off, the running
   total updates, and the "estimate only, confirmed at order"
   disclaimer stays. §3 explicitly allows the live-updating total —
   it is arithmetic on already-displayed numbers, not a data lookup.

   Changed only where §4 required it:
     - line-item prices now come from lib/content.ts, so the
       estimate cannot drift from the sourced plan prices
     - the two internet tiers are mutually exclusive (you cannot
       order Gig and 1.5 Gig on one line), so picking one clears
       the other rather than summing both into a fictional total
     - items Astound publishes no national rate for (TV, Whole Home
       WiFi) are selectable but add $0 and are labelled "call for
       rate", so the estimate never invents a number
     - <img src="/images/phone-mockup.jpeg"> removed: that file does
       not exist in public/images and 404'd on every page load. No
       existing image was touched (§0) — this reference had no file
       behind it.
     - the GSAP breathing glow + pulse-on-change and the magnetic
       button were removed per §3; the total still updates live
   ============================================================ */

const INTERNET_IDS = ["gig", "gig15"];

export default function Bundle() {
  const [picked, setPicked] = useState<string[]>(["gig", "mobile"]);

  const toggle = (id: string) =>
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      // Only one internet tier at a time.
      const next = INTERNET_IDS.includes(id)
        ? prev.filter((x) => !INTERNET_IDS.includes(x))
        : prev;
      return [...next, id];
    });

  const chosen = useMemo(
    () => bundleOptions.filter((o) => picked.includes(o.id)),
    [picked]
  );

  const total = useMemo(
    () => chosen.reduce((sum, o) => sum + (o.callForRate ? 0 : o.price), 0),
    [chosen]
  );

  const hasCallForRate = chosen.some((o) => o.callForRate);
  const dollars = Math.floor(total);
  const cents = Math.round((total - dollars) * 100);

  return (
    <section className="cw-section" id="bundles">
      <div className="cw-shell">
        <ScrollReveal className={s.bundle}>
          <div className={s.bundleGrid}>
            <div>
              <span
                className="cw-eyebrow"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                <Sparkles size={14} /> Build your bundle
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                  marginTop: "1rem",
                  color: "#fff",
                }}
              >
                Your bundle, your estimate
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  marginTop: "1rem",
                  maxWidth: "46ch",
                }}
              >
                Tap the services that matter to your household. The estimate adds up the rates shown on this
                page. An agent confirms the exact pricing for your address on your official {PARTNER} order.
              </p>

              <div className={s.bundleChips}>
                {bundleOptions.map((o) => {
                  const on = picked.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      onClick={() => toggle(o.id)}
                      className={`${s.chip} ${on ? s.chipOn : ""}`}
                      aria-pressed={on}
                      suppressHydrationWarning
                    >
                      <span className={s.chipTick} aria-hidden="true">
                        {on ? <Check size={13} strokeWidth={3} /> : null}
                      </span>
                      <span className={s.chipLabel}>{o.label}</span>
                      <span className={s.chipPrice}>
                        {o.callForRate
                          ? "Call for rate"
                          : o.price === 0
                            ? "Included*"
                            : `$${o.price.toFixed(2).replace(/\.00$/, "")}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={s.bundleEstimate}>
              <p className={s.bundleEstLabel}>Estimated monthly</p>
              <div className={s.bundleTotal}>
                <span className={s.bundleTotalNum}>
                  <span className={s.bundleCur}>$</span>
                  <span className={s.bundleAmt}>{dollars}</span>
                  <span className={s.bundleCur}>.{String(cents).padStart(2, "0")}</span>
                  <span className={s.bundleMo}>/mo*</span>
                </span>
              </div>
              <p className={s.bundleCount}>
                {picked.length} service{picked.length === 1 ? "" : "s"} selected
              </p>

              {hasCallForRate && (
                <p className={s.bundleCallout}>
                  Your selection includes a service {PARTNER} does not publish a national rate for. That
                  service is not in the figure above — call for its rate.
                </p>
              )}

              <p className={s.bundleNote}>
                Estimate only. Promo pricing, Price for Life eligibility, terms, taxes and fees are set by{" "}
                {PARTNER}, vary by market, and are confirmed at order. Excludes the $14.99 one-time
                activation fee and any installation fee.
              </p>

              <div style={{ marginTop: "1.6rem" }}>
                <CallToOrder variant="solid" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
