// All products live here. To add one: add an entry, put the photo in
// assets/source/<slug>.jpg and run `npm run images`.

export type CategorySlug = "carne-de-vita" | "platouri" | "branzeturi";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  /** Page title for search results: the words people actually type. */
  seoTitle: string;
};

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  short: string;
  description: string;
  facts: { label: string; value: string }[];
};

export const categories: Category[] = [
  {
    slug: "carne-de-vita",
    name: "Carne de vită maturată",
    tagline: "Tomahawk, T-bone, antricot și vrăbioară",
    description:
      "Tăieturi de vită maturate 14-21 de zile. Timpul face carnea mai fragedă și îi concentrează gustul.",
    cover: "t-bone",
    seoTitle: "Carne de vită maturată: tomahawk, T-bone, antricot",
  },
  {
    slug: "platouri",
    name: "Platouri",
    tagline: "Pentru 6, 10 sau 16 persoane",
    description:
      "Gouda în mai multe arome, cubulețe de brânză maturată 1 an și ceafă în mijloc, cu struguri și nuci, pregătite la comandă.",
    cover: "platou-10-persoane",
    seoTitle: "Platouri de brânzeturi la comandă pentru 6, 10 sau 16 persoane",
  },
  {
    slug: "branzeturi",
    name: "Brânzeturi",
    tagline: "18 sortimente de Gouda olandez",
    description:
      "Roți de Gouda de la Huizer Kaas-Gilde, din Olanda: clasice, cu ierburi, condimente, trufe sau lapte de capră.",
    cover: "gouda-trufe-negre",
    seoTitle: "Brânzeturi olandeze: 18 sortimente de Gouda",
  },
];

const meat: Product[] = [
  {
    slug: "tomahawk",
    category: "carne-de-vita",
    name: "Tomahawk de vită maturat 21 de zile",
    short: "O piesă impresionantă de antricot cu os lung.",
    description:
      "Tăietură premium pentru grătar: antricot gros, cu marmorare bogată, păstrat pe osul lung de coastă. După 21 de zile de maturare are o textură fragedă și un gust intens.",
    facts: [
      { label: "Maturare", value: "21 de zile" },
      { label: "Tip", value: "Cu os lung" },
      { label: "Recomandare", value: "Grătar pe cărbuni, gătire indirectă și rumenire la final" },
    ],
  },
  {
    slug: "t-bone",
    category: "carne-de-vita",
    name: "T-bone de vită maturat 21 de zile",
    short: "Mușchi și vrăbioară, despărțite de osul în formă de T.",
    description:
      "Două tăieturi într-una: mușchiul, foarte fraged, și vrăbioara, cu mai multă savoare. Osul păstrează suculența la gătit.",
    facts: [
      { label: "Maturare", value: "21 de zile" },
      { label: "Tip", value: "Cu os în formă de T" },
      { label: "Recomandare", value: "Grătar sau tigaie de fontă, foc puternic" },
    ],
  },
  {
    slug: "antricot-cu-os",
    category: "carne-de-vita",
    name: "Antricot cu os maturat 21 de zile",
    short: "Rib-eye pe os, cu grăsime intramusculară generoasă.",
    description:
      "Ribeye-ul este partea cea mai calitativă din vită, păstrată cu osul scurt pentru mai multă savoare. Maturarea de 21 de zile îl face fraged și aromat.",
    facts: [
      { label: "Maturare", value: "21 de zile" },
      { label: "Tip", value: "Cu os" },
      { label: "Recomandare", value: "Tigaie de fontă sau grătar, apoi 5-10 minute de odihnă" },
    ],
  },
  {
    slug: "antricot-fara-os",
    category: "carne-de-vita",
    name: "Antricot fără os maturat 21 de zile",
    short: "Ribeye curățat de os, cu marmorare bogată.",
    description:
      "Același ribeye, fără os: se porționează ușor și se gătește uniform. Grăsimea intramusculară se topește la gătit și păstrează carnea suculentă, iar cele 21 de zile de maturare îi dau frăgezime și aromă.",
    facts: [
      { label: "Maturare", value: "21 de zile" },
      { label: "Tip", value: "Fără os" },
      { label: "Recomandare", value: "Tigaie de fontă sau grătar, foc puternic, apoi 5 minute de odihnă" },
    ],
  },
  {
    slug: "vrabioara",
    category: "carne-de-vita",
    name: "Vrăbioară de vită maturată 14 zile",
    short: "Tăietură fragedă, cu puțină grăsime.",
    description:
      "O tăietură cu mai puțină grăsime, apreciată pentru textura fragedă, gustul bogat și aroma intensă. Maturată 14 zile.",
    facts: [
      { label: "Maturare", value: "14 zile" },
      { label: "Tip", value: "Fără os" },
      { label: "Recomandare", value: "Steak-uri în tigaie sau friptură întreagă la cuptor" },
    ],
  },
];

