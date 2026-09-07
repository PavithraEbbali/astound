import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand} — Authorized Astound Broadband Reseller`,
    short_name: site.brand,
    description: "Compare and order Astound Broadband internet, mobile & TV through an authorized reseller.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#483092",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
