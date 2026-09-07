"use client";

import { useEffect, useState } from "react";
import s from "./legal.module.css";

/** "On this page" navigator with scroll-spy active highlighting. */
export default function LegalTOC({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className={s.toc} aria-label="On this page">
      <p className={s.tocLabel}>On this page</p>
      <ol>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={active === it.id ? s.tocActive : ""}>
              <span className={s.tocNum}>{i + 1}.</span> {it.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
