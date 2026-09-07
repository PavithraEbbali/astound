import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Fulfillment",
  description: `How ${site.brand} fulfills orders for ${site.partner} services, including installation, billing, and cancellations.`,
  alternates: { canonical: "/service-fulfillment" },
};

export default function Page() {
  return (
    <LegalLayout title="Service Fulfillment">
      <p>
        This page explains how an order placed through {site.brand} is fulfilled, and which parts are handled by
        us versus by {site.partner}.
      </p>

      <h2>How an order works</h2>
      <ul>
        <li><strong>1. Availability check:</strong> we confirm which {site.partner} plans reach your address.</li>
        <li><strong>2. Plan selection:</strong> we help you choose a plan and review pricing and terms.</li>
        <li><strong>3. Order placement:</strong> we submit your order to {site.partner}, who creates your account and contract.</li>
        <li><strong>4. Installation/activation:</strong> {site.partner} schedules professional installation or ships self-install equipment.</li>
      </ul>

      <h2>Who provides the service</h2>
      <p>
        The telecommunications service itself is provided by {site.partner} under {site.partner}&apos;s customer
        agreement, terms of service, and acceptable use policy. {site.brand} facilitates the sale and supports
        you through the process but is not the network operator.
      </p>

      <h2>Installation and equipment</h2>
      <p>
        Installation timelines, professional vs. self-install options, and equipment (such as modems and WiFi
        gear) are determined by {site.partner} and may vary by location and plan. Any installation fees,
        equipment charges, or shipping terms are set by {site.partner}.
      </p>

      <h2>Billing and payments</h2>
      <p>
        After activation, {site.partner} bills you directly for your monthly service under the pricing confirmed
        on your order. Promotional rates, taxes, surcharges, and fees are applied by {site.partner}. Payment card
        handling follows the safeguards in our <a href="/pci-dss">PCI DSS</a> statement.
      </p>

      <h2>Changes, cancellations, and refunds</h2>
      <ul>
        <li>New residential orders are generally covered by {site.partner}&apos;s 30-day money-back guarantee.</li>
        <li>To change or cancel service after activation, contact {site.partner} or reach us and we&apos;ll help direct your request.</li>
        <li>Refunds, proration, and early-termination terms (if any) are governed by {site.partner}&apos;s agreement.</li>
      </ul>

      <h2>Need help?</h2>
      <p>
        Call <a href={site.phoneHref}>{site.phone}</a> ({site.hours}) or email {""}
        <a href={`mailto:${site.email}`}>{site.email}</a> and we&apos;ll point you in the right direction.
      </p>
    </LegalLayout>
  );
}
