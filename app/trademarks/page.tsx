import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import {
  ENTITY_LEGAL_NAME,
  ENTITY_EMAIL,
  PARTNER,
  AGREEMENT_NOUN,
  TRADEMARK_ASTOUND,
  TRADEMARK_DIRECTV,
  TRADEMARK_EERO,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Trademarks",
  description: `Trademark notice for ${ENTITY_LEGAL_NAME}, an independent authorized ${AGREEMENT_NOUN.toLowerCase()} of ${PARTNER}.`,
  alternates: { canonical: "/trademarks" },
};

/* §7.5 — the generic "trademarks of their respective owners" line was
   replaced with the three specific attributions this site actually needs:
   Astound (corrected to Radiate HoldCo, LLC per §1), DIRECTV for the TV
   partnership, and eero for the Whole Home WiFi product. */

export default function Page() {
  const noun = AGREEMENT_NOUN.toLowerCase();

  return (
    <LegalLayout title="Trademarks">
      <h2>Ownership of marks</h2>
      <p>{TRADEMARK_ASTOUND}</p>
      <p>{TRADEMARK_DIRECTV}</p>
      <p>{TRADEMARK_EERO}</p>
      <p>
        {ENTITY_LEGAL_NAME} does not own any of these marks and claims no rights in them. Astound Broadband is a
        d/b/a of Radiate HoldCo, LLC, which owns the brand and operates the network.
      </p>

      <h2>Nominative use</h2>
      <p>
        We reference {PARTNER} trademarks only as reasonably necessary to identify and describe the services
        we are authorized to sell. This is known as &ldquo;nominative fair use.&rdquo; Our use of these names
        does not imply that {PARTNER} sponsors, endorses, or is affiliated with this website beyond our
        authorized {noun} relationship.
      </p>

      <h2>DIRECTV and eero</h2>
      <p>
        The television service described on this site is offered through {PARTNER}&apos;s partnership with
        DIRECTV and is delivered over your Astound internet connection. DIRECTV is a separate company and
        owns its own marks. eero is referenced because {PARTNER}&apos;s Whole Home WiFi product uses eero
        hardware; eero is an Amazon company and owns its own marks.
      </p>

      <h2>Use of the Astound mark on this site</h2>
      <p>
        The Astound wordmark and starburst shown in this site&apos;s header and footer are Astound
        Broadband&apos;s marks, displayed under our authorized {noun} relationship to identify the services
        we sell. They are not marks of {ENTITY_LEGAL_NAME}, and their presence does not make this the
        official {PARTNER} website. Other product and company names mentioned on this site may be the
        trademarks of their respective owners.
      </p>

      <h2>No endorsement</h2>
      <p>
        Nothing on this website should be read as a claim of ownership over third-party trademarks, or as an
        official statement by any trademark owner.
      </p>

      <h2>Reporting concerns</h2>
      <p>
        If you believe any content on this site misuses a trademark, please contact us at{" "}
        <a href={`mailto:${ENTITY_EMAIL}`}>{ENTITY_EMAIL}</a> and we will review it promptly.
      </p>
    </LegalLayout>
  );
}
