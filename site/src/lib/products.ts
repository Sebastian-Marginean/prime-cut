// All products live here. To add one: add an entry, put the photo in
// assets/source/<slug>.jpg and run `npm run images`.

export type CategorySlug = "carne-de-vita" | "platouri" | "branzeturi";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  cover: string;
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
  },
  {
    slug: "platouri",
    name: "Platouri",
    tagline: "Pentru 6, 10 sau 20 de persoane",
    description:
      "Brânzeturi asortate, mezeluri fine, struguri și nuci, așezate pe platou și pregătite la comandă.",
    cover: "platou-10-persoane",
  },
  {
    slug: "branzeturi",
    name: "Brânzeturi",
    tagline: "20 de sortimente de Gouda olandez",
    description:
      "Roți de Gouda de la Huizer Kaas-Gilde, din Olanda: clasice, cu ierburi, condimente, trufe sau lapte de capră.",
    cover: "gouda-trufe-negre",
  },
];

const meat: Product[] = [
  {
    slug: "tomahawk",
    category: "carne-de-vita",
    name: "Tomahawk de vită maturat 21 de zile",
    short: "Antricot cu os lung de coastă, curățat la os.",
    description:
      "Tăietura de vârf pentru grătar: antricot gros, cu marmorare bogată, păstrat pe osul lung de coastă. După 21 de zile de maturare are o textură fragedă și un gust intens.",
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
      "Două tăieturi într-una: mușchiul, foarte fraged, și vrăbioara, cu mai mult gust. Osul păstrează suculența la gătit.",
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
      "Antricotul are cea mai multă grăsime intramusculară dintre tăieturile de vită, iar osul adaugă gust la gătit. Maturarea de 21 de zile îl face fraged și aromat.",
    facts: [
      { label: "Maturare", value: "21 de zile" },
      { label: "Tip", value: "Cu os" },
      { label: "Recomandare", value: "Tigaie de fontă sau grătar, apoi 5-10 minute de odihnă" },
    ],
  },
  {
    slug: "vrabioara",
    category: "carne-de-vita",
    name: "Vrăbioară de vită maturată 14 zile",
    short: "Tăietură fragedă, cu puțină grăsime.",
    description:
      "O tăietură slabă și fragedă, potrivită pentru steak-uri sau pentru friptură întreagă la cuptor. Maturată 14 zile.",
    facts: [
      { label: "Maturare", value: "14 zile" },
      { label: "Tip", value: "Fără os" },
      { label: "Recomandare", value: "Steak-uri în tigaie sau friptură întreagă la cuptor" },
    ],
  },
];

const platters: Product[] = [6, 10, 20].map((n) => ({
  slug: `platou-${n}-persoane`,
  category: "platouri" as const,
  name: `Platou pentru ${n} persoane`,
  short: "Brânzeturi asortate, mezeluri fine, struguri și nuci.",
  description: `Un platou gata de servit pentru ${n} persoane: felii de Gouda în mai multe arome, mezeluri fine, struguri și nuci. Se pregătește la comandă, pentru mese în familie, evenimente sau birou.`,
  facts: [
    { label: "Porții", value: `${n} persoane` },
    { label: "Conține", value: "Brânzeturi asortate, mezeluri, struguri, nuci" },
    { label: "Comandă", value: "Cu cel puțin o zi înainte" },
  ],
}));

const cheese = (
  slug: string,
  name: string,
  short: string,
  description: string,
  pairing: string,
  milk = "Vacă",
): Product => ({
  slug,
  category: "branzeturi",
  name,
  short,
  description,
  facts: [
    { label: "Lapte", value: milk },
    { label: "Producător", value: "Huizer Kaas-Gilde, Olanda" },
    { label: "Se potrivește cu", value: pairing },
  ],
});

