import { StudioHero } from "@/components/studio/StudioHero";
import { StudioStory } from "@/components/studio/StudioStory";
import { StudioDisciplines } from "@/components/studio/StudioDisciplines";
import { StudioCulture } from "@/components/studio/StudioCulture";
import { buildPageMetadata } from "@/lib/utils/pageMetadata";

export const metadata = buildPageMetadata({
  title: "Studio",
  description:
    "AdPro 360 is a full-service media and production agency in Lusaka — strategy, creative, film and media placement under one roof, run by senior people from banking, broadcast and film.",
  path: "/studio",
});

export default function StudioPage() {
  return (
    <>
      <StudioHero />
      <StudioStory />
      <StudioDisciplines />
      <StudioCulture />
    </>
  );
}
