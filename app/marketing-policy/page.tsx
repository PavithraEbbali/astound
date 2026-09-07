import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketing Policy",
  description: `${site.brand}'s marketing and advertising standards as an authorized ${site.partner} reseller.`,
  alternates: { canonical: "/marketing-policy" },
};

export default function Page() {
  return (
    <LegalLayout title="Marketing Policy">
      <p>
        {site.brand} is committed to honest, transparent advertising. This policy outlines the standards we hold
        ourselves to when marketing {site.partner} services.
      </p>

      <h2>Truthful and clear advertising</h2>
      <ul>
        <li>We present pricing and offers accurately and clarify that final terms are set and confirmed by {site.partner}.</li>
        <li>We disclose material conditions — such as promotional periods, contract requirements, and add-on costs — where they apply.</li>
        <li>We do not make deceptive claims about speeds, savings, or availability.</li>
      </ul>

      <h2>Clear reseller identity</h2>
      <p>
        Our advertising identifies {site.brand} as an independent authorized reseller. We do not impersonate
        {site.partner} or imply that we are the official brand. We avoid using brand names in ways that could
        confuse you about who you are dealing with.
      </p>

      <h2>Consent-based outreach</h2>
      <p>
        Phone and text marketing follow our <a href="/tcpa">TCPA Policy</a>. Email marketing follows applicable
        anti-spam laws (such as CAN-SPAM): every promotional email includes a clear unsubscribe link, and we
        honor opt-outs promptly.
      </p>

      <h2>Advertising platform compliance</h2>
      <p>
        Where we advertise through third-party platforms (for example, search and social networks), we follow
        those platforms&apos; advertising policies, including rules on accurate representation, prohibited
        content, and proper use of brand names.
      </p>

      <h2>Your choices</h2>
      <p>
        You can opt out of marketing at any time by replying STOP to texts, using the unsubscribe link in
        emails, or emailing <a href={`mailto:${site.email}`}>{site.email}</a>. See our {""}
        <a href="/privacy">Privacy &amp; Data Protection</a> notice for more.
      </p>
    </LegalLayout>
  );
}
