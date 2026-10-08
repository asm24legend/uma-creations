export const SITE = {
  name: "Uma Creations",
  tagline: "Handmade jewellery and fashion",
  whatsapp: "919833721708",
  instagram: "https://instagram.com/uma_creation_24/",
  email: "asm.tade24@gmail.com",   // shown publicly on the Contact page
  city: "Thane, Maharashtra",
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
