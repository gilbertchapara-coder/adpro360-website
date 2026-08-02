export type TeamFact = [value: string, label: string];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  slot: string;
  photo: string;
  lede: string;
  bio: string[];
  facts: TeamFact[];
};

/** Ported verbatim from the source's `TEAM` array — real biographical content. */
export const team: TeamMember[] = [
  {
    id: "munalula",
    name: "Munalula Lukanga",
    role: "Chief Executive Officer",
    slot: "team-1",
    photo: "/images/team-munalula-lukanga-ceo.jpg",
    lede: "Fifteen years in sales and marketing, including the financial sector with Barclays and FNB.",
    bio: [
      "With over 15 years of experience in sales and marketing, Munalula Lukanga has had the privilege of working in the financial sector with esteemed institutions such as Barclays and FNB. Leveraging that expertise, she founded an advertising agency specialising in media buying and consultancy.",
      "At AdPro 360 she is responsible for high-level stakeholder engagement and leading the team toward the company’s strategic goals and vision. A versatile and dynamic professional, she excels at transforming business ideas into reality — and her commitment to excellence drives impactful marketing solutions and lasting client relationships.",
    ],
    facts: [
      ["15+ yrs", "Sales & marketing"],
      ["Barclays · FNB", "Financial sector"],
      ["Founder", "Media buying & consultancy"],
    ],
  },
  {
    id: "gilbert",
    name: "Gilbert Chapara",
    role: "Content Director",
    slot: "team-2",
    photo: "/images/team-gilbert-chapara-content-director.jpg",
    lede: "A decade in TV production and broadcasting, including MultiChoice.",
    bio: [
      "Gilbert Chapara is a seasoned creative director and content producer with over 10 years of experience in TV production and broadcasting, including work for MultiChoice — the leading pay-TV broadcaster in the world.",
      "He has led high-performing teams to deliver award-winning scripted and reality content, with expertise in stakeholder communication, resource allocation and producing high-quality content for diverse global audiences.",
    ],
    facts: [
      ["10+ yrs", "TV & broadcast"],
      ["MultiChoice", "Broadcast experience"],
      ["Award-winning", "Scripted & reality"],
    ],
  },
  {
    id: "andrew",
    name: "Andrew Mayaba",
    role: "Creative Director",
    slot: "team-3",
    photo: "/images/team-andrew-mayaba-creative-director.jpg",
    lede: "Multi-award-winning filmmaker and post-production consultant, known as “Brow”.",
    bio: [
      "Andrew Mayaba — known as “Brow” in the Zambian film industry — is a multi-award-winning filmmaker, digital marketing content creator and post-production consultant with over 11 years of experience.",
      "Renowned for his storytelling and editing, Andrew has worked on projects including Mpali, Mutale Mwanza Unscripted, King Bugar, Chokolo, MaJimbo, Mungoma and My Kitchen Party. Recognised by IMDb in 2024, his awards include the Ngoma Awards and the Africa Magic Viewers’ Choice Awards, with titles licensed to Amazon Prime.",
    ],
    facts: [
      ["11+ yrs", "Film & post"],
      ["Ngoma · AMVCA", "Awards"],
      ["Amazon Prime", "Licensed titles"],
    ],
  },
];
