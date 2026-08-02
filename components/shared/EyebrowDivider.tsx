import { Heading, Divider } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";

/** The eyebrow-label-plus-hairline row that opens sections 04 and 07 on the home page. */
export function EyebrowDivider({ label, className }: { label: string; className?: string }) {
  return (
    <Reveal className={className}>
      <div className="gap-s16 flex items-center">
        <Heading variant="eyebrow" as="span" className="mb-0 whitespace-nowrap">
          {label}
        </Heading>
        <Divider className="flex-1" />
      </div>
    </Reveal>
  );
}
