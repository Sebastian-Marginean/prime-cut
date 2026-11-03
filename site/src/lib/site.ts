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
  instagram: "https://www.instagram.com/prime_cut_meat/",
  facebook: "https://www.facebook.com/profile.php?id=61592600999375",
  // Contact form delivery. The site is static, so messages go through
  // FormSubmit (formsubmit.co): put the inbox here and the first message
  // triggers a one-time confirmation email to that address.
  formEmail: "", // TODO: adresa la care ajung mesajele din formular
};

export const formEndpoint = site.formEmail ? `https://formsubmit.co/ajax/${site.formEmail}` : "";

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

// WhatsApp chat link, optionally with a pre-written message. Empty until
// `whatsapp` is filled in.
export const whatsappHref = (text?: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : "";

// WhatsApp buttons are shown in development even without a number, so the
// design can be reviewed; the published site hides them until it is set.
export const showWhatsapp = Boolean(site.whatsapp) || process.env.NODE_ENV !== "production";
export const WHATSAPP_MISSING = "Completează numărul WhatsApp în src/lib/site.ts";
