Image assets actually present in this folder (all .jpeg, case-sensitive):

  family.jpeg        -> Internet section, "1.5 Gig Internet" card
  mobile-woman.jpeg  -> Internet section, "Gig Internet" card
                        and Mobile section, offer card
  home-phone.jpeg    -> Internet section, "Lower speed tiers" card
                        and Home Phone section
  couple-tv.jpeg     -> TV section, "DIRECTV via Astound" card
  agent.jpeg         -> Why-order-through-us section, tall card

Referenced in code as /images/<filename>.
Recommended: JPG/WebP, ~1600px wide, optimized (<300KB each).

NOTE: an earlier version of this file listed a sixth asset,
phone-mockup.jpg, for the bundle builder's dark card. That file was
never added, and the code referenced it as phone-mockup.jpeg, so it
404'd on every page load. The <img> has been removed from
components/Bundle.tsx. If you want a bundle-card image, drop the file
here and re-add the tag; nothing else depends on it.

No existing image was deleted, replaced or re-sourced in this pass.
