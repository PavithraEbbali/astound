import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Data Protection",
  description: `How ${site.brand}, an authorized ${site.partner} reseller, collects, uses, and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <LegalLayout title="Privacy & Data Protection">
      <p>
        Your privacy matters to us. This notice explains what information {site.brand} collects when you use
        this website or contact us about {site.partner} services, why we collect it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Details you give us:</strong> name, phone number, email, service address or ZIP code, and the plans you&apos;re interested in.</li>
        <li><strong>Usage data:</strong> pages viewed, approximate location from your IP, device and browser type, collected through cookies and similar tools.</li>
        <li><strong>Communications:</strong> notes from calls, chats, web forms, or messages you send us.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To check service availability at your address and recommend suitable {site.partner} plans.</li>
        <li>To place and support your order, and to follow up about your request.</li>
        <li>To improve our website, measure marketing performance, and prevent fraud.</li>
        <li>To meet legal, tax, and regulatory obligations.</li>
      </ul>

      <h2>How we share information</h2>
      <p>
        To complete an order you ask us to place, we share the details needed with {site.partner} and our
        order-processing partners. We also use trusted service providers (hosting, analytics, communications)
        who may only process data on our instructions. We do <strong>not</strong> sell your personal
        information for money.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>Request access to, correction of, or deletion of your personal information.</li>
        <li>Opt out of marketing messages at any time (see our <a href="/marketing-policy">Marketing Policy</a>).</li>
        <li>Control cookies through our <a href="/cookies">Cookies Policy</a> and your browser settings.</li>
        <li>Depending on your state (for example, California, Virginia, Colorado), you may have additional rights to opt out of targeted advertising or certain data sharing.</li>
      </ul>

      <h2>Data security</h2>
      <p>
        We use administrative, technical, and physical safeguards to protect your information. Payment-related
        handling follows recognized security standards described in our <a href="/pci-dss">PCI DSS</a> statement.
        No method of transmission is perfectly secure, but we work to protect your data appropriately.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep personal information only as long as needed for the purposes above or as required by law, after
        which we delete or anonymize it.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>This website is intended for adults. We do not knowingly collect information from children under 13.</p>

      <h2>Contact us</h2>
      <p>
        Questions or requests about your data? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call {""}
        <a href={site.phoneHref}>{site.phone}</a>. We may verify your identity before acting on a request.
      </p>
    </LegalLayout>
  );
}
