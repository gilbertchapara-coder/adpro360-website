export type Service = {
  id: string;
  num: string;
  title: string;
  lede: string;
  /** One-line before→after framing for the collapsed row — CD review:
   * "services are labelled, not sold." Not a per-client claim (no real
   * campaign to cite here), just the general shape of value each
   * discipline argues for. */
  outcome: string;
  photo: string;
  tags: string[];
  detail: string;
  deliverables: string[];
};

/** Ported verbatim from the source's `SVC` array. */
export const services: Service[] = [
  {
    id: "strategy",
    num: "01",
    title: "Brand Strategy",
    lede: "Clarity before creativity — the positioning and architecture a brand needs before it spends a kwacha on media.",
    outcome: "From category noise to a position competitors can't copy.",
    photo: "/images/service-brand-strategy.jpg",
    tags: ["Positioning", "Naming", "Brand architecture"],
    detail:
      "Strategy is where we start and where the value compounds. We interrogate the category, the audience and the commercial goal, then write the brief the rest of the work answers to.",
    deliverables: [
      "Market & category audit",
      "Positioning platform",
      "Messaging hierarchy",
      "Brand guidelines",
      "Go-to-market roadmap",
    ],
  },
  {
    id: "creative",
    num: "02",
    title: "Creative Campaigns",
    lede: "Ideas built to survive contact with every channel — screen, street, radio and retail, without losing their edge.",
    outcome: "From a single ad to a platform that still runs in year two.",
    photo: "/images/service-creative-campaigns.jpg",
    tags: ["Campaign platforms", "Art direction", "Copy"],
    detail:
      "One idea, expressed with discipline across every channel it touches. We build campaign platforms that hold up for years, not single executions that expire in a quarter.",
    deliverables: [
      "Creative platform",
      "Key visual system",
      "Channel adaptations",
      "Copy & scripting",
      "Production-ready artwork",
    ],
  },
  {
    id: "production",
    num: "03",
    title: "Film & Production",
    lede: "Stories engineered to move audiences — TVCs, corporate film and long-form content, produced by people who have shipped broadcast work.",
    outcome: "From a brief on paper to a broadcast-grade film on air.",
    photo: "/images/service-film-production.jpg",
    tags: ["TVC", "Corporate film", "Post"],
    detail:
      "Our production leadership comes out of broadcast — MultiChoice-grade scripted and reality content. That standard sets the floor for every commercial and corporate film we make.",
    deliverables: [
      "Concept & treatment",
      "Full production management",
      "Direction & cinematography",
      "Edit, grade, sound",
      "Broadcast delivery",
    ],
  },
  {
    id: "media",
    num: "04",
    title: "Media Buying",
    lede: "Spend that reports back, not spend that hopes — planning and placement across TV, radio, outdoor, print and digital, bought on evidence.",
    outcome: "From spend that hopes to work to spend that reports back.",
    photo: "/images/service-media-buying.jpg",
    tags: ["Planning", "Buying", "Outdoor"],
    detail:
      "Fifteen years of sales and marketing experience sits behind every plan. We negotiate hard, place with intent and report on what the spend actually returned.",
    deliverables: [
      "Media strategy & plan",
      "Rate negotiation",
      "Placement & trafficking",
      "Outdoor & activation siting",
      "Post-campaign reporting",
    ],
  },
  {
    id: "digital",
    num: "05",
    title: "Digital & Social",
    lede: "A feed the audience learns to expect — always-on content systems, paid social and performance work tied to commercial outcomes.",
    outcome: "From sporadic posting to a feed the audience expects.",
    photo: "/images/service-digital-social.jpg",
    tags: ["Social", "Performance", "Content"],
    detail:
      "Feeds reward consistency more than spectacle. We build content systems a brand can actually sustain, then put media behind what performs.",
    deliverables: [
      "Channel strategy",
      "Content calendars",
      "Paid social management",
      "Community management",
      "Monthly performance reporting",
    ],
  },
  {
    id: "comms",
    num: "06",
    title: "Corporate Communications",
    lede: "Your message, delivered on your terms — reputation, internal comms and events for institutions that cannot afford to be misread.",
    outcome: "From a message at risk of leaking to one delivered on your terms.",
    photo: "/images/service-corporate-communications.jpg",
    tags: ["Reputation", "Events", "Internal comms"],
    detail:
      "For banks, institutions and government-facing organisations, precision matters more than volume. We build the message, the sequence and the room it lands in.",
    deliverables: [
      "Comms strategy",
      "Stakeholder mapping",
      "Media relations",
      "Event design & delivery",
      "Crisis playbooks",
    ],
  },
];
