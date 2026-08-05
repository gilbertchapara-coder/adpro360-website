export type Insight = {
  id: string;
  slot: string;
  photo: string;
  kind: string;
  read: string;
  title: string;
  excerpt: string;
  body: string[];
  /**
   * ISO date. Placeholder — sequential, spaced two weeks apart, newest
   * first to match display order. Needed for RSS pubDate and Article
   * structured data, neither of which existed before this SEO milestone.
   * Replace with real publish dates before launch; do not treat these as
   * real editorial history.
   */
  date: string;
};

/**
 * Ported verbatim from the source's `INSIGHTS` array. Body copy is
 * placeholder editorial prose, same status as the rest of the site's
 * placeholder content — needs AdPro's real copy before launch.
 */
export const insights: Insight[] = [
  {
    id: "dwell-time",
    slot: "ins-1",
    photo: "/images/insight-dwell-time-lusaka-skyline.jpg",
    kind: "Point of view",
    read: "5 min",
    date: "2026-07-14",
    title: "Impressions are not attention. Buy dwell time instead.",
    excerpt: "Why the cheapest reach in Lusaka is often the most expensive line on a media plan.",
    body: [
      "The cheapest reach in Lusaka is almost always the most expensive line on a media plan, once you measure it against attention rather than impressions. A billboard seen by ten thousand commuters stopped for four seconds at a junction is not the same inventory as one seen by the same ten thousand people at sixty kilometres an hour.",
      "We rebuild media plans around dwell time: how long a format actually holds a person’s eyes, not how many eyes technically passed it. In practice that means fewer sites, chosen for commuter behaviour rather than raw traffic counts, and creative built to be read in the window the format genuinely offers.",
      "The result is not always a cheaper plan. It is almost always a plan that moves the number it was bought to move.",
    ],
  },
  {
    id: "broadcast-discipline",
    slot: "ins-2",
    photo: "/images/insight-broadcast-discipline.jpg",
    kind: "Field note",
    read: "4 min",
    date: "2026-06-30",
    title: "What broadcast discipline teaches a commercial shoot",
    excerpt:
      "Lessons carried from scripted television into brand film — and why they cut cost rather than add it.",
    body: [
      "Broadcast production runs on constraints a corporate shoot rarely has: a fixed air date, a fixed crew, and no budget to re-shoot an entire scene. Carried into brand film, that discipline tends to cut cost rather than add it.",
      "The habit that transfers best is pre-production rigour — a locked script, a shot list reviewed before the crew is booked, a director who has already solved the scene on paper. Most overruns on a commercial shoot come from decisions made on set that should have been settled a week earlier.",
    ],
  },
  {
    id: "first-ninety-days",
    slot: "ins-3",
    photo: "/images/insight-first-ninety-days.jpg",
    kind: "Analysis",
    read: "6 min",
    date: "2026-06-16",
    title: "Entering Zambia: the first ninety days of a brand",
    excerpt: "A sequence for multinationals that want more than a translated campaign.",
    body: [
      "A translated campaign is not a market-entry strategy. Brands that land well in Zambia in their first ninety days tend to follow the same sequence: category audit first, distribution and media reality second, creative last.",
      "Skipping straight to creative is the most common — and most expensive — mistake we see from multinationals entering the market. A beautifully made campaign built on assumptions from a different market rarely outperforms a plainer one built on local evidence.",
    ],
  },
  {
    id: "refuse-the-brief",
    slot: "ins-4",
    photo: "/images/insight-refuse-the-brief.jpg",
    kind: "Point of view",
    read: "5 min",
    date: "2026-06-02",
    title: "Why your agency should refuse half your requests",
    excerpt: "Proactive means saying no to the work that will not move the number.",
    body: [
      "Proactive is often mistaken for saying yes quickly. It more often means saying no early — to the request that will not move the number the business actually cares about, however reasonable it sounds in the meeting where it is raised.",
      "An agency that executes everything it is asked for is not being helpful. It is handing the judgement it was hired for back to the client.",
    ],
  },
  {
    id: "outdoor-at-speed",
    slot: "ins-5",
    photo: "/images/insight-outdoor-at-speed.jpg",
    kind: "Craft",
    read: "7 min",
    date: "2026-05-19",
    title: "Writing outdoor for sixty kilometres an hour",
    excerpt: "Six rules we apply to every billboard before it goes to print.",
    body: [
      "A billboard has roughly four seconds and one idea. Every rule we apply before a board goes to print traces back to that constraint: one message, one visual anchor, type set large enough to read from a moving vehicle, a logo placed where the eye lands last.",
      "Most outdoor fails not because the idea is weak, but because it was designed on a screen at arm’s length and never tested at the distance and speed it will actually be read.",
    ],
  },
  {
    id: "media-landscape",
    slot: "ins-6",
    photo: "/images/insight-media-landscape.jpg",
    kind: "Industry",
    read: "5 min",
    date: "2026-05-05",
    title: "The Zambian media landscape, honestly assessed",
    excerpt: "Where the inventory is genuinely undervalued, and where it is not.",
    body: [
      'Not every channel sold as "undervalued" in Zambia actually is. Some outdoor and radio inventory is genuinely underpriced against the attention it delivers; some of it is cheap because it delivers exactly as little attention as the price suggests.',
      "Telling the two apart is mostly a matter of asking for the same evidence a media owner would provide anywhere else — audited traffic or listenership, not a rate card and a smile.",
    ],
  },
];
