import { marqueeWords } from "@/lib/content";

type MarqueeProps = {
  /** Defaults to the sitewide discipline list; pass project categories, etc. for other pages. */
  words?: string[];
};

/** Discipline ticker. The word list is duplicated so the -50% loop point is seamless. */
export function Marquee({ words = marqueeWords }: MarqueeProps) {
  const doubled = [...words, ...words];

  return (
    <section className="border-ivory/8 bg-midnight pb-s02 text-ivory overflow-hidden border-t">
      <div className="py-s20 flex w-max animate-[ap-marquee_38s_linear_infinite]">
        {doubled.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="gap-s24 pr-s24 text-fluid-02 tracking-tight-1 text-ivory/34 inline-flex items-center font-light whitespace-nowrap"
          >
            {word}
            <span className="rounded-pill bg-teal size-[6px] opacity-80" />
          </span>
        ))}
      </div>
    </section>
  );
}
