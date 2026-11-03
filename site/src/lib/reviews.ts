// Customer reviews shown on the home page.
// TODO: înlocuiește exemplele de mai jos cu recenzii reale, apoi pune
// `placeholder` pe false. Cât timp e true, secțiunea apare doar în
// dezvoltare (npm run dev) și nu ajunge pe site-ul publicat.
export const placeholder = true;

export type Review = {
  name: string;
  city: string;
  product: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export const reviews: Review[] = [
  {
    name: "Exemplu: Andrei P.",
    city: "București",
    product: "Tomahawk maturat 21 de zile",
    rating: 5,
    text: "Am făcut tomahawk-ul pe grătar pentru ziua mea. Fraged, cu crustă frumoasă și un gust pe care nu l-am mai găsit la carnea din supermarket.",
  },
  {
    name: "Exemplu: Ioana M.",
    city: "Cluj-Napoca",
    product: "Platou pentru 10 persoane",
    rating: 5,
    text: "Platoul a arătat exact ca în poze și a dispărut primul de pe masă. Brânza cu trufe a fost preferata tuturor.",
  },
  {
    name: "Exemplu: Radu S.",
    city: "Brașov",
    product: "Antricot cu os",
    rating: 5,
    text: "Comandă simplă, livrare la timp, carne foarte bine marmorată. Revin sigur pentru T-bone.",
  },
  {
    name: "Exemplu: Elena D.",
    city: "Iași",
    product: "Brânzeturi Gouda",
    rating: 5,
    text: "Am luat lavandă, pesto verde și lămâie neagră. Toate trei foarte bune, iar cea cu lămâie neagră e senzațională pe platou.",
  },
  {
    name: "Exemplu: Mihai C.",
    city: "Timișoara",
    product: "Platou personalizat",
    rating: 5,
    text: "Mi-am ales singur brânzeturile pentru o petrecere la birou. M-au sunat să confirme și totul a fost gata la ora stabilită.",
  },
  {
    name: "Exemplu: Cristina V.",
    city: "Constanța",
    product: "Vrăbioară maturată 14 zile",
    rating: 4,
    text: "Am făcut-o la cuptor, întreagă. A ieșit fragedă și suculentă. Aș vrea doar să existe și porții mai mici.",
  },
];
