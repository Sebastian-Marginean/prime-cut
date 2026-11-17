import { Phone, WhatsappLogo, EnvelopeSimple, MapPin, InstagramLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { fullAddress, mapsHref, showWhatsapp, site, telHref, whatsappHref, WHATSAPP_MISSING } from "@/lib/site";

export function Contact() {
  const hasContact = site.phone || site.whatsapp || site.email;
  return (
    <section id="contact" aria-labelledby="contact-titlu" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal className="glass grid backdrop-blur-xl backdrop-saturate-150 overflow-hidden rounded-2xl lg:grid-cols-[1fr_1.25fr]">
        <div className="p-8 md:p-12">
          <h2 id="contact-titlu" className="font-display text-3xl font-semibold leading-tight md:text-5xl">
            Comenzi și întrebări.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Spune-ne ce tăieturi, brânzeturi sau platouri vrei și pentru când. Îți confirmăm disponibilitatea și
            pregătim comanda.
          </p>

          {(site.phone || showWhatsapp) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {site.phone && (
                <Button href={telHref(site.phone)}>
                  <Phone size={18} weight="bold" /> Sună-ne
                </Button>
              )}
              {showWhatsapp && (
                <Button href={whatsappHref() || "#contact"} variant={site.phone ? "ghost" : "primary"} external={Boolean(site.whatsapp)}>
                  <WhatsappLogo size={18} weight="bold" /> Scrie-ne pe WhatsApp
                </Button>
              )}
            </div>
          )}

          <ul className="mt-8 space-y-3 text-muted">
            {site.email && (
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={18} className="text-ember" />
                <a href={`mailto:${site.email}`} className="hover:text-ember">{site.email}</a>
              </li>
            )}
            {fullAddress && (
              <li className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-ember" />
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-ember">
                  {fullAddress}
                </a>
              </li>
            )}
            {site.instagram && (
              <li className="flex items-center gap-3">
                <InstagramLogo size={18} className="text-ember" />
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ember">
                  @prime_cut_meat
                </a>
              </li>
            )}
            {site.facebook && (
              <li className="flex items-center gap-3">
                <FacebookLogo size={18} className="text-ember" />
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-ember">
                  Prime Cut Meat pe Facebook
                </a>
              </li>
            )}
          </ul>

          {(!hasContact || !site.whatsapp) && process.env.NODE_ENV !== "production" && (
            <p className="mt-8 rounded-xl border border-dashed border-ember/50 p-4 text-sm text-ember">
              {site.whatsapp ? "Completează telefonul și emailul în src/lib/site.ts." : `${WHATSAPP_MISSING}. Până atunci, butoanele WhatsApp nu apar pe site-ul publicat.`}{" "}
              (Mesaj vizibil doar în dezvoltare.)
            </p>
          )}

          <h3 className="mt-12 text-lg font-semibold">Program</h3>
          <dl className="mt-4 space-y-3">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-6 border-b border-line pb-3 last:border-0">
                <dt className="text-muted">{h.days}</dt>
                <dd className="font-semibold tabular-nums">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-line bg-ink/40 p-8 md:p-12 lg:border-l lg:border-t-0">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
