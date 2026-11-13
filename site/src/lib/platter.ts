// Data for the custom platter builder: how each cheese looks as a slice, and
// the three platter shapes we sell. Colors are sampled from the product photos.

export type Look = { paste: string; speck: string[]; rind: string };

export const looks: Record<string, Look> = {
  "gouda-trufe-negre": { paste: "#f2d98a", speck: ["#3a2f28"], rind: "#e3a83a" },
  "gouda-piper-negru": { paste: "#f3dc8e", speck: ["#1d1a18"], rind: "#e9a537" },
  "gouda-lamaie-neagra": { paste: "#2b2827", speck: ["#4d4744"], rind: "#171514" },
  "branza-cu-mucegai-albastru": { paste: "#efe2b8", speck: ["#5b7a86", "#7c98a2"], rind: "#e3c98a" },
  "gouda-chimion": { paste: "#f0d68c", speck: ["#6b4a26"], rind: "#d79a2a" },
  "gouda-ierburi-de-gradina": { paste: "#e6d27a", speck: ["#4f7a2a"], rind: "#8fb43c" },
  "gouda-usturoi": { paste: "#f4e2a4", speck: ["#c8b98a"], rind: "#a6729e" },
  "gouda-pesto-verde": { paste: "#7da63f", speck: ["#3f6a1e"], rind: "#5f8a2c" },
  "gouda-pesto-rosu": { paste: "#c63a32", speck: ["#7c1814"], rind: "#a8202a" },
  "gouda-jalapeno": { paste: "#f1df8a", speck: ["#4e7a2c"], rind: "#e8c83a" },
  "gouda-chili-rosu": { paste: "#e4612e", speck: ["#9e1f12"], rind: "#d9461f" },
  "gouda-lavanda": { paste: "#6e4f86", speck: ["#a68cc0"], rind: "#5a3f75" },
  "gouda-mustar": { paste: "#f1cf55", speck: ["#b98a2b"], rind: "#edb43a" },
  "gouda-mix-de-nuci": { paste: "#f0d68c", speck: ["#7a4a24"], rind: "#e4a33a" },
  "gouda-masline-si-rosii": { paste: "#f2c25a", speck: ["#7a2d1d", "#3b3a1e"], rind: "#e98a24" },
  "branza-de-capra-maturata": { paste: "#efe3c4", speck: [], rind: "#1d1b1a" },
  "branza-de-capra-mild": { paste: "#f6f1e2", speck: [], rind: "#e6dcbd" },
  "tricolore-capra-si-vaca": { paste: "#ece5cc", speck: ["#c8502a", "#6f9a3c"], rind: "#2b2b2b" },
};

export type Shape = {
  persons: number;
  name: string;
  /** Horizontal stretch: 1 is round, above 1 is oval. */
  stretch: number;
  /** Sections of sliced cheese the customer fills. */
  slots: number;
  /** How many layers the slices are stacked in. */
  tiers: number;
  /** What a new visitor sees first, so the board never starts empty. */
  preset: string[];
};

// Every platter also has one fixed section of cubes of cheese aged 1 year,
// and ceafă in the middle.
export const CUBES = "Cubulețe de brânză maturată 1 an";
export const CENTER = "ceafă";

export const shapes: Shape[] = [
  {
    persons: 6,
    name: "Rotund",
    stretch: 1,
    slots: 5,
    tiers: 2,
    preset: ["gouda-pesto-verde", "gouda-chili-rosu", "gouda-chimion", "gouda-lavanda", "gouda-lamaie-neagra"],
  },
  {
    persons: 10,
    name: "Rotund",
    stretch: 1,
    slots: 5,
    tiers: 3,
    preset: ["gouda-lavanda", "gouda-jalapeno", "gouda-pesto-rosu", "gouda-pesto-verde", "gouda-lamaie-neagra"],
  },
  {
    persons: 16,
    name: "Oval",
    stretch: 1.55,
    slots: 9,
    tiers: 2,
    preset: [
      "gouda-chimion", "gouda-chili-rosu", "gouda-mustar", "gouda-lamaie-neagra", "gouda-pesto-verde",
      "gouda-masline-si-rosii", "gouda-trufe-negre", "gouda-lavanda", "gouda-ierburi-de-gradina",
    ],
  },
];

// The contact form picks this up so a finished platter arrives as a ready-made message.
export const PREFILL_KEY = "primecut:prefill";
export const PREFILL_EVENT = "primecut:prefill";
export type Prefill = {
  subject: string;
  message: string;
  /** JPEG data URL of the platter as built, sent as an email attachment. */
  image?: string;
};
