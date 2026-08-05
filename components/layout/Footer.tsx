import NextLink from "next/link";
import { Logo } from "./Logo";
import { fullNav, site } from "@/lib/content";

/** LinkedIn/Instagram/Facebook were placeholder `href="#"` — no real
 * profile exists for any of them yet, so per the production audit they've
 * been removed rather than shipped as dead links. Add them back here the
 * moment real profile URLs exist; WhatsApp is the only channel that's
 * real today. */
const socialLinks = [{ label: "WhatsApp", href: site.whatsappHref }];

export function Footer() {
  return (
    <footer className="bg-ivory px-gutter-x pb-s25">
      <div className="max-w-content gap-footer-gap border-ink/14 pt-footer-pt mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t">
        <div>
          <Logo size="lg" className="mb-s15" />
          <p className="leading-body text-ink/60 max-w-2xs text-base">
            Full-service media sales and production agency. Building brands that matter, from
            Lusaka.
          </p>
        </div>

        <div>
          <div className="mb-s15 text-eyebrow tracking-eyebrow-4 text-ink/62 font-bold uppercase">
            Navigate
          </div>
          {/* -my/py expands the tap target ~20px without moving the
              visible text or the gap between rows — same invisible-padding
              trick already used on the filter chips and carousel dots. */}
          <div className="gap-s07 grid">
            {fullNav.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                className="text-ink/72 ease-signature hover:text-link -my-[10px] block py-[10px] text-base transition-colors duration-[var(--duration-base)]"
              >
                {item.label}
              </NextLink>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-s15 text-eyebrow tracking-eyebrow-4 text-ink/62 font-bold uppercase">
            Contact
          </div>
          <div className="gap-s07 text-ink/72 grid text-base">
            {/* text-ink/72 set explicitly, not just inherited from the parent
                div — the sitewide `a { color: var(--color-link) }` base rule
                (globals.css) has higher specificity than inherited color and
                was rendering these as link-blue on ivory at 3.99:1 contrast,
                under the 4.5:1 AA minimum. Matches the Navigate column's
                links, which already set this explicitly for the same reason. */}
            <a href={site.emailHref} className="text-ink/72 -my-[10px] block py-[10px]">
              {site.email}
            </a>
            <a href={site.phoneHref} className="text-ink/72 -my-[10px] block py-[10px]">
              {site.phone}
            </a>
            <span className="leading-snug-4">
              {site.address.line1}
              <br />
              {site.address.line2}
            </span>
          </div>
        </div>

        <div>
          <div className="mb-s15 text-eyebrow tracking-eyebrow-4 text-ink/62 font-bold uppercase">
            Message us
          </div>
          <div className="gap-s07 grid text-base">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/72 -my-[10px] block py-[10px]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy/Terms links removed — both were placeholder `href="#"`
          with no real page behind them. Now that the contact form
          actually processes personal data server-side (app/api/contact),
          a real privacy policy is a genuine outstanding requirement, not
          just a nice-to-have — add both back here once real pages exist. */}
      {/* text-ink/45 measured at 2.98:1 on ivory, under the 4.5:1 AA
          minimum for this size. Bumped to /62 -- the same "muted label"
          opacity already used by the eyebrows above (Navigate/Contact/
          Message us), not a new value invented for this one line. */}
      <div className="mt-footer-mt max-w-content gap-s13 border-ink/10 pt-s17 text-sm-minus text-ink/62 mx-auto flex flex-wrap justify-between border-t">
        <span>© {new Date().getFullYear()} AdPro 360. All rights reserved.</span>
      </div>
    </footer>
  );
}
