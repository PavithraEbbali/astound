"use client";

import { Tv, Check } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import CallToOrder from "./CallToOrder";
import { tv } from "@/lib/content";
import { TRADEMARK_DIRECTV } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   TV — §4 compliance gap fixed.

   The previous build's "TV & Streaming" card never named DIRECTV,
   even though Astound's TV cross-sell is explicitly a DIRECTV
   partnership. It also advertised "From $35/mo", a figure that
   appears nowhere on astound.com. Both are corrected here:

     - the offer is branded as the DIRECTV partnership it is
     - DIRECTV's own trademark line is rendered in-section
     - no price is shown, because Astound publishes none nationally
     - Astound TV (TiVo-powered) is listed as the separate product
       it actually is

   Layout: horizontal split cards, image beside the copy, stacked
   full width. TV is two products with long feature lists, which
   read better across two columns than down a tall card.
   ============================================================ */

export default function TVSection() {
  return (
    <section className="cw-section" id="tv">
      <div className="cw-shell">
        <ScrollReveal className={s.head}>
          <span className="cw-eyebrow">TV</span>
          <h2 className="cw-h2" style={{ marginTop: "1rem" }}>
            {tv.heading}
          </h2>
          <p className="cw-lead" style={{ marginTop: "1rem" }}>
            {tv.intro}
          </p>
        </ScrollReveal>

        <div className={s.splitList}>
          <ScrollReveal as="div" className={s.splitCard}>
            <div className={s.splitMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/couple-tv.jpeg" alt="" style={{ objectPosition: "center 40%" }} />
            </div>
            <div className={s.splitBody}>
              <span className={s.splitTag}>DIRECTV partnership</span>
              <h3>{tv.directv.name}</h3>
              <p className={s.splitDevice}>{tv.directv.device}</p>
              <p className={s.svcCallout}>{tv.directv.priceNote}</p>
              <ul className={`${s.svcList} ${s.splitCols}`}>
                {tv.directv.points.map((p) => (
                  <li key={p}>
                    <Check size={16} strokeWidth={3} /> {p}
                  </li>
                ))}
              </ul>
              <CallToOrder />
            </div>
          </ScrollReveal>

          <ScrollReveal as="div" className={s.splitCard}>
            <div className={s.splitMedia}>
              <span className={s.splitMediaIcon}>
                <Tv size={72} strokeWidth={1.2} />
              </span>
            </div>
            <div className={s.splitBody}>
              <span className={s.splitTag}>Astound&apos;s own product</span>
              <h3>{tv.astoundTv.name}</h3>
              <p className={s.splitDevice}>Powered by TiVo</p>
              <p className={s.svcCallout}>{tv.astoundTv.priceNote}</p>
              <ul className={`${s.svcList} ${s.splitCols}`}>
                {tv.astoundTv.points.map((p) => (
                  <li key={p}>
                    <Check size={16} strokeWidth={3} /> {p}
                  </li>
                ))}
              </ul>
              <CallToOrder />
            </div>
          </ScrollReveal>
        </div>

        {/* §7.5 — DIRECTV's trademark line, rendered with the offer. */}
        <p className={s.svcFoot}>{TRADEMARK_DIRECTV}</p>
      </div>
    </section>
  );
}
