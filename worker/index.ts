// Cloudflare Worker in front of the static site. It only handles the contact
// form (POST /api/contact): checks the message, then sends it by email through
// Resend. Every other request is served straight from the static files
// (see "run_worker_first" in wrangler.jsonc).
//
// Settings (Cloudflare dashboard -> Workers -> prime-cut -> Settings -> Variables):
//   RESEND_API_KEY  secret, from resend.com -> API Keys
//   CONTACT_TO      inbox that receives the messages (set in wrangler.jsonc)
//   MAIL_FROM       sender, on the domain verified in Resend (set in wrangler.jsonc)

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO: string;
  MAIL_FROM: string;
};

// Same limits as the form in site/src/components/ContactForm.tsx.
const COOLDOWN_S = 120;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const SUBJECTS = ["Carne de vită", "Platou", "Platou personalizat", "Brânzeturi", "Altceva"];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json({ error: "method" }, 405, { Allow: "POST" });
    try {
      return await contact(request, env, url);
    } catch (e) {
      console.error("contact failed", e);
      return json({ error: "server" }, 500);
    }
  },
};

async function contact(request: Request, env: Env, url: URL): Promise<Response> {
  // Only our own pages may post here.
  if (request.headers.get("Origin") !== url.origin) return json({ error: "origin" }, 403);
  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: "config" }, 500);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "invalid" }, 400);
  }
  const text = (name: string, max: number) => String(form.get(name) ?? "").trim().slice(0, max);

  // Bots fill the hidden field: pretend it worked and drop the message.
  if (text("_honey", 200)) return json({ ok: true });

  const name = text("Nume", 100);
  const phone = text("Telefon", 40);
  const email = text("email", 200);
  const subject = SUBJECTS.includes(text("Subiect", 60)) ? text("Subiect", 60) : "Altceva";
  const message = text("Mesaj", 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "invalid" }, 400);

  const file = form.get("attachment");
  const image =
    file instanceof File && file.size > 0 && file.size <= MAX_IMAGE_BYTES && file.type === "image/jpeg" ? file : null;

  // One message per visitor every 2 minutes. Kept in Cloudflare's cache, keyed
  // by IP: no database needed, and it expires on its own.
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const cache = (caches as unknown as { default: Cache }).default;
  const key = new Request(`${url.origin}/__cooldown/${encodeURIComponent(ip)}`);
  const hit = await cache.match(key);
  if (hit) {
    const sentAt = Number(hit.headers.get("X-Sent-At")) || Date.now();
    const retryAfter = Math.max(1, Math.ceil(COOLDOWN_S - (Date.now() - sentAt) / 1000));
    return json({ error: "cooldown", retryAfter }, 429, { "Retry-After": String(retryAfter) });
  }

  const rows: [string, string][] = [
    ["Nume", name],
    ["Telefon", phone || "-"],
    ["Email", email],
    ["Subiect", subject],
  ];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Mesaj nou de pe site: ${subject} (${name})`,
      html: emailHtml(rows, message, Boolean(image), url.origin),
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}${image ? "\n\n[Imaginea platoului e atașată]" : ""}`,
      ...(image && {
        attachments: [
          {
            filename: "platou-personalizat.jpg",
            content: base64(await image.arrayBuffer()),
            content_type: "image/jpeg",
            content_id: "platou",
          },
        ],
      }),
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return json({ error: "send" }, 502);
  }

  await cache.put(
    key,
    new Response("1", { headers: { "Cache-Control": `max-age=${COOLDOWN_S}`, "X-Sent-At": String(Date.now()) } }),
  );
  return json({ ok: true });
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

function base64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Email layout: tables and inline styles, the only thing every mail app renders.
function emailHtml(rows: [string, string][], message: string, hasImage: boolean, origin: string) {
  const cell = "padding:10px 0;border-bottom:1px solid #eee3d6;font-size:15px;vertical-align:top;";
  return `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f4efe9;font-family:Arial,Helvetica,sans-serif;color:#1c1714;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe9;padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">
<tr><td style="background:#0e0c0b;padding:20px 28px;">
<img src="${origin}/apple-icon.png" width="44" height="44" alt="" style="vertical-align:middle;border-radius:50%;">
<span style="vertical-align:middle;margin-left:12px;color:#f3ece4;font-size:16px;font-weight:bold;letter-spacing:2px;">PRIME CUT MEAT</span>
</td></tr>
<tr><td style="padding:28px;">
<p style="margin:0 0 4px;color:#c97a2a;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Mesaj nou de pe site</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
${rows.map(([k, v]) => `<tr><td style="${cell}width:90px;color:#8a7d70;">${esc(k)}</td><td style="${cell}font-weight:bold;">${esc(v)}</td></tr>`).join("")}
</table>
<p style="margin:24px 0 8px;color:#8a7d70;font-size:13px;">Mesaj</p>
<div style="background:#faf6f1;border-left:3px solid #e9a54b;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</div>
${hasImage ? `<p style="margin:24px 0 8px;color:#8a7d70;font-size:13px;">Platoul compus de client</p><img src="cid:platou" alt="Platoul compus de client" style="display:block;width:100%;max-width:544px;border-radius:12px;">` : ""}
<p style="margin:28px 0 0;font-size:13px;color:#8a7d70;">Apasă <b>Răspunde</b> ca să-i scrii direct clientului.</p>
</td></tr></table>
</td></tr></table></body></html>`;
}
