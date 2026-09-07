import { Phone } from "lucide-react";
import { TEL_HREF } from "@/lib/site";
import s from "./home.module.css";

/* ============================================================
   CALL TO ORDER — the single order CTA used on every card.

   Every product card on the site ends in one of these, so the
   path to an order is the same everywhere and the tel: href
   resolves from one constant (§8) rather than being re-typed.

   Variants:
     card  — full-width, sits at the bottom of a product card
     solid — filled, for dark grounds and section-level CTAs
   ============================================================ */

export default function CallToOrder({
  variant = "card",
  label = "Call to order",
  className = "",
}: {
  variant?: "card" | "solid";
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={TEL_HREF}
      data-call-cta
      className={`${s.orderBtn} ${variant === "solid" ? s.orderBtnSolid : ""} ${className}`}
    >
      <Phone size={16} aria-hidden="true" />
      {label}
    </a>
  );
}
