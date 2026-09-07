import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Bundle from "@/components/Bundle";
import TVSection from "@/components/TVSection";
import MobilePhone from "@/components/MobilePhone";
import WhyUs from "@/components/WhyUs";
import Coverage from "@/components/Coverage";
import FAQ from "@/components/FAQ";
import FinePrint from "@/components/FinePrint";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import {
  ENTITY_LEGAL_NAME,
  SITE_URL,
  PARTNER,
  AGREEMENT_NOUN,
  WORDMARK,
} from "@/lib/site";

/* ============================================================
   §2 SECTION ORDER

   Requested: fiber → cable → bundles → tv → mobile → phone.
   Built:     internet → bundles → tv → mobile → phone.

   "Cable" is not a separate Astound product (see the note in
   components/Services.tsx). The single Internet section is ordered
   fastest-and-most-fiber-first, which preserves the intent of
   "fiber then cable" without inventing a product line.

   The <Marquee/> that sat between the hero and the plans is gone:
   §3 bans the infinite scrolling ticker outright.
   ============================================================ */

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${WORDMARK} — Internet, TV, Mobile & Home Phone`,
  description: `Compare and order ${PARTNER} internet, TV via DIRECTV, mobile and home phone plans through an independent authorized ${AGREEMENT_NOUN.toLowerCase()}.`,
  url: SITE_URL,
  about: { "@type": "Thing", name: `${PARTNER} internet, mobile, TV and home phone services` },
  provider: {
    "@type": "Organization",
    name: ENTITY_LEGAL_NAME,
    description: `Independent authorized ${AGREEMENT_NOUN.toLowerCase()} of ${PARTNER}`,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Nav />
      <main>
        <HeroSection />
        <Services />
        <Bundle />
        <TVSection />
        <MobilePhone />
        <WhyUs />
        <Coverage />
        <FAQ />
        <FinePrint />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
