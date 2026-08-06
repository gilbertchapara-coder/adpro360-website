import type { NextConfig } from "next";
import path from "path";

/**
 * Production-readiness audit: the site shipped with zero security headers.
 * `'unsafe-inline'` on script-src/style-src is a real, known tradeoff, not
 * an oversight — a nonce-based strict-dynamic CSP needs middleware to mint
 * a per-request nonce and thread it through every inline `<style>`/`style=`
 * this codebase uses extensively (masks, animation-delay, per-logo
 * transforms), and Next's own hydration bootstrap script. Getting that
 * wrong silently blanks the page in production, which is worse than the
 * header being merely imperfect — so this stays the safer middle ground:
 * still blocks loading any script/style/image/fetch from a third-party
 * origin (the actual exfiltration/injection vector for a site with no
 * user auth or sensitive data), while `frame-ancestors 'none'` closes
 * clickjacking outright. Revisit nonces if the site ever handles
 * authenticated sessions or payment data.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Redundant with frame-ancestors above for modern browsers, kept for the
  // older browsers that only honour the legacy header.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Every one of these is unused on this site — deny by default rather
  // than silently allowing a browser API that was never opted into.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // React 19's own dev-mode double-invoke behaviour already catches most of
  // what this used to add — kept explicit rather than relying on the
  // (undocumented) default so it can't silently change on a Next upgrade.
  reactStrictMode: true,
  // Framework fingerprinting: default Next.js sends `X-Powered-By: Next.js`
  // on every response, telling any automated scanner exactly which
  // framework (and by extension, which known-CVE list) to try. No
  // functional reason for a production site to advertise this.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // A production audit found both adpro.co.zm and www.adpro.co.zm attached
  // to this Vercel project and both serving identical content with no
  // redirect between them — real duplicate-content exposure, not a
  // hypothetical one. The bare domain is what's actually used everywhere
  // else (metadataBase, every real reference to the site), so www redirects
  // to it, permanently, preserving the path.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.adpro.co.zm" }],
        destination: "https://adpro.co.zm/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
