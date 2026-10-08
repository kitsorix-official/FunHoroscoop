# FunHoroscoop.nl 🌌

> De satirische, anti-Barnum horoscoop-app: thermische kassabonnen vol emotionele kostenposten, toxische archetypen en nul excuses.

## Wat is dit?

Traditionele horoscopen maken misbruik van het **Barnum-effect**: algemene uitspraken die op iedereen van toepassing lijken. FunHoroscoop.nl doet het tegenovergestelde — je krijgt een interactieve thermische kassabon met rake observaties over jouw sterrenbeeld:

- **Emotionele kostenposten** — realistische schadebedragen voor herkenbare fouten ("Onbeantwoorde appjes overdenken: € 49,95")
- **Ongezouten archetypen** — Leeuw als "Main Character Syndroom", Maagd als "Passief-Agressieve Spreadsheet"
- **Kassabon-esthetiek** — printgeluiden, kwaliteitsstempels ("100% TOXIC", "CHAOTISCH"), barcodes en kartelranden
- **Social sharing** — export naar PNG, klaar voor Stories en groepsapps

## Tech stack

- **Next.js 15** (App Router) + React 19
- **Tailwind CSS 4** (Neo-Brutalism + Y2K Cyber-Retro)
- **Web Audio API** (printgeluiden) en **HTML5 Canvas** (PNG-export)

100% client-side, **geen backend, geen Gemini/AI API en geen database** nodig.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Omgevingsvariabelen

| Variabele | Doel |
| --- | --- |
| `APP_URL` | De basis-URL (gebruikt voor SEO-canonical, `sitemap.xml` en `robots.txt`). Lokaal: `http://localhost:3000`; productie: `https://funhoroscoop.nl`. |

## Scripts

- `npm run dev` — development server
- `npm run build` — statische productie-export naar `out/`
- `npm run lint` — ESLint check

## Deploy: Cloudflare Pages

De productiebuild is een volledig **statische export** (`output: 'export'`) die draait op
**Cloudflare Pages** — er is geen Node-server nodig.

1. Push deze repo naar GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → verbind de GitHub-repo.
3. Build-instellingen:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Koppel het custom domain `funhoroscoop.nl` (het domein moet in Cloudflare DNS staan).
5. Optioneel maar aanbevolen: zet in het Pages-project de build-env `APP_URL=https://funhoroscoop.nl`,
   zodat de gegenereerde URLs deterministisch zijn. Zonder env-valt `lib/base-url.ts` automatisch
   terug op het productiedomein.

Zodra het domein live is, verstuurt de GitHub Action in `.github/workflows/indexnow.yml`
elke 3 dagen alle canonieke URLs naar IndexNow (handmatig triggerbaar via de Actions-tab).

## Viral delen: "Tag die ene vriend die dit is"

Na het printen van een bon verschijnt een share-prompt met een kant-en-klare, kopieerbare captie
(drie templates in `data/horoscoop-data.json` → `shareCaptions`, met `{NAAM}`, `{TEKEN}`,
`{SYMBOOL}`, `{ARCHETYPE}`, `{TOTAAL}` en `{STAMP}`-placeholders). De bedoeling: de bezoeker
plakt de captie bij een screenshot in TikTok, Reels of Stories en tagt een vriend — die klikt
door en print zelf een bon (viral-vliegwiel).

- Mobiel: `navigator.share`-knop met klembord-fallback; desktop kopieert naar het klembord.
- De prompt klapt na delen in (per sessie, `sessionStorage`) met een stille herhaaloptie.
- De PNG-export bevat een subtiel `funhoroscoop.nl`-watermerk (in `lib/receipt-generator.ts`),
  zodat de bron zichtbaar blijft in reposts.

## Guardrails

- **0 cookies, 0 accounts, 0 tracking** — volledig anoniem, AVG/GDPR-vriendelijk
- **Nachtslot** — configureerbaar in `lib/config.ts` (standaard 20:00–07:00)
- **Dagelijks thermisch quotum** — max 3 prints per dag