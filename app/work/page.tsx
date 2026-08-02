import { WorkHero } from "@/components/work/WorkHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { WorkCredibility } from "@/components/work/WorkCredibility";
import { WorkProcess } from "@/components/work/WorkProcess";
import { WorkResults } from "@/components/work/WorkResults";
import { ClientWall } from "@/components/home/ClientWall";
import { buildPageMetadata } from "@/lib/utils/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Work",
  description:
    "Selected case studies across strategy, film, media buying and campaigns — the challenge, the thinking, and the results.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <ClientWall eyebrow="01 — Clients we've worked with" />
      <WorkGrid />
      <WorkCredibility />
      <WorkProcess />
      <WorkResults />
    </>
  );
}
