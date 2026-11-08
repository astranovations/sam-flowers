// All French copy lives here. Items marked TODO are placeholders to replace.

export const site = {
  name: "Sam Flowers",
  // TODO: replace with the real tagline
  tagline: "L'art de dire les choses en fleurs.",
  heroSub: "Des bouquets choisis et composés à la main, avec délicatesse.",
  nav: [
    { label: "Histoire", href: "#histoire" },
    { label: "Créations", href: "#creations" },
    { label: "Contact", href: "#contact" },
  ],
};

export const story = {
  eyebrow: "Notre histoire",
  title: "Des fleurs qui parlent à notre place.",
  // TODO: replace with her real story
  paragraphs: [
    "Sam Flowers est né d'une envie simple : offrir des fleurs qui ressemblent à ceux qui les reçoivent. Chaque bouquet est pensé, assemblé et noué à la main, un par un.",
    "Pas de formules toutes faites. Seulement des fleurs de saison, des couleurs choisies avec soin et le plaisir de voir un sourire s'ouvrir.",
  ],
};

export type Creation = {
  id: string;
  name: string;
  meaning: string;
  image: string; // base name in public/images (png) with placeholder fallback
};

export const creations = {
  eyebrow: "Nos créations",
  title: "Chaque fleur a quelque chose à dire.",
  items: [
    { id: "pivoines", name: "Pivoines", meaning: "la douceur d'un bonheur timide", image: "b1-pivoines" },
    { id: "roses", name: "Roses", meaning: "l'amour qui ose", image: "b2-roses" },
    { id: "renoncules", name: "Renoncules", meaning: "le charme qui rayonne", image: "b3-renoncules" },
    { id: "tulipes", name: "Tulipes", meaning: "une déclaration, tout simplement", image: "b4-tulipes" },
    { id: "anemones", name: "Anémones", meaning: "l'attente et l'espoir", image: "b5-anemones" },
  ] satisfies Creation[],
};

export const values = {
  eyebrow: "Notre signature",
  title: "Rien de superflu.",
  items: [
    { icon: "d1-icon-fresh", title: "Fraîcheur", text: "Des fleurs choisies avec soin, au plus près de la saison." },
    { icon: "d2-icon-handmade", title: "Fait main", text: "Chaque bouquet est composé et noué à la main, un par un." },
    { icon: "d3-icon-gift", title: "Livré avec soin", text: "Emballé délicatement pour arriver comme il est parti." },
  ],
};

export const quote = {
  text: "Offrir des fleurs, c'est dire ce que les mots n'osent pas.",
};

export const contact = {
  eyebrow: "Contact",
  title: "Écrivez-nous.",
  text: "Une envie, une occasion, une idée de bouquet ? Parlons-en.",
  // TODO: replace with real links and details
  links: [
    { label: "Instagram", value: "@samflowers", href: "https://instagram.com/" },
    { label: "WhatsApp", value: "+213 ··· ·· ·· ··", href: "https://wa.me/" },
  ],
  place: "Oran, Algérie",
};

export const footer = {
  note: "Bientôt : commandes en ligne.",
};

// Birthday overlay for the shop owner. Set `enabled: false` to switch it off.
// TODO: edit the message and signature before showing it to her.
export const birthday = {
  enabled: true,
  date: { month: 11, day: 8 }, // 8 November: shows on every visit that day
  name: "Samira",
  eyebrow: "Aujourd'hui, c'est ton jour",
  title: "Joyeux anniversaire",
  message:
    "Que cette nouvelle année s'ouvre comme une fleur : doucement, magnifiquement, et à ta couleur. Cette page est un petit cadeau : ton atelier de fleurs, rien que pour toi.",
  from: "Ahmed",
  image: "a5-bloom", // swap for a dedicated birthday illustration once generated
  // Original words for the karaoke (written for her, not a known song).
  lines: [
    "Pour toi, Samira, mille fleurs",
    "Qui s'ouvrent comme le bonheur",
    "Que chaque jour soit un bouquet",
    "Joyeux anniversaire, Samira !",
  ],
};
