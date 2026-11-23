import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

// ---------------------------------------------------------------------------
// Alle hard-coded UI-teksten van de gedeelde componenten. Pagina's mogen hun
// eigen redactionele teksten houden; alles wat in een component staat, komt
// hier terecht zodat NL en EN nooit door elkaar heen vallen.
// ---------------------------------------------------------------------------

const UI = {
  // ── HoroscoopApp ──────────────────────────────────────────────────────────
  euSlotTitleOn: {
    nl: 'EU Nachtslot actief tussen {start}:00 en 0{end}:00 (in te stellen in lib/config.ts)',
    en: 'EU night lock active between {start}:00 and 0{end}:00 (configure in lib/config.ts)',
  },
  euSlotTitleOff: {
    nl: 'EU Nachtslot is uitgeschakeld via lib/config.ts (24/7 geopend)',
    en: 'EU night lock is disabled via lib/config.ts (open 24/7)',
  },
  euSlotOn: { nl: 'EU Slot: AAN (>{hour}:00)', en: 'EU lock: ON (after {hour}:00)' },
  euSlotOff: { nl: 'EU Slot: UIT', en: 'EU lock: OFF' },
  inkAndKarma: { nl: 'Inkt & Karma:', en: 'Ink & Karma:' },
  mode: { nl: 'Mode:', en: 'Mode:' },
  autoTitle: { nl: 'Automatische tijddetectie', en: 'Automatic time detection' },
  dayTitle: { nl: 'Forceer Dagmodus', en: 'Force day mode' },
  day: { nl: 'Dag', en: 'Day' },
  nightTitle: { nl: 'Forceer Nachtslot', en: 'Force night lock' },
  night: { nl: 'Nacht', en: 'Night' },
  overheatTitle: { nl: 'Forceer Oververhit (3/3)', en: 'Force overheated (3/3)' },
  heroEyebrow: {
    nl: '✦ DE HARDSTE REALITEIT VAN HET HEELAL',
    en: '✦ THE UNIVERSE’S HARDEST REALITY',
  },
  heroTitle: {
    nl: 'Jouw ongefilterde, grappige horoscoop op een kosmische kassabon.',
    en: 'Your unfiltered, funny horoscope on a cosmic receipt.',
  },
  heroIntro: {
    nl: 'Geen vage barnum-onzin over “je bent soms introvert en soms extravert”. Alleen ongevraagde emotionele kostenposten en toxische waarheden.',
    en: 'No vague Barnum nonsense about “you’re sometimes introverted and sometimes extroverted”. Just unsolicited emotional charges and toxic truths.',
  },
  archetype: { nl: 'Archetype:', en: 'Archetype:' },
  dailyInkLimit: { nl: 'DAGELIJKS THERMISCH INKTLIMIET', en: 'DAILY THERMAL INK LIMIT' },
  printsUsed: { nl: '{count}/3 prints gebruikt', en: '{count}/3 prints used' },
  printing: { nl: 'BEZIG MET AFDRUKKEN...', en: 'PRINTING...' },
  nightClosed: { nl: 'NACHTSLOT (GESLOTEN TOT {hour}:00)', en: 'NIGHT LOCK (CLOSED UNTIL {hour}:00)' },
  overheatedButton: { nl: 'PRINTER OVERVERHIT (3/3 BEREIKT)', en: 'PRINTER OVERHEATED (3/3 REACHED)' },
  printButton: { nl: 'PRINT JE LOT (€ 0,00)', en: 'PRINT YOUR FATE (€ 0.00)' },
  resetCounter: { nl: 'Reset teller naar 0/3 (Test Functie)', en: 'Reset counter to 0/3 (test function)' },
  footNoAccount: { nl: '✦ Geen account nodig', en: '✦ No account needed' },
  footSatire: { nl: '✦ 100% Satire & TikTok Ready', en: '✦ 100% satire & TikTok ready' },
  footFree: { nl: '✦ Gratis & Anoniem', en: '✦ Free & anonymous' },

  // ── ZodiacSelector ────────────────────────────────────────────────────────
  selectSign: { nl: 'Selecteer Jouw Sterrenbeeld:', en: 'Choose Your Zodiac Sign:' },

  // ── ThermalPrinter ────────────────────────────────────────────────────────
  copyHeading: { nl: 'EMOTIONELE REKENING:', en: 'EMOTIONAL BILL:' },
  copyTotal: { nl: 'TOTAAL SCHADE:', en: 'TOTAL DAMAGE:' },
  copyDanger: { nl: '⚠ GEVAAR VANDAAG:', en: '⚠ DANGER OF THE DAY:' },
  copyCoping: { nl: '💡 COPING-MECHANISME:', en: '💡 COPING MECHANISM:' },
  copyStamp: { nl: 'Stempel:', en: 'Stamp:' },
  copyFooter: { nl: 'Print jouw bon op FunHoroscoop.nl!', en: 'Print your receipt at FunHoroscoop.nl!' },
  whatsappIntro: {
    nl: 'Mijn FunHoroscoop bon voor {sign} ({symbol}) is binnengekomen:',
    en: 'My FunHoroscoop receipt for {sign} ({symbol}) just arrived:',
  },
  whatsappTotal: { nl: 'Total emotionele schade: € {total}.', en: 'Total emotional damage: € {total}.' },
  whatsappStatus: { nl: 'Status: {stamp}!', en: 'Status: {stamp}!' },
  whatsappCta: {
    nl: 'Bekijk je eigen bon op https://funhoroscoop.nl',
    en: 'Get your own receipt at https://funhoroscoop.nl/en/',
  },
  ledSystem: { nl: 'Systeem: Online', en: 'System: online' },
  ledReady: { nl: 'Printer: Gereed', en: 'Printer: ready' },
  ledStatus: { nl: 'Status LED', en: 'Status LED' },
  printerStandby: { nl: 'STANDBY / SLAAP', en: 'STANDBY / ASLEEP' },
  printerOverheated: { nl: 'OVERVERHIT', en: 'OVERHEATED' },
  thermalSlot: { nl: 'THERMISCHE GLEUF', en: 'THERMAL SLOT' },
  waitingTitle: { nl: 'Printer Wacht Op Karma', en: 'Printer Waiting For Karma' },
  waitingText: {
    nl: 'Selecteer je sterrenbeeld hiernaast en druk op “PRINT JE LOT” om je ongezouten kassa-horoscoop uit te draaien.',
    en: 'Choose your zodiac sign and press “PRINT YOUR FATE” to print your unfiltered checkout horoscope.',
  },
  receiptKassa: { nl: 'KASSA 01 · TERMINAL #{id}', en: 'CHECKOUT 01 · TERMINAL #{id}' },
  karmaCritical: { nl: '{score}% [CRITISCH]', en: '{score}% [CRITICAL]' },
  roastLabel: { nl: '✦ DE ONGEZOUTEN WAARHEID:', en: '✦ THE UNFILTERED TRUTH:' },
  emotionalCharges: { nl: 'EMOTIONELE KOSTENPOSTEN:', en: 'EMOTIONAL CHARGES:' },
  totalDamage: { nl: 'TOTAAL SCHADE:', en: 'TOTAL DAMAGE:' },
  karmaTax: {
    nl: 'Inclusief 21% Karma-belasting & Teleurstelling',
    en: 'Including 21% karma tax & disappointment',
  },
  recommendedCoping: { nl: '💡 AANBEVOLEN COPING:', en: '💡 RECOMMENDED COPING:' },
  noReturns: { nl: '✦ GEEN RETOUR OF RESTITUTIE MOGELIJK ✦', en: '✦ NO RETURNS OR REFUNDS ✦' },
  canvasCheckout: { nl: 'KASSA 01  ·  TERMINAL #{id}', en: 'CHECKOUT 01  ·  TERMINAL #{id}' },
  canvasKarma: {
    nl: 'Karma-balans: {score}% [CRITISCH LAAG]',
    en: 'Karma balance: {score}% [CRITICALLY LOW]',
  },
  canvasCosts: { nl: 'EMOTIONELE KOSTENPOSTEN:', en: 'EMOTIONAL CHARGES:' },
  canvasTotal: { nl: 'TOTAAL SCHADE:', en: 'TOTAL DAMAGE:' },
  canvasTax: {
    nl: 'Inclusief 21% Karma-belasting & Teleurstelling',
    en: 'Including 21% karma tax & disappointment',
  },
  canvasDanger: { nl: '⚠ GEVAAR VANDAAG:', en: '⚠ DANGER OF THE DAY:' },
  canvasCoping: { nl: '💡 AANBEVOLEN COPING:', en: '💡 RECOMMENDED COPING:' },
  downloadReceipt: { nl: '📸 Download Bon', en: '📸 Download receipt' },
  downloadTitle: {
    nl: 'Download bon als afbeelding voor Instagram Story of TikTok',
    en: 'Download receipt as an image for Instagram Stories or TikTok',
  },
  copyText: { nl: 'Kopieer', en: 'Copy' },
  copied: { nl: 'Gekopieerd!', en: 'Copied!' },
  copyTitle: { nl: 'Kopieer samenvatting naar klembord', en: 'Copy summary to clipboard' },
  whatsappTitle: { nl: 'Deel direct via WhatsApp', en: 'Share directly via WhatsApp' },

  // ── SharePrompt ───────────────────────────────────────────────────────────
  defaultFriendName: { nl: 'die ene vriend', en: 'that one friend' },
  shareAgain: { nl: 'Deel je bon & tag een vriend', en: 'Share your receipt & tag a friend' },
  shareHeading: { nl: 'Tag die ene vriend die dit is 🎯', en: 'Tag that one friend who is this 🎯' },
  shareClose: { nl: 'Verberg', en: 'Hide' },
  shareCloseLabel: { nl: 'Share-prompt sluiten', en: 'Close share prompt' },
  shareIntro: {
    nl: 'Kopieer de captie en plak ’m bij je bon in je Story of Reel. Tag er een vriend(in) bij die dit écht is — gegarandeerd een reactie. 😉',
    en: 'Copy the caption and paste it with your receipt in your Story or Reel. Tag a friend who is really this — guaranteed reaction. 😉',
  },
  friendPlaceholder: { nl: 'Naam van je vriend(in) (optioneel)', en: 'Your friend’s name (optional)' },
  copyCaption: { nl: 'Kopieer captie', en: 'Copy caption' },
  shareButton: { nl: 'Delen', en: 'Share' },
  shareFootnote: {
    nl: '✦ Plak in TikTok / Instagram Reels / Story en tag je vriend(in) bij de bon',
    en: '✦ Paste into TikTok / Instagram Reels / Stories and tag your friend on the receipt',
  },

  // ── SleepingUniverse / OverheatedPrinter ──────────────────────────────────
  nightBadge: { nl: 'Nachtslot Actief ({start} - {end})', en: 'Night lock active ({start} - {end})' },
  cosmosSleeping: { nl: 'De Kosmos Slaapt', en: 'The Cosmos Is Asleep' },
  cosmosSleepingText: {
    nl: '“De planeten slapen nu. Ga naar bed, morgen weer een dag om teleurgesteld te worden. Printer heropent om {hour}.”',
    en: '“The planets are asleep. Go to bed; tomorrow is another day to be disappointed. Printer reopens at {hour}.”',
  },
  openingHours: { nl: 'Kosmische openingstijd: {hour}:00 CET', en: 'Cosmic opening hours: {hour}:00 CET' },
  wakePlanets: { nl: 'Demo: Wek de planeten (Dagmodus)', en: 'Demo: wake the planets (day mode)' },
  wakeTitle: { nl: 'Schakel nachtslot uit voor demo doeleinden', en: 'Disable night lock for demo purposes' },
  thermalOverload: { nl: 'THERMISCHE OVERBELASTING: 100°C', en: 'THERMAL OVERLOAD: 100°C' },
  overheatError: { nl: 'ERROR: Kosmische printer oververhit!', en: 'ERROR: cosmic printer overheated!' },
  overheatQuota: {
    nl: '“Karma-limiet voor vandaag bereikt (3/3). Kom morgen terug.”',
    en: '“Karma limit for today reached (3/3). Come back tomorrow.”',
  },
  coolDown: {
    nl: 'De thermische kop moet minstens 24 uur afkoelen om permanente kosmische kortsluiting te voorkomen.',
    en: 'The thermal head needs at least 24 hours to cool down to prevent permanent cosmic short-circuiting.',
  },
  resetQuota: { nl: 'Demo: Afkoelen & Quota Resetten (3/3)', en: 'Demo: cool down & reset quota (3/3)' },
  resetQuotaTitle: { nl: 'Herstel karma quotum voor testdoeleinden', en: 'Restore karma quota for testing purposes' },

  // ── CryptoTipJar ──────────────────────────────────────────────────────────
  tipButton: { nl: '☕ Tip de Maker (Crypto 18+)', en: '☕ Tip the maker (crypto 18+)' },
  tipButtonTitle: {
    nl: 'Ondersteun dit hobbyproject met een vrijwillige crypto fooi',
    en: 'Support this hobby project with a voluntary crypto tip',
  },
  tipJarTitle: { nl: 'Kosmische Fooienpot ☕', en: 'Cosmic tip jar ☕' },
  tipJarSubtitle: { nl: 'VRIJWILLIGE SCHENKINGEN (18+)', en: 'VOLUNTARY DONATIONS (18+)' },
  tipCloseLabel: { nl: 'Sluit fooienpot', en: 'Close tip jar' },
  tipIntro: {
    nl: 'Vind je FunHoroscoop leuk? Een vrijwillige bijdrage helpt de server- en domeinkosten te dekken van dit niet-commerciële hobbyproject. Tip: kies bij je exchange altijd Solana of Polygon — Ethereum mainnet (ERC-20) kost €1–5 gas en vreet kleine fooien.',
    en: 'Like FunHoroscoop? A voluntary contribution helps cover server and domain costs for this non-commercial hobby project. Tip: always choose Solana or Polygon at your exchange — Ethereum mainnet (ERC-20) costs €1–5 in gas and eats small tips.',
  },
  tipSolanaNote: {
    nl: 'Bijna gratis fees (~€0,001) — de goedkoopste route voor kleine fooien.',
    en: 'Almost free fees (~€0.001) — the cheapest route for small tips.',
  },
  tipPolygonNote: {
    nl: 'Stuur via Polygon i.p.v. Ethereum mainnet: ERC-20 kost €1–5 gas, Polygon kost centen.',
    en: 'Send via Polygon instead of Ethereum mainnet: ERC-20 costs €1–5 in gas, Polygon costs cents.',
  },
  tipLegalTitle: { nl: 'Juridische Kennisgeving (Donaties / Schenkingen)', en: 'Legal notice (donations / gifts)' },
  tipLegalText: {
    nl: 'Let op: Fooien zijn 100% vrijwillige schenkingen zonder enige economische tegenprestatie of levering van producten/diensten. Uitsluitend bedoeld voor personen van 18 jaar en ouder. Crypto-transacties zijn onomkeerbaar en niet restitueerbaar.',
    en: 'Note: tips are 100% voluntary gifts with no economic consideration and no products or services delivered. Intended only for people aged 18 and over. Crypto transactions are irreversible and cannot be refunded.',
  },
  close: { nl: 'Sluiten', en: 'Close' },

  // ── Gedeelde shell-componenten ────────────────────────────────────────────
  breadcrumbLabel: { nl: 'Kruimelpad', en: 'Breadcrumb' },
  faqTitle: { nl: 'Veelgestelde vragen', en: 'Frequently asked questions' },
  faqIntro: {
    nl: 'Korte antwoorden, lange herkenning. Staat je vraag er niet tussen? Kijk dan op de uitgelichte pagina of neem contact op.',
    en: 'Short answers, long recognition. Don’t see your question? Check the featured page or get in touch.',
  },
  backToCheckout: { nl: 'Terug naar de Kassa', en: 'Back to the checkout' },
  knowledgeBank: { nl: 'FUNHOROSCOOP.NL / KENNISBANK', en: 'FUNHOROSCOOP.NL / KNOWLEDGE BASE' },

  // ── Footer ────────────────────────────────────────────────────────────────
  footerIntro: {
    nl: '100% satire & entertainment. Geen cookies, geen accounts, geen persoonlijke tracking.',
    en: '100% satire & entertainment. No cookies, no accounts, no personal tracking.',
  },
  footerSecond: {
    nl: 'Thermische kassabonnen voor mensen die hun gedrag liever zien afgerekend dan voorspeld.',
    en: 'Thermal receipts for people who prefer their behaviour billed to them rather than predicted.',
  },
  footerKnowledge: { nl: 'Kennisbank', en: 'Knowledge base' },
  footerAboutLegal: { nl: 'Over & juridisch', en: 'About & legal' },
  footerCoffee: { nl: 'Koffie voor de kassier', en: 'Coffee for the cashier' },
  footerVoluntary: {
    nl: 'Helemaal vrijwillig — de bon is en blijft gratis.',
    en: 'Completely voluntary — the receipt is and stays free.',
  },
  footerMade: { nl: 'Gemaakt met sarcasme en een thermische printer.', en: 'Made with sarcasm and a thermal printer.' },
  footerPromise: { nl: 'Geen Barnum. Geen tracking. Geen excuses.', en: 'No Barnum. No tracking. No excuses.' },
  languageLabel: { nl: 'Taal', en: 'Language' },
  linkMethod: { nl: 'Anti-Barnum-methode', en: 'Anti-Barnum method' },
  linkGlossary: { nl: 'Woordenboek', en: 'Glossary' },
  linkCosts: { nl: 'Prijslijst', en: 'Price list' },
  linkFaq: { nl: 'Veelgestelde vragen', en: 'FAQ' },
  linkGuide: { nl: 'Handleiding', en: 'How to' },
  linkAbout: { nl: 'Over FunHoroscoop', en: 'About FunHoroscoop' },
  linkSigns: { nl: 'Alle sterrenbeelden', en: 'All zodiac signs' },
  linkCompatibility: { nl: 'Compatibiliteit', en: 'Compatibility' },
  linkPrivacy: { nl: 'Privacybeleid', en: 'Privacy policy' },
  linkDisclaimer: { nl: 'Disclaimer & satire', en: 'Disclaimer & satire' },
  linkContact: { nl: 'Contact & meldingen', en: 'Contact & reports' },
} as const;

export type UiKey = keyof typeof UI;
export type UiStrings = { [K in UiKey]: string };

const CACHE: Record<Locale, UiStrings> = {
  nl: Object.fromEntries(
    Object.entries(UI).map(([key, value]) => [key, value.nl])
  ) as UiStrings,
  en: Object.fromEntries(
    Object.entries(UI).map(([key, value]) => [key, value.en])
  ) as UiStrings,
};

export function getUi(locale: Locale = DEFAULT_LOCALE): UiStrings {
  return CACHE[locale];
}

/** Kleine helper voor templates in componenten. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