const cheeses: Product[] = [
  cheese("gouda-trufe-negre", "Gouda cu trufe negre", "Aromă de trufe, gust rotund.", "Gouda cremos cu bucăți de trufe negre. Aroma pământie a trufelor se simte imediat, fără să acopere gustul brânzei.", "Vin roșu, miere, paste"),
  cheese("gouda-piper-negru", "Gouda cu piper negru", "Picant, cu boabe de piper.", "Gouda clasic cu boabe de piper negru zdrobite, care îi dau o notă picantă și caldă.", "Bere, vin roșu sec, sandvișuri"),
  cheese("gouda-lamaie-neagra", "Gouda cu lămâie neagră", "Coajă neagră, gust citric.", "Gouda cu lămâie neagră, cu note citrice și ușor afumate. Coaja neagră îl face ușor de recunoscut pe platou.", "Vin alb, pește, salate"),
  cheese("branza-cu-mucegai-albastru", "Brânză cu mucegai albastru", "Intensă, cu vinișoare albastre.", "Brânză de tip Gouda cu vinișoare de mucegai nobil. Gust intens, sărat și cremos.", "Pere, nuci, vin dulce"),
  cheese("gouda-chimion", "Gouda cu chimion", "Clasic olandez, aromat.", "Una dintre combinațiile tradiționale olandeze: Gouda cu semințe de chimion, cu aromă caldă și ușor pământie.", "Bere, pâine neagră, mezeluri"),
  cheese("gouda-ierburi-de-gradina", "Gouda cu ierburi de grădină", "Proaspăt, cu ierburi verzi.", "Gouda cu un amestec de ierburi de grădină, cu gust proaspăt și verde.", "Vin alb, roșii, focaccia"),
  cheese("gouda-usturoi", "Gouda cu usturoi", "Gust plin, cu usturoi.", "Gouda cu usturoi, cu gust plin și aromat. Foarte bun topit.", "Burgeri, toast, bere"),
  cheese("gouda-pesto-verde", "Gouda cu pesto verde", "Busuioc și verdeață.", "Gouda cu pesto verde, cu aromă de busuioc. Culoarea verde intensă se vede frumos pe platou.", "Vin alb, roșii, paste"),
  cheese("gouda-pesto-rosu", "Gouda cu pesto roșu", "Roșii uscate și ierburi.", "Gouda cu pesto roșu din roșii uscate și ierburi, cu gust dulce-acrișor.", "Vin roșu ușor, măsline, grisine"),
  cheese("gouda-jalapeno", "Gouda cu jalapeño", "Iute, cu ardei jalapeño.", "Gouda cu bucăți de ardei jalapeño. Iuțeală moderată, echilibrată de gustul cremos al brânzei.", "Bere, nachos, burgeri"),
  cheese("gouda-chili-rosu", "Gouda cu chili roșu", "Iute, cu ardei chili.", "Gouda cu ardei chili roșu, pentru cei care preferă o brânză cu mai mult foc.", "Bere, mezeluri picante"),
  cheese("gouda-lavanda", "Gouda cu lavandă", "Floral și delicat.", "Gouda cu flori de lavandă, cu aromă florală delicată și coajă violet.", "Vin rosé, miere, fructe"),
  cheese("gouda-mustar", "Gouda cu muștar", "Semințe de muștar, gust vioi.", "Gouda cu semințe de muștar, cu gust vioi și ușor înțepător.", "Mezeluri, cârnați, bere"),
  cheese("gouda-urzica", "Gouda cu urzică", "Verde, ierbos.", "Gouda cu frunze de urzică, cu gust ierbos și ușor.", "Vin alb, pâine cu semințe"),
  cheese("gouda-mix-de-nuci", "Gouda cu mix de nuci", "Crocant, cu nuci.", "Gouda cu un amestec de nuci, cu textură crocantă și gust ușor dulce.", "Vin roșu, struguri, miere"),
  cheese("gouda-masline-si-rosii", "Gouda cu măsline și roșii", "Gust mediteranean.", "Gouda cu măsline și roșii, cu gust mediteranean, ușor sărat.", "Vin rosé, focaccia, salate"),
  cheese("branza-de-capra-maturata", "Brânză de capră maturată", "Fermă, cu gust pronunțat.", "Brânză de capră maturată, cu textură fermă și gust pronunțat, ușor dulce.", "Vin alb sec, smochine, nuci", "Capră"),
  cheese("branza-de-capra-mild", "Brânză de capră, gust delicat", "Albă, fină și cremoasă.", "Brânză de capră tânără, albă și cremoasă, cu gust fin. Bună alegere pentru cei care gustă prima dată brânză de capră.", "Vin alb, miere, fructe", "Capră"),
  cheese("branza-de-capra-cu-urzica", "Brânză de capră cu urzică", "Capră și urzică.", "Brânză de capră cu frunze de urzică, cu gust proaspăt și ierbos.", "Vin alb, salate", "Capră"),
  cheese("tricolore-capra-si-vaca", "Tricolore, capră și vacă", "Trei culori, două tipuri de lapte.", "Brânză din lapte de capră și de vacă, cu bucăți colorate în trei nuanțe. Arată spectaculos pe platou.", "Vin rosé, platouri aperitiv", "Capră și vacă"),
];

export const products: Product[] = [...meat, ...platters, ...cheeses];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const getProduct = (category: string, slug: string) =>
  products.find((p) => p.category === category && p.slug === slug);
export const productHref = (p: Product) => `/produse/${p.category}/${p.slug}/`;

// Cheese photos are transparent cut-outs (480/900); the rest are photos (800/1600).
export const isCutout = (slug: string) => /^(gouda-|branza-|tricolore-)/.test(slug);
