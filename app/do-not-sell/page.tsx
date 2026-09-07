import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { ENTITY_LEGAL_NAME, ENTITY_EMAIL, ENTITY_ADDRESS, TFN_DISPLAY, PARTNER } from "@/lib/site";

/* ============================================================
   §7.2 — the ninth required legal page.

   The previous build shipped eight (privacy, disclaimer, cookies,
   tcpa, trademarks, marketing-policy, service-fulfillment,
   pci-dss). The missing one was this CPRA notice.

   Note on §4's guess: it flagged "Terms of Use and Do Not Sell"
   as possibly missing. Checked against the canonical §7.2 set as
   implemented across this portfolio, Terms of Use is NOT one of
   the nine; Do Not Sell or Share is. Only this page was missing.
   ============================================================ */

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Personal Information",
  description: `How to exercise your right to opt out of the sale or sharing of your personal information with ${ENTITY_LEGAL_NAME}.`,
  alternates: { canonical: "/do-not-sell" },
};

export default function Page() {
  return (
    <LegalLayout
      title="Do Not Sell or Share My Personal Information"
      intro={`If you are a California resident, the California Consumer Privacy Act as amended by the California Privacy Rights Act gives you the right to opt out of the sale or sharing of your personal information. This page explains what that means here and how to exercise it.`}
    >
      <h2>What we do with your information</h2>
      <p>
        {ENTITY_LEGAL_NAME} is an independent authorized reseller of {PARTNER}. When you submit a ZIP code
        or contact us, we use that information to identify the plans that may be available at your address
        and to place an order with {PARTNER} on your behalf.
      </p>
      <p>
        We do not sell your personal information for money. However, we use advertising and analytics
        technologies that may share identifiers, device information, and browsing activity with advertising
        partners. Under the CPRA, that activity can qualify as &ldquo;sharing&rdquo; for cross-context
        behavioral advertising, and in some interpretations as a &ldquo;sale.&rdquo; You can opt out of it.
      </p>

      <h2>Categories that may be shared</h2>
      <ul>
        <li><strong>Identifiers:</strong> device and cookie identifiers, IP address.</li>
        <li><strong>Internet activity:</strong> pages viewed on this site, referring page, interactions with our forms.</li>
        <li><strong>Geolocation:</strong> approximate location derived from your IP address or the ZIP code you enter.</li>
        <li><strong>Commercial information:</strong> the services you expressed interest in.</li>
      </ul>
      <p>
        We do not knowingly collect or share the personal information of consumers under 16 years of age.
      </p>

      <h2>How to opt out</h2>
      <p>
        You can opt out of the sale or sharing of your personal information in any of these ways:
      </p>
      <ul>
        <li>
          Email <a href={`mailto:${ENTITY_EMAIL}`}>{ENTITY_EMAIL}</a> with the subject line
          &ldquo;Do Not Sell or Share My Personal Information.&rdquo;
        </li>
        <li>Call {TFN_DISPLAY} and tell the agent you are making a Do Not Sell or Share request.</li>
        <li>Write to us at {ENTITY_ADDRESS}.</li>
        <li>
          Enable a Global Privacy Control signal in your browser. We treat a valid GPC signal as a request
          to opt out of sharing for that browser.
        </li>
      </ul>
      <p>
        You do not need an account with us to make a request, and we will not require you to create one.
      </p>

      <h2>Authorized agents</h2>
      <p>
        You may use an authorized agent to submit a request on your behalf. We may ask the agent for proof
        that you gave them written permission, and we may ask you to verify your own identity directly.
      </p>

      <h2>How we verify and respond</h2>
      <p>
        We will confirm receipt within 10 business days and respond substantively within 45 calendar days.
        If we need more time, we will tell you and may take up to 90 days in total. To verify a request we
        may ask you to confirm information you have already given us, such as the ZIP code or phone number
        you submitted. We use that information only to process the request.
      </p>

      <h2>No retaliation</h2>
      <p>
        We will not deny you services, charge you a different price, or provide you a different level or
        quality of service because you exercised any of your privacy rights.
      </p>

      <h2>Your other CPRA rights</h2>
      <p>
        Alongside opting out, you may have the right to know what personal information we collect and how we
        use it, the right to request deletion, the right to correct inaccurate information, and the right to
        limit the use of sensitive personal information. Our{" "}
        <a href="/privacy">Privacy &amp; Data Protection</a> policy explains these and how to exercise them.
      </p>

      <h2>Scope of this notice</h2>
      <p>
        This notice covers personal information held by {ENTITY_LEGAL_NAME}. Once you are an {PARTNER}
        customer, the personal information associated with your {PARTNER} account is controlled by
        {PARTNER} under its own privacy policy, and this notice does not cover it. If you have a request
        about that information, call us on the number above and we will help you place it.
      </p>
    </LegalLayout>
  );
}
