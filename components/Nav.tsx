"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import AstoundLogo from "./AstoundLogo";
import { nav, BRAND_NAME, WORDMARK, TFN_DISPLAY, TEL_HREF, DISCLOSURE_LINE } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   NAV

   §3 keeps header condense-on-scroll (explicitly allowed). The
   scroll-progress bar was removed — it is a scroll-scrubbed element
   and is not on the allowed list.

   The persistent top-bar disclosure now resolves from
   DISCLOSURE_LINE so the agreement noun cannot drift between
   surfaces.
   ============================================================ */

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const to = (href: string) => (onHome ? href : `/${href}`);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <div className={s.banner}>{DISCLOSURE_LINE}</div>

      <header className={`${s.nav} ${scrolled ? s.navScrolled : ""}`}>
        <nav className={`cw-shell ${s.navInner}`} aria-label="Primary">
          <a href={to("#top")} className={s.logo} aria-label={`${BRAND_NAME} — ${WORDMARK}`}>
            <AstoundLogo wordmark={BRAND_NAME} tagline={WORDMARK} />
          </a>

          <ul className={s.navLinks}>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={to(n.href)}>{n.label}</a>
              </li>
            ))}
          </ul>

          <div className={s.navCta}>
            <a href={TEL_HREF} data-call-cta className={s.navPhone}>
              <Phone size={15} /> {TFN_DISPLAY}
            </a>
            <button
              className={`${s.burger} cw-btn cw-btn--ghost`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              suppressHydrationWarning
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(29,31,32,0.6)",
              backdropFilter: "blur(6px)",
            }}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "min(80vw, 320px)",
                background: "#fff",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="cw-btn cw-btn--ghost"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  suppressHydrationWarning
                >
                  <X size={20} />
                </button>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "1rem 0",
                  display: "grid",
                  gap: "1rem",
                }}
              >
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={to(n.href)}
                      onClick={() => setOpen(false)}
                      style={{
                        fontFamily: "var(--cw-font-display)",
                        fontWeight: 600,
                        fontSize: "1.2rem",
                      }}
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={TEL_HREF}
                data-call-cta
                className="cw-btn cw-btn--primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Phone size={18} /> {TFN_DISPLAY}
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
