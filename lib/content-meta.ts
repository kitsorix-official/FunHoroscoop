/**
 * Eén centrale "laatst gewijzigd"-datum voor alle redactionele content.
 * Alleen aanpassen als de teksten in data/*.json of de pagina's écht wijzigen;
 * zo blijven sitemap en structured data stabiel tussen bouwen.
 */
export const CONTENT_UPDATED_AT = '2026-11-23';
export const CONTENT_UPDATED_DATE = new Date(`${CONTENT_UPDATED_AT}T00:00:00.000Z`);
