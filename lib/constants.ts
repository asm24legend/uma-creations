export const SITE = {
  name: "Uma Creations",
  tagline: "Handmade jewellery & fashion",
  whatsapp: "91XXXXXXXXXX", // your number with country code, no + or spaces
  instagram: "https://instagram.com/yourhandle",
};

export const CATEGORIES = [
  { slug: "jewellery", label: "Jewellery" },
  { slug: "fashion", label: "Fashion" },
  { slug: "miscellaneous", label: "Miscellaneous" },
] as const;

export const NAV_LINKS = [
  ...CATEGORIES.map((c) => ({ href: `/${c.slug}`, label: c.label })),
  { href: "/events", label: "Upcoming Events" },
];