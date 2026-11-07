(function () {

  // ============================================
  // FUNHOROSCOOP Web Observer (v4 — minimal)
  //
  // One row per page view. That's it.
  //
  // What a row contains:
  //   timestamp_utc   when the visit reached the collector (server clock)
  //   date            the same moment as YYYY-MM-DD (server clock)
  //   page            the page path that was viewed
  //   agent           human | crawler | automation
  //   source          direct | search | ai | social | referral
  //   source_name     the operator — google, bing, chatgpt, perplexity, ...
  //   referrer        raw referrer host + path (query string removed)
  //
  // PRIVACY
  //   No cookies. No IP addresses. No names. No identifiers. Nothing here
  //   singles anyone out, and nothing is stored on the visitor's device —
  //   so a visit can never be linked back to the same person on a return
  //   trip.
  //
  //   The single exception is the opt-out flag below: if a visitor appends
  //   ?admin=1, their own choice to be excluded is remembered — the same
  //   idea as honouring "Do Not Track". That flag holds nothing else.
  // ============================================

  const CONFIG = {

    // Google Apps Script Web App URL.
    // Deploy > Manage deployments > copy the "/exec" URL.
    endpoint: 'https://script.google.com/macros/s/AKfycbzGRs63tAxg_WvE6kHAHpoUmLvFcQcM1kAdoGFgkKlVA2HGNdeRdGBc68Lrvh60w-A6cg/exec',

    // Must match SITE_KEY in the Apps Script.
    // Not a secret — it's a spam gate, readable by anyone who opens this file.
    siteKey: 'obs_funhoroscoop_20261018_q7Wk3Zm9Rt4Lp2Xc',

    // READ_KEY lives only in the Apps Script (server side). It must never be
    // shipped to the browser.

    allowedDomains: [
      'funhoroscoop.nl',
      'www.funhoroscoop.nl'
    ],

    // Opt-out via ?admin=1
    adminParameter: 'admin'

  };


  // ============================================
  // Domain guard — never record local/dev hosts
  // ============================================

  if (!CONFIG.allowedDomains.includes(window.location.hostname)) {
    return;
  }


  // ============================================
  // Storage helpers
  //
  // Used only for the opt-out flag. Every access is wrapped: Safari's
  // "Block All Cookies", WebViews and enterprise policies can make storage
  // throw. If it does, we quietly carry on without it rather than break the
  // page.
  // ============================================

  function safeStore(kind) {

    try {

      const store = window[kind];
      const probe = '__obs_probe__';

      store.setItem(probe, '1');
      store.removeItem(probe);

      return store;

    } catch (error) {
      return null;
    }
  }

  function storeGet(store, key) {

    try {
      return store ? store.getItem(key) : null;

    } catch (error) {
      return null;
    }
  }

  function storeSet(store, key, value) {

    try {
      if (store) store.setItem(key, value);

    } catch (error) {
      // Storage full or blocked — nothing to do
    }
  }

  const localStore = safeStore('localStorage');


  // ============================================
  // Opt-out (?admin=1)
  //
  // Stored only so the visitor's own choice is remembered — the same idea
  // as honouring "Do Not Track".
  // ============================================

  const params = new URLSearchParams(window.location.search);

  if (params.get(CONFIG.adminParameter) === '1') {
    storeSet(localStore, 'observability_admin', '1');
  }

  if (storeGet(localStore, 'observability_admin') === '1') {
    return;
  }


  // ============================================
  // human | crawler | automation
  //
  // A named list, not a loose /bot/ match — a bare /bot/ would also catch
  // some phone brands (e.g. "CUBOT") that are real people.
  // ============================================

  const CRAWLER_PATTERN = /bingbot|googlebot|google web preview|yandex|baiduspider|duckduckbot|applebot|ahrefs|semrush|mj12bot|dotbot|petalbot|bytespider|gptbot|oai-searchbot|chatgpt-user|claudebot|anthropic|ccbot|perplexity|cohere|seznambot|sogou|exabot|crawler|spider|slurp|scrapy|internetmeasurement|headless|lighthouse|pingdom|uptimerobot|statuscake|prerender|facebookexternalhit|embedly|linkedinbot|twitterbot|discordbot|slackbot|telegrambot|whatsapp|skypeuripreview|monitoring/;

  function getAgent() {

    const ua = navigator.userAgent.toLowerCase();

    if (navigator.webdriver === true || /headless|phantomjs|selenium|puppeteer|playwright/.test(ua)) {
      return 'automation';
    }

    if (CRAWLER_PATTERN.test(ua)) {
      return 'crawler';
    }

    return 'human';
  }


  // ============================================
  // Referrer helpers
  // ============================================

  function referrerUrl() {

    if (!document.referrer) return null;

    try {
      return new URL(document.referrer);

    } catch (error) {

      // Referrer is not a parseable URL (rare). Treat it as opaque.
      return null;
    }
  }

  // Raw referrer: host + path only. Query strings and hashes are dropped
  // so nothing like ?email=... can ever end up in the sheet.
  function getReferrer() {

    const ref = document.referrer;

    if (!ref) return 'direct';

    const url = referrerUrl();

    if (url) {
      return url.hostname.replace(/^www\./, '') + url.pathname;
    }

    return ref.split('?')[0].split('#')[0];
  }


  // ============================================
  // source + source_name
  //
  // Single ordered table; the first match wins, so an AI host that shares a
  // domain with a search engine (gemini on google, copilot on bing, duck.ai
  // on duckduckgo) must be listed before that search engine.
  //
  // Anything not matched is "referral" with an empty name — the raw
  // referrer column still shows where it came from, so brand-new AI tools
  // are discoverable instead of invisible.
  // ============================================

  const OPERATORS = [

    // --- AI assistants ---
    [/(^|\.)gemini\.google\./, 'ai', 'gemini'],
    [/(^|\.)bard\.google\./, 'ai', 'gemini'],
    [/(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$|(^|\.)openai\.com$/, 'ai', 'chatgpt'],
    [/(^|\.)perplexity\.ai$/, 'ai', 'perplexity'],
    [/(^|\.)copilot\.microsoft\.com$/, 'ai', 'copilot'],
    [/(^|\.)claude\.ai$/, 'ai', 'claude'],
    [/(^|\.)grok\.com$|(^|\.)x\.ai$/, 'ai', 'grok'],
    [/(^|\.)deepseek\.com$/, 'ai', 'deepseek'],
    [/(^|\.)mistral\.ai$/, 'ai', 'mistral'],
    [/(^|\.)you\.com$/, 'ai', 'you'],
    [/(^|\.)phind\.com$/, 'ai', 'phind'],
    [/(^|\.)poe\.com$/, 'ai', 'poe'],
    [/(^|\.)meta\.ai$/, 'ai', 'meta'],
    [/(^|\.)pi\.ai$/, 'ai', 'pi'],
    [/(^|\.)lmarena\.ai$/, 'ai', 'lmarena'],
    [/(^|\.)t3\.chat$/, 'ai', 't3chat'],
    [/(^|\.)openrouter\.ai$/, 'ai', 'openrouter'],
    [/(^|\.)huggingface\.co$/, 'ai', 'huggingface'],
    [/(^|\.)duck\.ai$/, 'ai', 'duckduckgo'],
    [/(^|\.)qwen\.ai$|(^|\.)chat\.qwen\.ai$|(^|\.)tongyi\.aliyun\.com$/, 'ai', 'qwen'],
    [/(^|\.)kimi\.com$|(^|\.)kimi\.moonshot\.cn$|(^|\.)moonshot\.cn$/, 'ai', 'kimi'],
    [/(^|\.)doubao\.com$/, 'ai', 'doubao'],
    [/(^|\.)genspark\.ai$/, 'ai', 'genspark'],
    [/(^|\.)character\.ai$/, 'ai', 'character'],
    [/(^|\.)elicit\.com$/, 'ai', 'elicit'],
    [/(^|\.)consensus\.app$/, 'ai', 'consensus'],

    // --- search engines ---
    [/(^|\.)google\./, 'search', 'google'],
    [/(^|\.)bing\./, 'search', 'bing'],
    [/(^|\.)duckduckgo\./, 'search', 'duckduckgo'],
    [/(^|\.)ecosia\./, 'search', 'ecosia'],
    [/(^|\.)yahoo\./, 'search', 'yahoo'],
    [/(^|\.)startpage\./, 'search', 'startpage'],
    [/(^|\.)qwant\./, 'search', 'qwant'],
    [/(^|\.)brave\./, 'search', 'brave'],
    [/(^|\.)yandex\./, 'search', 'yandex'],
    [/(^|\.)mojeek\./, 'search', 'mojeek'],
    [/(^|\.)baidu\./, 'search', 'baidu'],

    // --- social ---
    [/(^|\.)facebook\.com$|(^|\.)fb\.com$/, 'social', 'facebook'],
    [/(^|\.)twitter\.com$|(^|\.)x\.com$|(^|\.)t\.co$/, 'social', 'x'],
    [/(^|\.)reddit\.com$/, 'social', 'reddit'],
    [/(^|\.)instagram\.com$/, 'social', 'instagram'],
    [/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/, 'social', 'linkedin'],
    [/(^|\.)youtube\.com$|(^|\.)youtu\.be$/, 'social', 'youtube'],
    [/(^|\.)discord\./, 'social', 'discord'],
    [/(^|\.)pinterest\./, 'social', 'pinterest'],
    [/(^|\.)tiktok\.com$/, 'social', 'tiktok'],
    [/(^|\.)telegram\./, 'social', 'telegram'],
    [/(^|\.)whatsapp\.com$|(^|\.)wa\.me$/, 'social', 'whatsapp']

  ];

  function getSource() {

    const url = referrerUrl();

    if (!document.referrer || !url) {
      return { source: document.referrer ? 'referral' : 'direct', name: '' };
    }

    const host = url.hostname.toLowerCase().replace(/^www\./, '');

    // Copilot shares bing.com with Bing Search and only lives under /chat.
    if (host === 'bing.com' && url.pathname.indexOf('/chat') === 0) {
      return { source: 'ai', name: 'copilot' };
    }

    for (let i = 0; i < OPERATORS.length; i++) {
      if (OPERATORS[i][0].test(host)) {
        return { source: OPERATORS[i][1], name: OPERATORS[i][2] };
      }
    }

    return { source: 'referral', name: '' };
  }


  // ============================================
  // Send one page view
  // ============================================

  function send() {

    const origin = getSource();

    const payload = {
      page: window.location.pathname,
      agent: getAgent(),
      source: origin.source,
      source_name: origin.name,
      referrer: getReferrer(),
      site_key: CONFIG.siteKey
    };

    // timestamp_utc and date are added by the collector, not sent from here,
    // so the recorded time is the server's own clock.

    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {

      navigator.sendBeacon(CONFIG.endpoint, body);

    } else {

      fetch(CONFIG.endpoint, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        body: body
      }).catch(function () {});

    }
  }

  send();

})();
