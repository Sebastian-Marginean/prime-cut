# Prime Cut Meat

Site de prezentare pentru Prime Cut Meat: carne de vită maturată, platouri și brânzeturi.
Next.js 16 exportat static (fără server și fără bază de date), Tailwind CSS v4, Motion.

## Comenzi

```bash
npm install
npm run dev      # dezvoltare pe http://localhost:3000
npm run build    # generează site-ul static în folderul out/
npm run images   # regenerează pozele din assets/source în public/img
node scripts/marble.mjs   # regenerează textura de marmură
```

## Unde modifici

| Ce | Fișier |
| --- | --- |
| Telefon, WhatsApp, email, adresă, program, domeniu | `src/lib/site.ts` |
| Produse, descrieri, categorii | `src/lib/products.ts` |
| Poze noi | `assets/source/<slug>.jpg`, apoi `npm run images` |

Brânzeturile (fișiere care încep cu `gouda-`, `branza-`, `tricolore-`) primesc automat fundal transparent.

## Publicare

Funcționează pe orice hosting static gratuit:

- **Vercel**: importă repo-ul, setările sunt detectate automat. Header-ele de securitate sunt în `vercel.json`.
- **Cloudflare Pages / Netlify**: build command `npm run build`, output `out`. Header-ele sunt în `public/_headers`.