// Platter layout: cheese sections (triangles stacked in tiers) plus one section of
// cubes of cheese aged 1 year, with ceafă in the middle. Mirrors src/lib/platter.ts.
const platterSpecs = [
  { persons: 6, slices: 5, tiers: 2, shape: "rotund" },
  { persons: 10, slices: 5, tiers: 3, shape: "rotund" },
  { persons: 16, slices: 9, tiers: 2, shape: "oval" },
];

const platters: Product[] = platterSpecs.map(({ persons: n, slices, tiers, shape }) => ({
  slug: `platou-${n}-persoane`,
  category: "platouri" as const,
  name: `Platou pentru ${n} persoane`,
  short: `${slices + 1} compartimente de brânză și ceafă în mijloc.`,
  description: `Un platou ${shape}, gata de servit pentru ${n} persoane: ${slices} compartimente cu felii de Gouda în mai multe arome, așezate pe ${tiers} etaje, un compartiment cu cubulețe de brânză maturată 1 an și ceafă în mijloc, cu struguri și nuci pe margine. Se pregătește la comandă, pentru mese în familie, evenimente sau birou.`,
  facts: [
    { label: "Porții", value: `${n} persoane` },
    { label: "Brânză", value: `${slices} compartimente de felii pe ${tiers} etaje + 1 de cubulețe maturate 1 an` },
    { label: "Conține", value: "Gouda în mai multe arome, ceafă, struguri, nuci" },
    { label: "Comandă", value: "Cu cel puțin o zi înainte" },
  ],
}));

// Cheese card text follows one template: "Brânză maturată 6 luni, 50% grăsime,
// cu aromă de <aroma>." Change the defaults here, or pass other values per cheese.
const CHEESE_AGE = "6 luni";
const CHEESE_FAT = "50%";

const cheese = (
  slug: string,
  name: string,
  aroma: string,
  description: string,
  pairing: string,
  milk = "Vacă",
  age = CHEESE_AGE,
  fat = CHEESE_FAT,
): Product => ({
  slug,
  category: "branzeturi",
  name,
  short: `Brânză maturată ${age}, ${fat} grăsime, cu aromă de ${aroma}.`,
  description,
  facts: [
    { label: "Maturare", value: age },
    { label: "Grăsime", value: fat },
    { label: "Lapte", value: milk },
    { label: "Producător", value: "Huizer Kaas-Gilde, Olanda" },
    { label: "Se potrivește cu", value: pairing },
  ],
});

