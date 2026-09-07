"use client";

import { Headset, BadgeDollarSign, ClipboardCheck, ShieldCheck, ThumbsUp } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { PARTNER, AGREEMENT_NOUN } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   WHY ORDER THROUGH US — §4 rewrites.

   Before → after:
     the previous heading, which claimed human contact at every step
       → "One point of contact for the order"
     the body copy that promised to skip the phone-tree and named
     the agents' nationality
       → factual description of what the ordering process is,
         with no claim about who staffs it or where they sit
     the nationality caption under the agent photo
       → "Order line" (the caption no longer makes a staffing
          claim the business cannot substantiate)
     the animated star-rating counter
       → removed entirely. Unsourced rating, banned.
     the "we pre-check availability" claim
       → this build ships no backend and there is no pre-check
         process, so it now describes what actually happens:
         availability is confirmed with Astound during the call.

   The agent.jpeg and avatar SVGs are retained unchanged (§0).
   The avatars are decorative and no longer carry a staffing claim.
   ============================================================ */

export default function WhyUs() {
  const noun = AGREEMENT_NOUN.toLowerCase();

  return (
    <section className="cw-section" id="why" style={{ background: "var(--cw-mist)" }}>
      <div className="cw-shell">
        <ScrollReveal className={`${s.head} center`}>
          <span className="cw-eyebrow">Why order through us</span>
          <h2 className="cw-h2" style={{ marginTop: "1rem" }}>
            What a {noun} actually does
          </h2>
        </ScrollReveal>

        <div className={s.bento}>
          <div className={`${s.bentoCard} ${s.bentoTall}`}>
            <div className={s.bentoPhoto} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/agent.jpeg" alt="" />
            </div>
            <div>
              <div className={s.bentoIcon}>
                <Headset size={24} />
              </div>
              <h3>One point of contact for the order</h3>
              <p>
                You call one number, go through the plans available at your address, and place the order on
                that call. We are an independent authorized {noun} of {PARTNER}, so the order is written on
                Astound&apos;s system and Astound operates the network.
              </p>
              <div className={s.agentRow}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.agentAv} src="/avatar-1.svg" alt="" width={36} height={36} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.agentAv} src="/avatar-2.svg" alt="" width={36} height={36} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.agentAv} src="/avatar-3.svg" alt="" width={36} height={36} />
                <span className={s.agentTag}>Order line</span>
              </div>
            </div>
          </div>

          <div className={`${s.bentoCard} ${s.bentoGlass} ${s.bentoWide}`}>
            <div className={s.bentoIcon}>
              <BadgeDollarSign size={22} />
            </div>
            <h3>The rate, and what happens after it</h3>
            <p>
              Astound prices by market, and some rates are promotional while others are Price for Life. We
              tell you which one you are being quoted, and what the rate becomes afterwards, before you
              commit.
            </p>
          </div>

          <div className={`${s.bentoCard} ${s.bentoGlass}`}>
            <div className={s.bentoIcon}>
              <ClipboardCheck size={22} />
            </div>
            <h3>Availability confirmed on the call</h3>
            <p>
              Serviceability is address by address. We confirm what Astound can actually deliver at your
              address while you are on the line, before an order is placed.
            </p>
          </div>

          <div className={`${s.bentoCard} ${s.bentoGlass}`}>
            <div className={s.bentoIcon}>
              <ShieldCheck size={22} />
            </div>
            <h3>Contract terms stated up front</h3>
            <p>
              Astound states its Price for Life plans carry no contract and no cancellation penalty. Other
              promotions can carry their own terms, and we flag those.
            </p>
          </div>

          <div className={`${s.bentoCard} ${s.bentoGlass} ${s.bentoFull}`}>
            <div className={s.bentoIcon}>
              <ThumbsUp size={22} />
            </div>
            <h3>Astound&apos;s 30-day money-back guarantee</h3>
            <p>
              New residential customers who cancel within 30 days of install can receive a refund of up to
              one month&apos;s recurring service and equipment fees, issued within 60 days if all conditions
              are met. Usage-based fees are excluded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
