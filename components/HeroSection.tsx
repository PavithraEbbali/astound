"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BadgeCheck, Wrench, ShieldCheck, Search, ArrowRight, Gauge, Phone } from "lucide-react";
import FiberLines from "./FiberLines";
import { hero, zipWidget } from "@/lib/content";
import { EYEBROW, TEL_HREF, TFN_DISPLAY } from "@/lib/site";
import s from "./heroSection.module.css";

/* ============================================================
   HERO

   §0 EXEMPTION — the isometric smart-home scene (the /smart-hero-home.png
   stage, its gentle float, its halo, and the animated flowing data lines
   in <FiberLines/>) is preserved exactly. The operator asked for it to
   stay, and the §3 animation-minimization policy does NOT apply to it.

   Everything else in this hero was brought under §3. Removed:
     - cursor-following glow over the section   (cursor-follow, banned)
     - mouse-move 3D tilt on the stage          (3D tilt, banned)
     - pointer parallax on the floating chips   (cursor-follow, banned)
     - magnetic pull on the CTA button          (cursor-follow, banned)
     - scroll-scrubbed parallax/opacity/scale   (scroll-scrubbed, banned)
     - GSAP per-character headline cascade      (replaced by one reveal)
     - drifting sparkles + ambient orbs         (ambient loops, banned)
     - GSAP count-up stat row                   (see below)

   The stat row is gone entirely: "1500+" was an unsourced figure
   animating as if measured, and "$0 standard install" was unsourced.
   The verifiable parts now live in the sourced chips and fine print.

   What remains outside the scene: one entrance reveal, a single
   stagger, and normal hover/focus states. Framer Motion only.
   ============================================================ */

const ZIP_RE = /^\d{5}$/;

const CHIP_ICONS = [BadgeCheck, Wrench, ShieldCheck, Gauge];

export default function HeroSection() {
  const reduce = useReducedMotion();

  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState<string | null>(null);
  const [error, setError] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ZIP_RE.test(zip)) {
      setError(true);
      setChecked(null);
      return;
    }
    setError(false);
    setChecked(zip);
  }

  // One entrance reveal, one stagger. No scroll scrubbing, no pointer input.
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className={s.hero} id="top">
      <div className={s.grid}>
        {/* LEFT */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: reduce ? 0 : 0.07 }}
        >
          <motion.span className={s.badge} variants={rise}>
            <span className={s.badgeDot} /> {EYEBROW}
          </motion.span>

          <motion.h1 className={s.title} variants={rise}>
            <span className={s.titleLine}>{hero.headline[0]}</span>
            <span className={s.titleLine}>
              up to <span className={s.titleGrad}>{hero.headlineAccent}</span>.
            </span>
          </motion.h1>

          <motion.p className={s.sub} variants={rise}>
            {hero.subline}
          </motion.p>

          <motion.ul className={s.perks} variants={rise}>
            {hero.trustChips.map((chip, i) => {
              const Icon = CHIP_ICONS[i % CHIP_ICONS.length];
              return (
                <li className={s.perk} key={chip}>
                  <Icon size={16} /> {chip}
                </li>
              );
            })}
          </motion.ul>

          {/* ---- §5 ZIP widget, option (b) ----
              Captures the ZIP and routes to the call. Claims no verdict
              either way, and never renders an "available" response. */}
          <motion.form className={s.zip} onSubmit={onSubmit} noValidate variants={rise}>
            <div className={s.zipField}>
              <Search size={18} />
              <label htmlFor="hero-zip" className="cw-sr">
                {zipWidget.label}
              </label>
              <input
                id="hero-zip"
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder={zipWidget.placeholder}
                value={zip}
                aria-invalid={error || undefined}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                  setError(false);
                }}
                suppressHydrationWarning
              />
            </div>
            <button type="submit" className={s.cta} suppressHydrationWarning>
              {zipWidget.submit} <ArrowRight size={16} />
            </button>
          </motion.form>

          <div aria-live="polite">
            <AnimatePresence>
              {error && (
                <motion.p
                  className={s.zipError}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {zipWidget.invalid}
                </motion.p>
              )}

              {checked && !error && (
                <motion.div
                  className={s.success}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>
                    <strong>ZIP {checked}</strong> — {zipWidget.result}
                  </p>
                  <a href={TEL_HREF} data-call-cta className={`cw-btn cw-btn--primary ${s.zipCall}`}>
                    <Phone size={16} /> Call {TFN_DISPLAY}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className={s.fine}>
            By submitting, you agree to our <a href="/tcpa">TCPA Policy</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </motion.div>

        {/* ================================================================
            RIGHT — §0 EXEMPTED SCENE. Do not strip, tone down, or apply
            the §3 animation policy to anything inside this block.
            ================================================================ */}
        <motion.div
          className={s.canvasWrap}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.9, y: reduce ? 0 : 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className={s.stage}>
            <motion.div
              className={s.float}
              animate={reduce ? {} : { y: [0, -14, 0], scale: [1, 1.015, 1], rotateZ: [0, 0.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className={s.glow} aria-hidden="true" />
              <Image
                src="/smart-hero-home.png"
                alt="Isometric illustration of a smart home connected to fiber internet with glowing data lines"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={s.heroImg}
                style={{ objectFit: "contain" }}
              />
              <FiberLines />
            </motion.div>
          </div>

          {/* Two static badges. Both are sourced facts, not live readings.
              The old 1.2 Gbps badge is gone: labelling a static number
              as a live reading is the banned fake-telemetry pattern
              (§4). The star-rating badge is gone outright — unsourced
              rating (§4). */}
          <div className={`${s.floater} ${s.floatTR}`}>
            <div className={s.floatInner}>
              <span className={s.floatIcon}>
                <Gauge size={18} />
              </span>
              <span>
                <span className={s.floatVal}>Up to 1.5 Gig</span>
                <span className={s.floatLbl}>Where available</span>
              </span>
            </div>
          </div>

          <div className={`${s.floater} ${s.floatBR}`}>
            <div className={s.floatInner}>
              <span className={s.floatIcon}>
                <ShieldCheck size={18} />
              </span>
              <span>
                <span className={s.floatVal}>30-day</span>
                <span className={s.floatLbl}>Money-back guarantee</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
