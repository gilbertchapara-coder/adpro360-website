import { Heading, Container, Section, Card } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { MediaSlot } from "@/components/shared/MediaSlot";
import { team } from "@/lib/content";

/** Full profiles, not the Home preview's name-and-photo card — the same
 * `team` records, `id={member.id}` anchors so TeamPreview's `/team#id`
 * links land on the right profile. */
export function TeamRoster() {
  return (
    <Section tone="ivory">
      <Container>
        <Reveal>
          <Heading variant="eyebrow" as="div" className="mb-s26">
            02 — The people
          </Heading>
        </Reveal>

        <div className="border-ink/10 grid border-t">
          {team.map((member) => (
            <div
              key={member.id}
              id={member.id}
              className="border-ink/10 py-s27 scroll-mt-[100px] border-b"
            >
              <div className="gap-split-gap grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr]">
                <Reveal>
                  <div className="bg-card-alt relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <div className="team-portrait-grade ease-signature absolute inset-0 transition-transform duration-[var(--duration-moderate-plus)] hover:scale-[1.03]">
                      <MediaSlot
                        src={member.photo}
                        alt={`${member.name} — ${member.role}`}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </div>
                  </div>
                </Reveal>

                <div>
                  <Reveal delay={60}>
                    <div className="tracking-eyebrow-3 text-link mb-s07 text-xs font-bold uppercase">
                      {member.role}
                    </div>
                    <Heading as="h2" variant="h2" className="mb-s16 text-fluid-06 font-semibold">
                      {member.name}
                    </Heading>
                    <p className="text-body-md leading-body text-ink/66 mb-s21 max-w-copy text-pretty">
                      {member.lede}
                    </p>
                  </Reveal>

                  {member.bio.map((paragraph, i) => (
                    <Reveal key={i} delay={100 + i * 40}>
                      <p className="text-md leading-body text-ink/62 mb-s16 max-w-copy text-pretty">
                        {paragraph}
                      </p>
                    </Reveal>
                  ))}

                  <Reveal delay={100 + member.bio.length * 40 + 40}>
                    <div className="gap-s13 mt-s21 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
                      {member.facts.map(([value, label]) => (
                        <Card key={label} surface="card" radius="lg" padding="md">
                          <div className="text-stat-a tracking-tighter-2 leading-none font-light text-teal">
                            {value}
                          </div>
                          <div className="mt-s05 leading-body-tight text-sm text-ink/58">{label}</div>
                        </Card>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
