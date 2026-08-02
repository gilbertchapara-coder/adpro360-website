export type ProjectResult = [value: string, label: string];

export type Project = {
  id: string;
  client: string;
  title: string;
  category: string;
  year: string;
  slot: string;
  photo: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: ProjectResult[];
};

/**
 * Ported verbatim from the source's `PROJECTS` array. Every field here is
 * placeholder structure per HANDOFF.md §7 — client names, titles and every
 * results figure are illustrative, not real case-study data. Flagged
 * Critical in the production-readiness audit: replace before launch.
 */
export const projects: Project[] = [
  {
    id: "p1",
    client: "Client name",
    title: "National outdoor campaign across Lusaka corridors",
    category: "Media Buying",
    year: "2025",
    slot: "proj-1",
    photo: "/images/work-outdoor-campaign-lusaka.jpg",
    challenge:
      "A category leader was losing share of mind in high-traffic urban corridors while spending more than its nearest rival.",
    strategy:
      "We rebuilt the plan around dwell time rather than raw impressions, concentrating spend on eleven sites where commuter traffic sits longest.",
    execution:
      "Site audit, rate renegotiation and a creative system designed to be read in under two seconds at 60km/h.",
    results: [
      ["+38%", "Prompted awareness"],
      ["-19%", "Cost per reach point"],
      ["11", "Premium sites secured"],
    ],
  },
  {
    id: "p2",
    client: "Client name",
    title: "Brand film for a financial institution",
    category: "Film & Production",
    year: "2025",
    slot: "proj-2",
    photo: "/images/work-brand-film-financial-institution.jpg",
    challenge: "A trusted institution read as distant to a younger banking audience.",
    strategy:
      "Move from product proof to human proof — real customers, real premises, no voiceover claims the film could not show.",
    execution:
      "Four-day shoot across two provinces, broadcast-grade post, cutdowns for TV, cinema and social.",
    results: [
      ["3.2m", "Views across channels"],
      ["+27%", "Brand consideration"],
      ["6", "Deliverable formats"],
    ],
  },
  {
    id: "p3",
    client: "Client name",
    title: "Category repositioning and launch platform",
    category: "Brand Strategy",
    year: "2024",
    slot: "proj-3",
    photo: "/images/work-category-repositioning-strategy.jpg",
    challenge: "Entering Zambia against two entrenched incumbents with deeper pockets.",
    strategy:
      "Refuse the category conversation. We built a platform around a benefit the incumbents structurally could not claim.",
    execution:
      "Positioning, identity system, launch campaign and a twelve-month media plan delivered as one package.",
    results: [
      ["#2", "Unaided recall in 9 months"],
      ["+44%", "Trial rate vs forecast"],
      ["1", "Agency, not five"],
    ],
  },
  {
    id: "p4",
    client: "Client name",
    title: "TV commercial series for retail season",
    category: "Film & Production",
    year: "2024",
    slot: "proj-4",
    photo: "/images/work-tv-commercial-retail-season.jpg",
    challenge: "Three products, one budget, one shoot window.",
    strategy:
      "A single directorial system that let three spots share a set, a crew and a look while reading as distinct.",
    execution: "Treatment, casting, production and broadcast delivery in six weeks.",
    results: [
      ["3", "TVCs from one shoot"],
      ["-31%", "Cost per spot"],
      ["4wks", "On air ahead of plan"],
    ],
  },
  {
    id: "p5",
    client: "Client name",
    title: "Always-on social system for a services brand",
    category: "Digital & Social",
    year: "2024",
    slot: "proj-5",
    photo: "/images/work-social-system-services-brand.jpg",
    challenge: "Inconsistent posting had trained the audience to ignore the brand.",
    strategy:
      "Fewer formats, executed relentlessly. We designed four repeatable content units the internal team could run.",
    execution:
      "Content system, three-month runway produced upfront, paid amplification on proven units.",
    results: [
      ["+112%", "Engaged reach"],
      ["4", "Repeatable formats"],
      ["92%", "Calendar adherence"],
    ],
  },
  {
    id: "p6",
    client: "Client name",
    title: "Corporate communications programme",
    category: "Communications",
    year: "2023",
    slot: "proj-6",
    photo: "/images/work-corporate-communications-programme.jpg",
    challenge:
      "A restructure that needed to be understood internally before it was reported externally.",
    strategy:
      "Sequence the message: staff first, partners second, press third — with the same facts in each room.",
    execution:
      "Internal comms toolkit, leadership briefings, media handling and a launch event for 400.",
    results: [
      ["400", "Attendees hosted"],
      ["0", "Reputational incidents"],
      ["3wks", "Full rollout"],
    ],
  },
  {
    id: "p7",
    client: "Client name",
    title: "Campaign platform for a consumer launch",
    category: "Creative Campaigns",
    year: "2023",
    slot: "proj-7",
    photo: "/images/work-campaign-platform-consumer-launch.jpg",
    challenge: "A launch with a strong product and no distinctive voice.",
    strategy:
      "Build the voice before the ad. We wrote the brand’s language rules, then made work that obeyed them.",
    execution: "Platform, key visuals, radio, outdoor and retail toolkit.",
    results: [
      ["+61%", "Message association"],
      ["5", "Channels activated"],
      ["2yrs", "Platform still running"],
    ],
  },
  {
    id: "p8",
    client: "Client name",
    title: "Event identity and broadcast package",
    category: "Communications",
    year: "2023",
    slot: "proj-8",
    photo: "/images/work-event-identity-broadcast-package.jpg",
    challenge: "An annual event that looked different every year and built no equity.",
    strategy:
      "One identity system flexible enough for stage, screen and social, fixed enough to be recognised next year.",
    execution: "Identity, motion package, stage design direction and broadcast graphics.",
    results: [
      ["1", "System, reused annually"],
      ["+48%", "Registration growth"],
      ["12", "Broadcast assets"],
    ],
  },
];
