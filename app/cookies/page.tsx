import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: `How ${site.brand} uses cookies and similar technologies, and how you can control them.`,
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return (
    <LegalLayout title="Cookies Policy">
      <p>
        This policy explains how {site.brand} uses cookies and similar technologies (such as pixels and local
        storage) when you visit this website, and how you can manage them.
      </p>

      <h2>What cookies are</h2>
      <p>
        Cookies are small text files stored on your device that help a website function, remember preferences,
        and understand how visitors use the site.
      </p>

      <h2>Types of cookies we use</h2>
      <ul>
        <li><strong>Strictly necessary:</strong> required for core site functions like page navigation and security. These can&apos;t be switched off in our systems.</li>
        <li><strong>Performance & analytics:</strong> help us see which pages are popular and how the site performs, so we can improve it.</li>
        <li><strong>Functional:</strong> remember choices such as your ZIP code or preferences to personalize your experience.</li>
        <li><strong>Advertising:</strong> help measure and improve our marketing and may be set by advertising partners to show relevant ads.</li>
      </ul>

      <h2>Managing cookies</h2>
      <p>
        You can control or delete cookies through your browser settings, and you can usually opt out of
        advertising cookies via your browser or industry tools like the Digital Advertising Alliance. Blocking
        some cookies may affect how parts of the site work.
      </p>

      <h2>Do Not Track</h2>
      <p>
        Some browsers offer a &ldquo;Do Not Track&rdquo; signal. Because there is no common industry standard,
        our site does not currently respond differently to these signals, but we honor applicable opt-out rights
        described in our <a href="/privacy">Privacy &amp; Data Protection</a> notice.
      </p>

      <h2>Updates</h2>
      <p>We may update this policy as our use of cookies changes. Please check back periodically.</p>

      <h2>Contact</h2>
      <p>Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalLayout>
  );
}
