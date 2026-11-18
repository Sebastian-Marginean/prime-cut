// Contact details shown across the site. Fill these in before going live;
// any field left empty is simply hidden.
export const site = {
  name: "Prime Cut Meat",
  legalName: "PRIME CUT MEAT SRL",
  url: "https://primecut.ro",
  description:
    "Carne de vită maturată 14-21 de zile, brânzeturi olandeze și platouri pregătite la comandă.",
  phone: "0773 861 499",
  whatsapp: "40773861499",
  email: "office.primecutmeat@gmail.com",
  address: "Str. Câmpul Libertății 25",
  // Orașul apare în titlurile paginilor și în datele pentru Google, ca site-ul
  // să apară la căutări de tipul „carne maturată <oraș>”.
  city: "Blaj",
  county: "Alba",
  postalCode: "515400",
  // Codul din Google Search Console, metoda „Etichetă HTML”: doar valoarea din
  // content="...", ex. "abc123XYZ".
  googleVerification: "",
  hours: [
    { days: "Luni - Vineri", time: "08:00 - 16:00" },
    { days: "Sâmbătă", time: "09:00 - 14:00" },
  ],
  instagram: "https://www.instagram.com/prime_cut_meat/",
  facebook: "https://www.facebook.com/profile.php?id=61592600999375",
};

// Contact form: handled by the Cloudflare Worker (worker/index.ts), which sends
// the message by email. Only exists on the deployed site (or `wrangler dev`).
export const contactEndpoint = "/api/contact";

// "Str. Câmpul Libertății 25, Blaj, jud. Alba", skipping whatever is empty.
export const fullAddress = [site.address, site.city, site.county && `jud. ${site.county}`].filter(Boolean).join(", ");
export const mapsHref = fullAddress
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`
  : "";

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

// WhatsApp chat link, optionally with a pre-written message. Empty until
// `whatsapp` is filled in.
export const whatsappHref = (text?: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : "";

// WhatsApp buttons are shown in development even without a number, so the
// design can be reviewed; the published site hides them until it is set.
export const showWhatsapp = Boolean(site.whatsapp) || process.env.NODE_ENV !== "production";
export const WHATSAPP_MISSING = "Completează numărul WhatsApp în src/lib/site.ts";
