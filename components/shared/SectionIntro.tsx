import type { ReactNode } from "react";
import { Heading } from "@/components/primitives";
import { Link } from "@/components/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";

type SectionIntroProps = {
  eyebrow: string;
  action?: { label: string; href: string };
  className?: string;
  headingClassName?: string;
  eyebrowClassName?: string;
  children: ReactNode;
};

/**
 * The "NN — Label" eyebrow + H2 + optional trailing link row that opens
 * sections 01/02/03/06 on the home page. Margins differ slightly per
 * section in the source, so spacing is composed in via className rather
 * than baked in as one fixed default.
 */
export function SectionIntro({
  eyebrow,
  action,
  className,
  headingClassName,
  eyebrowClassName,
  children,
}: SectionIntroProps) {
  return (
    <div className={cn("gap-s23 flex flex-wrap items-end justify-between", className)}>
      <div>
        <Reveal>
          <Heading variant="eyebrow" as="div" className={cn("mb-s17", eyebrowClassName)}>
            {eyebrow}
          </Heading>
        </Reveal>
        <Reveal delay={80}>
          <Heading as="h2" variant="h2" className={headingClassName}>
            {children}
          </Heading>
        </Reveal>
      </div>
      {action && (
        <Link href={action.href} variant="underline">
          {action.label} ↗
        </Link>
      )}
    </div>
  );
}
