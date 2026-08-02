import { TeamHero } from "@/components/team/TeamHero";
import { TeamRoster } from "@/components/team/TeamRoster";
import { HashScroll } from "@/components/shared/HashScroll";
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
      <TeamRoster />
    </>
  );
}
