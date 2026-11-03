import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { showWhatsapp, whatsappHref, WHATSAPP_MISSING } from "@/lib/site";

// Floating shortcut to a WhatsApp chat, bottom-right on every page.
export function WhatsappButton() {
  if (!showWhatsapp) return null;
  const href = whatsappHref("Bună ziua! Aș dori câteva informații despre produsele Prime Cut Meat.");
  return (
    <a
      href={href || "#contact"}
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : { title: WHATSAPP_MISSING })}
      aria-label="Scrie-ne pe WhatsApp"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-10 flex h-14 items-center gap-0 rounded-full bg-ember pl-4 pr-4 text-ink shadow-[0_12px_32px_rgb(0_0_0/0.45)] transition-[gap,padding,background-color] duration-300 ease-out-expo hover:gap-2.5 hover:bg-[#f2b768] hover:pr-5 sm:right-6"
    >
      <WhatsappLogo size={26} weight="fill" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width] duration-300 ease-out-expo group-hover:max-w-32 group-focus-visible:max-w-32">
        WhatsApp
      </span>
    </a>
  );
}
