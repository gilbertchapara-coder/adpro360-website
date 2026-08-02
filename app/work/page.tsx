import { WorkHero } from "@/components/work/WorkHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { WorkCredibility } from "@/components/work/WorkCredibility";
import { WorkProcess } from "@/components/work/WorkProcess";
import { WorkResults } from "@/components/work/WorkResults";
import { Marquee } from "@/components/home/Marquee";
import { projects } from "@/lib/content";
import { buildPageMetadata } from "@/lib/utils/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Work",
  description:
    "Selected case studies across strategy, film, media buying and campaigns — the challenge, the thinking, and the results.",
  path: "/work",
});

const categories = Array.from(new Set(projects.map((p) => p.category)));

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <Marquee words={categories} />
      <WorkGrid />
      <WorkCredibility />
      <WorkProcess />
      <WorkResults />
    </>
  );
}
