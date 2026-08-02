/**
 * Site-wide constants. Not CMS content — these are business facts
 * (contact details, brand name) rather than editorial copy.
 */
export const site = {
  name: "AdPro 360",
  location: "Lusaka, Zambia",
  phone: "+260 769 539 357",
  phoneHref: "tel:+260769539357",
  whatsappHref: "https://wa.me/260769539357",
  email: "sales@adpro.co.zm",
  emailHref: "mailto:sales@adpro.co.zm",
  address: {
    line1: "12 Harry Nkumbula Road, PHI",
    line2: "Lusaka, Zambia",
  },
} as const;
