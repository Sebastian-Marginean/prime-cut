"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react";
import { formEndpoint, site } from "@/lib/site";
import { PREFILL_EVENT, PREFILL_KEY, type Prefill } from "@/lib/platter";

const subjects = ["Carne de vită", "Platou", "Platou personalizat", "Brânzeturi", "Altceva"];

const field =
  "mt-2 w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-cream placeholder:text-muted/60 transition-colors duration-200 hover:border-ember/40 focus:border-ember focus:outline-none focus-visible:outline-none";
const label = "text-sm font-semibold text-cream";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // A platter built in the configurator arrives here as a ready-made message.
  useEffect(() => {
    const apply = (p: Prefill) => {
      setSubject(p.subject);
      setMessage(p.message);
      setStatus("idle");
      setTimeout(() => {
        const el = messageRef.current;
        el?.focus({ preventScroll: true });
        el?.setSelectionRange(el.value.length, el.value.length);
      }, 600);
    };
    try {
      const saved = sessionStorage.getItem(PREFILL_KEY);
      if (saved) {
        sessionStorage.removeItem(PREFILL_KEY);
        apply(JSON.parse(saved));
      }
    } catch {}
    const onPrefill = (e: Event) => {
      try {
        sessionStorage.removeItem(PREFILL_KEY);
      } catch {}
      apply((e as CustomEvent<Prefill>).detail);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bots fill the hidden field
    if (!formEndpoint) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setMessage("");
      setSubject(subjects[0]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-start justify-center py-10" role="status">
        <CheckCircle size={40} weight="duotone" className="text-ember" />
        <h3 className="font-display mt-5 text-2xl font-semibold">Mesajul a fost trimis.</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-muted">
          Mulțumim! Îți răspundem cât mai repede, de obicei în aceeași zi lucrătoare.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-ember underline-offset-4 hover:underline"
        >
          Trimite alt mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <h3 className="font-display text-2xl font-semibold sm:col-span-2">Scrie-ne un mesaj</h3>

      <input type="hidden" name="_subject" value={`Mesaj nou de pe site: ${subject}`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className="block">
        <span className={label}>Nume</span>
        <input name="Nume" required autoComplete="name" className={field} placeholder="Numele tău" />
      </label>
      <label className="block">
        <span className={label}>Telefon</span>
        <input name="Telefon" type="tel" autoComplete="tel" inputMode="tel" className={field} placeholder="07xx xxx xxx" />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="nume@exemplu.ro" />
      </label>

      <fieldset className="sm:col-span-2">
        <legend className={label}>Despre ce e vorba</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {subjects.map((s) => (
            <label
              key={s}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ember ${
                subject === s ? "border-ember bg-ember text-ink font-semibold" : "border-line text-cream/80 hover:border-ember/60"
              }`}
            >
              <input
                type="radio"
                name="Subiect"
                value={s}
                checked={subject === s}
                onChange={() => setSubject(s)}
                className="sr-only"
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block sm:col-span-2">
        <span className={label}>Mesaj</span>
        <textarea
          ref={messageRef}
          name="Mesaj"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} resize-y leading-relaxed`}
          placeholder="Ce produse vrei, cantitatea și pentru când."
        />
      </label>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 text-sm text-[#f0a08a] sm:col-span-2">
          <WarningCircle size={18} weight="bold" className="mt-0.5 shrink-0" />
          {formEndpoint
            ? "Mesajul nu a putut fi trimis. Încearcă din nou sau contactează-ne telefonic."
            : process.env.NODE_ENV !== "production"
              ? "Formularul nu are încă adresa de email. Completează formEmail în src/lib/site.ts."
              : `Mesajul nu a putut fi trimis.${site.phone ? ` Sună-ne la ${site.phone}.` : ""}`}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p className="max-w-xs text-xs leading-relaxed text-muted">
          Folosim datele doar ca să îți răspundem la mesaj.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition-[background-color,transform] duration-300 ease-out-expo hover:bg-[#f2b768] active:scale-[0.98] disabled:opacity-60"
        >
          <PaperPlaneTilt size={18} weight="bold" />
          {status === "sending" ? "Se trimite…" : "Trimite mesajul"}
        </button>
      </div>
    </form>
  );
}