const cheeses: Product[] = [
  cheese("gouda-trufe-negre", "Gouda cu trufe negre", "trufe negre", "Gouda cremos cu bucăți de trufe negre. Aroma pământie a trufelor se simte imediat, fără să acopere gustul brânzei.", "Vin roșu, miere, paste"),
  cheese("gouda-piper-negru", "Gouda cu piper negru", "piper negru", "Gouda clasic cu boabe de piper negru zdrobite, care îi dau o notă picantă și caldă.", "Bere, vin roșu sec, sandvișuri"),
  cheese("gouda-lamaie-neagra", "Gouda cu lămâie neagră", "lămâie neagră", "Gouda cu lămâie neagră, cu note citrice și ușor afumate. Coaja neagră îl face ușor de recunoscut pe platou.", "Vin alb, pește, salate"),
  cheese("branza-cu-mucegai-albastru", "Brânză cu mucegai albastru", "mucegai nobil", "Brânză de tip Gouda cu vinișoare de mucegai nobil. Gust intens, sărat și cremos.", "Pere, nuci, vin dulce"),
  cheese("gouda-chimion", "Gouda cu chimen", "chimen", "Una dintre combinațiile tradiționale olandeze: Gouda cu semințe de chimen, cu aromă caldă și ușor pământie.", "Bere, pâine neagră, mezeluri"),
  cheese("gouda-ierburi-de-gradina", "Gouda cu ierburi de grădină", "ierburi de grădină", "Gouda cu un amestec de ierburi de grădină, cu gust proaspăt și verde.", "Vin alb, roșii, focaccia"),
  cheese("gouda-usturoi", "Gouda cu usturoi", "usturoi", "Gouda cu usturoi, cu gust plin și aromat. Foarte bun topit.", "Burgeri, toast, bere"),
  cheese("gouda-pesto-verde", "Gouda cu pesto verde", "pesto verde", "Gouda cu pesto verde, cu aromă de busuioc. Culoarea verde intensă se vede frumos pe platou.", "Vin alb, roșii, paste"),
  cheese("gouda-pesto-rosu", "Gouda cu pesto roșu", "pesto roșu", "Gouda cu pesto roșu din roșii uscate și ierburi, cu gust dulce-acrișor.", "Vin roșu ușor, măsline, grisine"),
  cheese("gouda-jalapeno", "Gouda cu jalapeño", "jalapeño", "Gouda cu bucăți de ardei jalapeño. Iuțeală moderată, echilibrată de gustul cremos al brânzei.", "Bere, nachos, burgeri"),
  cheese("gouda-chili-rosu", "Gouda cu chili roșu", "chili roșu", "Gouda cu ardei chili roșu, pentru cei care preferă o brânză cu mai mult foc.", "Bere, mezeluri picante"),
  cheese("gouda-lavanda", "Gouda cu lavandă", "lavandă", "Gouda cu flori de lavandă, cu aromă florală delicată și coajă violet.", "Vin rosé, miere, fructe"),
  cheese("gouda-mustar", "Gouda cu muștar", "muștar", "Gouda cu semințe de muștar, cu gust vioi și ușor înțepător.", "Mezeluri, cârnați, bere"),
  cheese("gouda-mix-de-nuci", "Gouda cu mix de nuci", "nuci", "Gouda cu un amestec de nuci, cu textură crocantă și gust ușor dulce.", "Vin roșu, struguri, miere"),
  cheese("gouda-masline-si-rosii", "Gouda cu măsline și roșii", "măsline și roșii", "Gouda cu măsline și roșii, cu gust mediteranean, ușor sărat.", "Vin rosé, focaccia, salate"),
  cheese("branza-de-capra-maturata", "Brânză de capră maturată", "lapte de capră", "Brânză de capră maturată, cu textură fermă și gust pronunțat, ușor dulce.", "Vin alb sec, smochine, nuci", "Capră"),
  cheese("branza-de-capra-mild", "Brânză de capră, gust delicat", "lapte de capră", "Brânză de capră albă și cremoasă, cu gust fin. Bună alegere pentru cei care gustă prima dată brânză de capră.", "Vin alb, miere, fructe", "Capră"),
  cheese("tricolore-capra-si-vaca", "Tricolore, capră și vacă", "lapte de capră și de vacă", "Brânză din lapte de capră și de vacă, cu bucăți colorate în trei nuanțe. Arată spectaculos pe platou.", "Vin rosé, platouri aperitiv", "Capră și vacă"),
];

export const products: Product[] = [...meat, ...platters, ...cheeses];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const getProduct = (category: string, slug: string) =>
  products.find((p) => p.category === category && p.slug === slug);
export const productHref = (p: Product) => `/produse/${p.category}/${p.slug}/`;

// Cheese photos are transparent cut-outs (480/900); the rest are photos (800/1600).
export const isCutout = (slug: string) => /^(gouda-|branza-|tricolore-)/.test(slug);
