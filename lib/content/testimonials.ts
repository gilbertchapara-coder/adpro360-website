export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/** Placeholder attribution ("Client name") per HANDOFF.md §7 — needs real sign-off before launch. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They arrived with a plan we had not thought to ask for, and the numbers moved in the first quarter. That is the whole review.",
    name: "Client name",
    role: "Marketing Director, Client organisation",
  },
  {
    quote:
      "Every other agency pitched us a deliverable. AdPro 360 pitched us an argument, then built the plan to prove it. That is the difference.",
    name: "Client name",
    role: "Head of Communications, Client organisation",
  },
  {
    quote:
      "Senior people stayed on the account from the first call to the final report. Nothing was handed down to a junior team halfway through.",
    name: "Client name",
    role: "Chief Executive Officer, Client organisation",
  },
];
