import { TeamHero } from "@/components/team/TeamHero";
import { TeamRoster } from "@/components/team/TeamRoster";
import { HashScroll } from "@/components/shared/HashScroll";
import { ClientWall } from "@/components/home/ClientWall";
import { buildPageMetadata } from "@/lib/utils/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Team",
  description:
    "The senior people behind AdPro 360 — banking, broadcast and award-winning film experience, under one roof.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <HashScroll />
      <TeamHero />
      <ClientWall eyebrow="01 — Clients we've worked with" />
      <TeamRoster />
    </>
  );
}
