import ScrollReveal from "./animations/ScrollReveal";
import { finePrint } from "@/lib/content";
import { TRADEMARK_LINES } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   FINE PRINT (§6)

   Every asterisk on the page resolves here, and every figure names
   its source and the date it was read. This is the anchor target
   for the "Pricing as of ..." link in the price lockup.

   Presentation history:
     1. five uniform boxes of dense body text — unreadable
     2. a <details> disclosure list — readable, but it sat directly
        under the FAQ accordion and read as a second FAQ
     3. this: a terms table. Label in the left column, terms in the
        right, hairline rules between rows. Everything is visible at
        once with no interaction, the type is deliberately small and
        legal in tone, and it cannot be mistaken for a Q&A.
   ============================================================ */

export default function FinePrint() {
  return (
    <section className="cw-section" id="fine-print">
      <div className="cw-shell">
        <ScrollReveal className={s.fineHead}>
          <h2 className={s.fineTitle}>Fine print</h2>
          <p className={s.fineIntro}>
            Terms behind every figure marked * on this page. All rates and conditions are Astound
            Broadband&apos;s.
          </p>
        </ScrollReveal>

        <dl className={s.fineTable}>
          {finePrint.map((f) => (
            <div className={s.fineRow} key={f.id}>
              <dt className={s.fineTerm}>{f.title}</dt>
              <dd className={s.fineDef}>{f.body}</dd>
            </div>
          ))}
        </dl>

        <div className={s.tmLines}>
          {TRADEMARK_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
