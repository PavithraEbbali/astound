"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Phone } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { coverage, zipWidget } from "@/lib/content";
import { TEL_HREF, TFN_DISPLAY, PARTNER } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   COVERAGE + ZIP CHECKER

   §1 — the place-name list is now Astound's real published service
   areas, read from the astound.com region selector on 2026-09-07,
   with the named sub-areas Astound itself lists.

   §5 — ZIP checker resolution: option (b). This build ships no
   backend, so the widget captures the ZIP and routes to the call
   with honest copy. It claims NO verdict either way and must never
   render an unconditional "available" response. The banned
   instant-results microcopy is gone, because nothing is looked up.
   ============================================================ */

const ZIP_RE = /^\d{5}$/;

export default function Coverage() {
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ZIP_RE.test(zip)) {
      setError(true);
      setChecked(null);
      return;
    }
    setError(false);
    setChecked(zip);
  };

  return (
    <section className="cw-section" id="coverage">
      <div className="cw-shell">
        <div className={s.coverGrid}>
          <ScrollReveal>
            <span className="cw-eyebrow">
              <MapPin size={14} /> Where Astound operates
            </span>
            <h2 className="cw-h2" style={{ marginTop: "1rem" }}>
              Astound&apos;s published service areas
            </h2>
            <p className="cw-lead" style={{ margin: "1rem 0 1.6rem" }}>
              {PARTNER} lists the areas below. Being in one of them does not mean service reaches your
              specific address, and it does not mean fiber-powered speeds are built there. Astound
              determines both address by address.
            </p>

            <ul className={s.stateGrid}>
              {coverage.states.map((c) => (
                <li className={s.statePill} key={c.state} title={c.detail}>
                  {c.state}
                </li>
              ))}
            </ul>

            <p style={{ fontSize: "0.75rem", color: "var(--cw-muted)", marginTop: "1rem" }}>
              Astound may add or drop service areas at any time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className={s.checker} id="contact">
              <h3 style={{ fontSize: "1.35rem" }}>{zipWidget.title}</h3>
              <p style={{ color: "var(--cw-muted)", fontSize: "0.95rem", marginTop: "0.4rem" }}>
                {zipWidget.body}
              </p>

              <form className={s.checkerRow} onSubmit={onSubmit} noValidate>
                <label htmlFor="coverage-zip" className="cw-sr">
                  {zipWidget.label}
                </label>
                <input
                  id="coverage-zip"
                  name="zip"
                  className={s.checkerInput}
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
                <button
                  type="submit"
                  className="cw-btn cw-btn--primary"
                  aria-label={zipWidget.submit}
                  suppressHydrationWarning
                >
                  <Search size={18} />
                </button>
              </form>

              <div aria-live="polite">
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        marginTop: "0.8rem",
                        color: "#c0392b",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {zipWidget.invalid}
                    </motion.p>
                  )}

                  {checked && !error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ marginTop: "1rem", fontSize: "0.92rem", lineHeight: 1.6 }}>
                        <strong>ZIP {checked}</strong> — {zipWidget.result}
                      </p>
                      <a
                        href={TEL_HREF}
                        data-call-cta
                        className="cw-btn cw-btn--primary"
                        style={{ marginTop: "0.9rem" }}
                      >
                        <span
                          style={{ display: "inline-flex", gap: ".5rem", alignItems: "center" }}
                        >
                          <Phone size={16} /> Call {TFN_DISPLAY}
                        </span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p style={{ fontSize: "0.75rem", color: "var(--cw-muted)", marginTop: "1rem" }}>
                {zipWidget.fccNote}{" "}
                <a
                  href={zipWidget.fccUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--cw-violet)" }}
                >
                  broadbandmap.fcc.gov
                </a>
              </p>

              <p style={{ fontSize: "0.75rem", color: "var(--cw-muted)", marginTop: "0.6rem" }}>
                By submitting, you agree to our{" "}
                <a href="/tcpa" style={{ color: "var(--cw-violet)" }}>
                  TCPA Policy
                </a>{" "}
                and{" "}
                <a href="/privacy" style={{ color: "var(--cw-violet)" }}>
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
