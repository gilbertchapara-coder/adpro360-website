export type ProcessStep = { num: string; title: string; body: string };

/**
 * The agency's own method, stated once — deliberately mirrors the
 * challenge/strategy/execution/results shape already used per project in
 * projects.ts, generalised from "what we did on one job" to "how we work
 * on every job."
 */
export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Brief",
    body: "We interrogate the brief before we accept it. Half of what we're asked for on day one doesn't survive the first strategy session — and that's the point.",
  },
  {
    num: "02",
    title: "Strategy",
    body: "A point of view, not a mood board. We commit to the argument in writing before a single asset gets made, so creative has something to be right or wrong about.",
  },
  {
    num: "03",
    title: "Execution",
    body: "In-house, senior-led delivery — the same people from the pitch to the final cut, across strategy, creative, film and media placement.",
  },
  {
    num: "04",
    title: "Measurement",
    body: "Every campaign closes with a report, not a wrap party. What moved, what didn't, and what changes on the next brief.",
  },
];
