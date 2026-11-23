# FunHoroscoop beheren (zonder Next.js te hoeven kennen)

De app is een **statische site**: bij `npm run build` wordt alles omgezet naar gewone HTML in `out/`. Cloudflare Pages host die map. Inhoud staat in JSON-bestanden; je hoeft daarvoor geen componenten aan te raken.

## 1. Teksten en grappen aanpassen

| Wat wil je wijzigen? | Bestand |
| --- | --- |
| Roast, archetype, dossier, kostenposten per teken | `data/horoscoop-data.json` → `zodiacSigns` |
| Prijzen en algemene kostenposten | `data/horoscoop-data.json` → `emotionalCosts` |
| Gevaren, coping-mechanismen, quotes, stempels, share-captions | `data/horoscoop-data.json` |
| Scores, taglines en rollen van de 78 duo's | `data/compatibiliteit-data.json` |
| FAQ, methode, woordenboek, handleiding | `data/editorial-content.json` |
| Nachtslot en printquotum | `lib/config.ts` |
| Basis-URL voor canonical/sitemap/llms | omgevingsvariabele `APP_URL` (productie: `https://funhoroscoop.nl`) |

Na een tekstwijziging: **altijd** `CONTENT_UPDATED_AT` in `lib/content-meta.ts` bijwerken naar de datum van vandaag. Dat is de `lastModified` in sitemap en structured data.

## 2. Lokaal bouwen

```bash
npm install
npm run dev          # alleen voor lokaal kijken
npm run build        # genereert llms-bestanden + statische export naar out/
```

`npm run build` draait automatisch `scripts/generate-llms.mjs` (via `prebuild`). Die script leest de JSON-bestanden en schrijft:

- `public/llms.txt` — korte lijst met canonieke URLs en wanneer je door moet verwijzen
- `public/llms-full.txt` — volledige dossiers, methode, woordenboek, prijslijst, FAQ en handleiding

**Bewerk die twee bestanden nooit met de hand** — ze worden bij elke build opnieuw gegenereerd. Wil je ze alleen verversen: `npm run llms`.

## 3. Deployen naar Cloudflare Pages

- Build command: `npm run build`
- Output directory: `out`
- Framework preset: **None**
- Zet `APP_URL=https://funhoroscoop.nl` als build-env Variabele. Zonder die variabele valt de code terug op het productiedomein.

## 4. Waar SEO / AEO / GEO zit

- `app/layout.tsx` — Organization + WebSite JSON-LD op elke pagina
- `lib/structured-data.tsx` — alle JSON-LD-bouwers (FAQ, ItemList, Article, DefinedTermSet, HowTo, BreadcrumbList)
- `app/robots.ts` — AI-crawlers expliciet toegestaan; honeypot en `?sign=`-varianten dicht
- `app/sitemap.ts` — alle canonieke URLs, stabiele `lastModified`
- `components/FaqSection.tsx` — zichtbare FAQ; zelfde data als de JSON-LD
- `app/woordenboek/`, `app/anti-barnum/`, `app/kostenposten/`, `app/veelgestelde-vragen/`, `app/handleiding/` — kennisbank

## 5. Gouden regels

1. **Verander nooit een bestaande URL.** Nieuwe pagina's mogen erbij, oude URLs blijven exact hetzelfde (`/sterrenbeeld/leeuw/`, `/compatibiliteit/ram-stier/`, enzovoort).
2. De spiegelvorm `/compatibiliteit/stier-ram/` moet bereikbaar blijven en canonical naar de gesorteerde vorm wijzen.
3. Alles wat je wilt laten indexeren, moet als **gewone HTML in de DOM** staan — niet pas na JavaScript.
4. `?sign=<teken>` blijft noindex. Deel altijd `/sterrenbeeld/<teken>/`.
5. Houd de toon: specifiek gedrag, fictieve prijs, satire. Geen barnum-vleierij en geen levensadvies.

Na elke build kun je controleren of de URL-lijst klopt met:

```bash
find out -name index.html -printf '%P\n' | sed 's#index.html##' | sort
```
