import NextLink from "next/link";
import { Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { cn } from "@/lib/utils/cn";
import { team } from "@/lib/content";

export function TeamPreview() {
  return (
    <Section tone="ivory" paddingY="none" className="pb-section-y-alt-1 pt-0">
      <Container>
        <SectionIntro
          eyebrow="06 — The people"
          action={{ label: "Meet the team", href: "/team" }}
          className="mb-[52px]"
          headingClassName="max-w-copy"
        >
          Senior hands on every brief.
        </SectionIntro>

        <div className="gap-block-md grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {team.map((member, index) => {
            const featured = index === 0;
            return (
              <Reveal key={member.id} as="div" className={cn(featured && "sm:col-span-2")}>
                <NextLink
                  href={`/team#${member.id}`}
                  data-cursor="Read bio"
                  className="group text-ink block"
                >
                  <div
                    className={cn(
                      "mb-s16 bg-card-alt relative overflow-hidden rounded-xl",
                      featured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[3/4]"
                    )}
                  >
                    {/* Standardised portrait grade — CD review: "standardise
                        the portrait treatment (one grade/duotone) for a
                        cohesive, owned look." Applies equally to every
                        portrait regardless of the underlying photo. */}
                    <div className="team-portrait-grade ease-out absolute inset-0 transition-transform duration-[var(--duration-moderate-plus)] group-hover:scale-[1.03]">
                      <MediaSlot
                        src={member.photo}
                        alt={`${member.name} — ${member.role}`}
                        sizes={featured ? "100vw" : "(min-width: 640px) 33vw, 100vw"}
                      />
                    </div>
                    {/* Hover reveal — CD review: "add a hover reveal... or a
                        short personal line." Reuses the member's own real
                        `lede` credit, nothing invented. */}
                    <div className="from-ink/92 ease-signature p-s16 absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-[opacity,transform] duration-[var(--duration-moderate)] group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-ivory/92 text-sm leading-snug-2 text-pretty">
                        {member.lede}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "tracking-tight-1 font-semibold",
                      featured ? "text-h2" : "text-h3-a"
                    )}
                  >
                    {member.name}
                  </div>
                  <div className="mt-s03 tracking-eyebrow-3 text-link/85 text-xs font-bold uppercase">
                    {member.role}
                  </div>
                </NextLink>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
