// Contact details shown across the site. Fill these in before going live;
// any field left empty is simply hidden.
export const site = {
  name: "Prime Cut Meat",
  url: "https://primecut.ro", // TODO: domeniul real
  description:
    "Carne de vită maturată 14-21 de zile, brânzeturi olandeze și platouri pregătite la comandă.",
  phone: "", // TODO: ex. "+40 7xx xxx xxx"
  whatsapp: "", // TODO: același număr, doar cifre, ex. "407xxxxxxxx"
  email: "", // TODO: ex. "comenzi@primecut.ro"
  address: "", // TODO: adresa magazinului sau zona de livrare
  hours: [
    // TODO: programul real
    { days: "Luni - Vineri", time: "09:00 - 18:00" },
    { days: "Sâmbătă", time: "09:00 - 14:00" },
  ],
  instagram: "", // TODO: link complet
  facebook: "", // TODO: link complet
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
