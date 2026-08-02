import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Sitewide default share image — Next.js wires this up as both og:image and
 * twitter:image automatically (metadata.twitter.card is already
 * summary_large_image in the root layout). Individual routes can override
 * by adding their own opengraph-image file; none currently do.
 */
export default async function OpengraphImage() {
  const logoData = await readFile(
    path.join(process.cwd(), "public/assets/adpro-mark.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#08131f",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(35,174,192,0.32) 0%, rgba(37,137,206,0.08) 45%, transparent 70%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse
            renders via Satori, not the DOM; next/image doesn't apply here. */}
        <img src={logoSrc} width={96} height={64} alt="" style={{ marginBottom: 32 }} />
        <div
          style={{
            fontSize: 62,
            fontWeight: 600,
            color: "#f5f4f1",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          Proactive.
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            backgroundImage: "linear-gradient(100deg, #23aec0, #6bd6e4 55%, #9ee7f0)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Never reactive.
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 26,
            color: "rgba(245,244,241,0.62)",
            display: "flex",
          }}
        >
          Media, creative &amp; production — Lusaka, Zambia
        </div>
      </div>
    ),
    { ...size }
  );
}
