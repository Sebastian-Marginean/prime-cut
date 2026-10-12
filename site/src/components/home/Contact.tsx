import { Phone, WhatsappLogo, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { site, telHref } from "@/lib/site";

export function Contact() {
  const hasContact = site.phone || site.whatsapp || site.email;
  return (
    <section id="contact" aria-labelledby="contact-titlu" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal className="glass grid backdrop-blur-xl backdrop-saturate-150 gap-12 rounded-2xl p-8 md:grid-cols-[1.3fr_1fr] md:p-14">
        <div>
          <h2 id="contact-titlu" className="font-display text-3xl font-semibold leading-tight md:text-5xl">
            Comenzi și întrebări.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Spune-ne ce tăieturi, brânzeturi sau platouri vrei și pentru când. Îți confirmăm disponibilitatea și
            pregătim comanda.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {site.phone && (
              <Button href={telHref(site.phone)}>
                <Phone size={18} weight="bold" /> Sună-ne
              </Button>
            )}
            {site.whatsapp && (
              <Button href={`https://wa.me/${site.whatsapp}`} variant="ghost" external>
                <WhatsappLogo size={18} weight="bold" /> WhatsApp
              </Button>
            )}
          </div>

          <ul className="mt-8 space-y-3 text-muted">
            {site.email && (
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={18} className="text-ember" />
                <a href={`mailto:${site.email}`} className="hover:text-ember">{site.email}</a>
              </li>
            )}
            {site.address && (
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-ember" />
                {site.address}
              </li>
            )}
          </ul>

          {!hasContact && process.env.NODE_ENV !== "production" && (
            <p className="mt-8 rounded-xl border border-dashed border-ember/50 p-4 text-sm text-ember">
              Completează telefonul, WhatsApp și emailul în src/lib/site.ts. (Mesaj vizibil doar în dezvoltare.)
            </p>
          )}
        </div>

        <div className="md:border-l md:border-line md:pl-12">
          <h3 className="text-lg font-semibold">Program</h3>
          <dl className="mt-5 space-y-4">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-6 border-b border-line pb-4 last:border-0">
                <dt className="text-muted">{h.days}</dt>
                <dd className="font-semibold tabular-nums">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
