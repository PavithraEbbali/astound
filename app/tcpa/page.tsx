import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "TCPA Policy",
  description: `${site.brand}'s Telephone Consumer Protection Act (TCPA) policy: consent, calls, texts, and how to opt out.`,
  alternates: { canonical: "/tcpa" },
};

export default function Page() {
  return (
    <LegalLayout title="TCPA Policy">
      <p>
        {site.brand} respects your communication preferences and complies with the Telephone Consumer
        Protection Act (TCPA) and related rules. This policy explains how and when we contact you by phone and
        text, and how to opt out.
      </p>

      <h2>Your consent</h2>
      <p>
        When you submit your phone number through our forms or ask us to contact you, you agree that {site.brand}
        and its authorized partners may call or text you — including using automated technology and prerecorded
        or artificial voice messages — at the number provided, about {site.partner} plans, your order, and
        related offers.
      </p>
      <p>
        <strong>Consent is not a condition of purchase.</strong> You can still order service without agreeing to
        automated marketing contact by calling us directly.
      </p>

      <h2>Message frequency and rates</h2>
      <p>
        Message frequency varies based on your interactions with us. Message and data rates may apply depending
        on your mobile plan. We do not control carrier charges.
      </p>

      <h2>How to opt out</h2>
      <ul>
        <li><strong>Text:</strong> reply <strong>STOP</strong> to any text message to unsubscribe, or <strong>HELP</strong> for assistance.</li>
        <li><strong>Calls:</strong> tell our agent you wish to be placed on our internal Do-Not-Call list.</li>
        <li><strong>Email:</strong> send a removal request to <a href={`mailto:${site.email}`}>{site.email}</a>.</li>
      </ul>
      <p>Please allow a reasonable time to process opt-out requests across all systems.</p>

      <h2>Internal Do-Not-Call list</h2>
      <p>
        We maintain an internal Do-Not-Call list and honor the National Do-Not-Call Registry. Once you opt out,
        we will not contact you for marketing purposes, though we may still send transactional messages about an
        order you placed.
      </p>

      <h2>Accurate information</h2>
      <p>
        Please give us a phone number you own or are authorized to provide. Notify us if your number changes so
        we don&apos;t contact someone who has since acquired your old number.
      </p>

      <h2>Contact</h2>
      <p>Questions about this policy? Call <a href={site.phoneHref}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalLayout>
  );
}
