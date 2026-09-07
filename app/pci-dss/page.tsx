import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "PCI DSS Compliance",
  description: `${site.brand}'s commitment to payment card security and PCI DSS standards.`,
  alternates: { canonical: "/pci-dss" },
};

export default function Page() {
  return (
    <LegalLayout title="PCI DSS Compliance">
      <p>
        {site.brand} takes the security of payment information seriously. This statement describes our approach
        to the Payment Card Industry Data Security Standard (PCI DSS).
      </p>

      <h2>What PCI DSS is</h2>
      <p>
        PCI DSS is a global security standard created by the major card networks to protect cardholder data. It
        covers how card information is handled, processed, stored, and transmitted.
      </p>

      <h2>How we handle payments</h2>
      <ul>
        <li>We minimize contact with raw card data. Where payment is required, it is processed by {site.partner} or by PCI-DSS-compliant payment processors.</li>
        <li>We do not store full payment card numbers, CVV codes, or magnetic-stripe data on this website.</li>
        <li>Card data, when transmitted, is protected using encryption in transit (TLS).</li>
      </ul>

      <h2>Our safeguards</h2>
      <ul>
        <li>Access to any sensitive data is restricted to authorized personnel on a need-to-know basis.</li>
        <li>We use reputable, PCI-DSS-validated service providers for payment processing.</li>
        <li>We maintain reasonable administrative, technical, and physical controls, and review them periodically.</li>
      </ul>

      <h2>Your role in staying secure</h2>
      <ul>
        <li>Only share payment details through secure, verified channels.</li>
        <li>Be cautious of anyone requesting card information by unsolicited call, text, or email claiming to be us.</li>
        <li>Report anything suspicious to <a href={`mailto:${site.email}`}>{site.email}</a> immediately.</li>
      </ul>

      <h2>Important note</h2>
      <p>
        Final billing for {site.partner} service is handled by {site.partner} under its own systems and security
        program. This statement describes {site.brand}&apos;s practices for any payment interactions that occur
        through us. See also our <a href="/privacy">Privacy &amp; Data Protection</a> notice.
      </p>
    </LegalLayout>
  );
}
