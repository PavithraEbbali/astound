import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `${site.brand} is an independent authorized reseller of ${site.partner}. Read our disclaimer about pricing, availability, and affiliation.`,
  alternates: { canonical: "/disclaimer" },
};

export default function Page() {
  return (
    <LegalLayout title="Disclaimer">
      <h2>Independent reseller status</h2>
      <p>
        {site.legalEntity} operates as {site.brand}, an independent and authorized reseller of {site.partner}
        services. We are not owned by, and do not operate as, {site.partner}. This website is not the official
        {site.partner} website. References to {site.partner} are made only to describe the services you can
        order through us.
      </p>

      <h2>Pricing and availability</h2>
      <p>
        All prices, speeds, promotional offers, gift cards, equipment terms, and service availability shown on
        this site are set by {site.partner}, depend on your specific service address, and may change or end at
        any time without notice. Figures shown here are estimates for general information. The binding terms of
        your service are those confirmed by {site.partner} at the time you place your order.
      </p>

      <h2>No guarantee of results</h2>
      <p>
        Actual internet speeds, coverage, and performance vary based on factors including your location,
        equipment, network conditions, and plan. We make no warranty that any specific speed, price, or
        promotion will be available to you.
      </p>

      <h2>Third-party links and trademarks</h2>
      <p>
        This site may link to {site.partner} or other third-party websites that we do not control and are not
        responsible for. All trademarks belong to their respective owners; see our <a href="/trademarks">Trademarks</a> page.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {site.brand} is not liable for any indirect, incidental, or
        consequential damages arising from your use of this website or from services provided by {site.partner}.
        Your service relationship for telecommunications is ultimately with {site.partner} under its agreements.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this disclaimer? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call {""}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    </LegalLayout>
  );
}
