"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { faqs } from "@/lib/content";
import s from "./home.module.css";

/* ============================================================
   FAQ — §4 rewrite.

   The previous heading paired "clear answers" with a
   zero-pressure claim, a close variant of the banned
   no-pressure/no-runaround family.
   Heading now: "Questions people ask before ordering".

   FAQ Q1 ("Are you the official Astound Broadband website?") is
   kept verbatim — §4 says the existing answer is accurate and
   compliant. The remaining answers were re-grounded in Astound's
   own published terms and now live in lib/content.ts.

   The accordion open/close animation is explicitly allowed by §3.
   ============================================================ */

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="cw-section" id="faq" style={{ background: "var(--cw-mist)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="cw-shell">
        <ScrollReveal className={`${s.head} center`}>
          <span className="cw-eyebrow">Before you order</span>
          <h2 className="cw-h2" style={{ marginTop: "1rem" }}>
            Questions people ask <span className="cw-grad-text">before ordering</span>
          </h2>
        </ScrollReveal>

        <div className={s.faqList}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={f.q} as="div" className={s.faqItem}>
                <button
                  className={s.faqQ}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  suppressHydrationWarning
                >
                  <span className={s.faqQText}>
                    <span className={s.faqNum}>{String(i + 1).padStart(2, "0")}</span>
                    {f.q}
                  </span>
                  <Plus size={20} style={{ transform: isOpen ? "rotate(45deg)" : "none" }} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={s.faqA}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
