import React from "react";
import {
  Info, Tag, Truck, ShieldCheck, Copyright, CheckCircle2,
  Megaphone, Database, Lock, CreditCard, Scale, FileText,
} from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import LegalTOC from "./LegalTOC";
import { site } from "@/lib/site";
import s from "./legal.module.css";

const ICONS = [Info, Tag, Truck, ShieldCheck, Copyright, CheckCircle2, Megaphone, Database, Lock, CreditCard, Scale, FileText];

/** Flatten any React node tree down to its text content (for titles/ids). */
function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement(node)) return textOf((node.props as { children?: React.ReactNode }).children);
  return "";
}

const slug = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Section = { id: string; title: string; body: React.ReactNode[] };

export default function LegalLayout({
  title,
  updated = "June 22, 2026",
  intro,
  children,
}: {
  title: string;
  updated?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  // Split flat <h2>…content… children into discrete sections.
  const nodes = React.Children.toArray(children);
  const preamble: React.ReactNode[] = [];
  const sections: Section[] = [];
  let cur: Section | null = null;
  for (const n of nodes) {
    if (React.isValidElement(n) && n.type === "h2") {
      const t = textOf((n.props as { children?: React.ReactNode }).children);
      cur = { id: slug(t), title: t, body: [] };
      sections.push(cur);
    } else if (cur) {
      cur.body.push(n);
    } else {
      preamble.push(n);
    }
  }

  const defaultIntro = `${site.brand} is an independent, authorized reseller of ${site.partner}. Please read this policy before using our website or engaging our services.`;

  return (
    <>
      <Nav />
      <main className={s.wrap}>
        <header className={s.hero}>
          <span className={s.eyebrow}><span className={s.eyebrowDot} /> Legal &amp; Compliance</span>
          <h1 className={s.htitle}>{title}</h1>
          <p className={s.intro}>{intro ?? defaultIntro}</p>
          <p className={s.date}>Effective Date: {updated}</p>
        </header>

        <div className={s.layout}>
          <LegalTOC items={sections.map(({ id, title: t }) => ({ id, title: t }))} />

          <div className={s.cards}>
            {preamble.length > 0 && <div className={s.lead}>{preamble}</div>}
            {sections.map((sec, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <article key={sec.id} id={sec.id} className={`${s.lcard} cw-beam`}>
                  <span className={s.lcardIcon}><Icon size={20} /></span>
                  <div className={s.lcardBody}>
                    <h2 className={s.lcardTitle}>
                      <span className={s.lcardNum}>{i + 1}.</span> {sec.title}
                    </h2>
                    {sec.body}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
