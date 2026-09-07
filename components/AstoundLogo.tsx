import s from "./home.module.css";

/* ============================================================
   ASTOUND LOGO LOCKUP

   The Astound wordmark in brand purple (#483092) with the green
   starburst (#3ab54a) to its upper right, matching the mark on
   astound.com.

   Built inline rather than as an <img> so the wordmark renders in
   the site's own display font — an external font referenced inside
   an SVG loaded via <img> would not load, and the mark would fall
   back to a serif.

   TRADEMARK POSTURE: this is nominative use of a mark owned by
   Radiate HoldCo, LLC, shown by an authorized reseller directly
   beneath the persistent "not the official Astound Broadband
   website" disclosure. It is a display mark only — it is never the
   identity of the operating business. The copyright line, entity
   statement, JSON-LD organization and page title all resolve from
   ENTITY_LEGAL_NAME, never from this.
   ============================================================ */

export default function AstoundLogo({
  wordmark,
  tagline,
  invert = false,
}: {
  wordmark: string;
  /** Reseller tagline rendered under the mark. */
  tagline?: string;
  /** Use on the dark footer ground. */
  invert?: boolean;
}) {
  return (
    <span className={`${s.brandLockup} ${invert ? s.brandLockupInvert : ""}`}>
      <span className={s.brandMark}>
        <span className={s.brandWord}>{wordmark}</span>
        <svg
          className={s.brandBurst}
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          {/* Eight tapered rays radiating from an open centre, at the
              angles and relative lengths of the mark on astound.com. */}
          <g fill="currentColor">
            <polygon points="50.0,2.0 52.0,41.2 48.0,41.2" />
            <polygon points="76.4,18.6 57.0,44.3 54.4,42.1" />
            <polygon points="95.2,37.0 59.0,49.4 57.9,45.8" />
            <polygon points="82.5,63.1 57.6,54.8 58.8,51.8" />
            <polygon points="62.7,73.8 52.9,58.5 55.5,57.1" />
            <polygon points="35.5,71.6 43.8,56.5 46.3,58.2" />
            <polygon points="17.3,59.4 41.0,50.9 41.9,54.0" />
            <polygon points="12.8,28.5 43.3,44.0 41.4,47.2" />
          </g>
        </svg>
      </span>
      {tagline && <span className={s.brandTagline}>{tagline}</span>}
    </span>
  );
}
