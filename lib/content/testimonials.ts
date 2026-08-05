export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/**
 * Real client testimonials were never supplied. The previous state here
 * attributed 3 invented quotes to "Client name" — a fabricated testimonial
 * presented as a real client's words is a false claim on a live commercial
 * site (worse than the case-study placeholder problem it mirrors, since
 * this one puts words in an unnamed real person's mouth), not a design
 * placeholder. Reduced to one honest, clearly-a-placeholder entry instead
 * of 3 near-identical "pending" quotes rotating every 7s, which would just
 * look broken. TestimonialCarousel's avatar slot was already correctly
 * left unwired (MediaSlot with no `src` renders its labelled placeholder).
 * Replace with a real quote/name/role/headshot the moment a client signs
 * off — no component change needed.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Real client testimonials are on their way — we would rather wait for their words than write our own.",
    name: "AdPro 360",
    role: "A note from us, while we wait on client sign-off",
  },
];
