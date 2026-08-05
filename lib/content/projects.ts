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
 * Ported from the source's `PROJECTS` array. Category, year, title and the
 * challenge/strategy/execution narrative describe real methodology and are
 * intentionally client-agnostic. `client` and every `results` figure are
 * NOT real case-study data — real client names/results were never supplied,
 * and fabricating specific numbers here would be a false performance claim
 * on a live commercial site, not a design placeholder (a prospective client
 * could reasonably rely on these figures when evaluating the agency).
 * Deliberately left as honest "pending" placeholders instead — same
 * transparent pattern as ClientWall's logo slots. Replace with real
 * figures the moment a client signs off; no code change needed, just
 * real values in place of the "—"/"pending" ones below.
 */
export const projects: Project[] = [
  {
    id: "p1",
    client: "Case study pending publication",
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
      ["—", "Prompted awareness (pending)"],
      ["—", "Cost per reach point (pending)"],
      ["—", "Premium sites secured (pending)"],
    ],
  },
  {
    id: "p2",
    client: "Case study pending publication",
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
      ["—", "Views across channels (pending)"],
      ["—", "Brand consideration (pending)"],
      ["—", "Deliverable formats (pending)"],
    ],
  },
  {
    id: "p3",
    client: "Case study pending publication",
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
      ["—", "Unaided recall (pending)"],
      ["—", "Trial rate vs forecast (pending)"],
      ["—", "Agency, not five (pending)"],
    ],
  },
  {
    id: "p4",
    client: "Case study pending publication",
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
      ["—", "TVCs from one shoot (pending)"],
      ["—", "Cost per spot (pending)"],
      ["—", "On air ahead of plan (pending)"],
    ],
  },
  {
    id: "p5",
    client: "Case study pending publication",
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
      ["—", "Engaged reach (pending)"],
      ["—", "Repeatable formats (pending)"],
      ["—", "Calendar adherence (pending)"],
    ],
  },
  {
    id: "p6",
    client: "Case study pending publication",
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
      ["—", "Attendees hosted (pending)"],
      ["—", "Reputational incidents (pending)"],
      ["—", "Full rollout (pending)"],
    ],
  },
  {
    id: "p7",
    client: "Case study pending publication",
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
      ["—", "Message association (pending)"],
      ["—", "Channels activated (pending)"],
      ["—", "Platform still running (pending)"],
    ],
  },
  {
    id: "p8",
    client: "Case study pending publication",
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
      ["—", "System, reused annually (pending)"],
      ["—", "Registration growth (pending)"],
      ["—", "Broadcast assets (pending)"],
    ],
  },
];
