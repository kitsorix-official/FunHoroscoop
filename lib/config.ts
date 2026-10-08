/**
 * FunHoroscoop.nl - Centrale Configuratie
 * 
 * Beheer hier de instellingen voor de anti-verslavingsfuncties en (EU) regelgeving.
 */

export const APP_CONFIG = {
  /**
   * EU Wetgeving / Anti-Addiction Nachtslot:
   * - true  : Nachtslot is AAN. De printer sluit automatisch vanaf de ingestelde avondtijd tot de ochtend.
   * - false : Nachtslot is UIT. De printer is 24/7 geopend (voor het geval de EU wet niet doorgaat).
   */
  ENABLE_NIGHT_LOCK: false,

  /**
   * Starttijd van het nachtslot (uur in 24-uursnotatie).
   * Bijvoorbeeld 20 voor 20:00 uur 's avonds.
   */
  NIGHT_LOCK_START_HOUR: 20,

  /**
   * Eindtijd van het nachtslot (uur in 24-uursnotatie).
   * Bijvoorbeeld 7 voor 07:00 uur 's ochtends.
   */
  NIGHT_LOCK_END_HOUR: 7,

  /**
   * Maximaal aantal afgedrukte bonnen per bezoeker per dag
   * voordat de thermische printer 'oververhit' raakt.
   */
  MAX_PRINTS_PER_DAY: 3,
} as const;

export type AppConfig = typeof APP_CONFIG;
