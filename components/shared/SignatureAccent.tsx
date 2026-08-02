import { Heading } from "@/components/primitives";

type SignatureAccentProps = {
  children: string;
  /** Replace the phrase's own trailing period with the brand pulse-dot. */
  dot?: boolean;
  className?: string;
};

/**
 * The AdPro signature mark. Reused only for the fixed set of recurring
 * hero-statement phrases — never body copy, never a heading that isn't one
 * of those named statements.
 *
 * The dot reuses the exact pulse motif already live in the nav status pill
 * and hero indicators (bg-teal, animate-[ap-pulse...]) rather than
 * introducing a new asset — that reuse is what makes the mark AdPro's own
 * rather than a font choice a competitor could license too. The real
 * period is kept in an sr-only span so screen readers still get correct
 * sentence punctuation; the visible dot is decorative or an ordinary reader.
 */
export function SignatureAccent({ children, dot = false, className }: SignatureAccentProps) {
  const text = dot ? children.replace(/\.$/, "") : children;

  return (
    <Heading as="span" variant="accent" className={className}>
      {text}
      {dot && (
        <>
          <span className="sr-only">.</span>
          <span
            aria-hidden="true"
            className="bg-teal rounded-pill ml-[0.1em] inline-block size-[0.16em] min-h-[5px] min-w-[5px] -translate-y-[0.3em] align-middle animate-[ap-pulse_2.6s_ease-in-out_infinite]"
          />
        </>
      )}
    </Heading>
  );
}
