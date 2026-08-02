import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AdPro 360 — Media, Creative & Production Agency",
    short_name: "AdPro 360",
    description:
      "Full-service media sales and production agency in Lusaka, Zambia — strategy, creative, film and media placement.",
    start_url: "/",
    display: "standalone",
    background_color: "#08131f",
    theme_color: "#08131f",
    icons: [
      { src: "/icon.png", sizes: "48x48", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
