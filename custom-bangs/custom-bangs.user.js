// ==UserScript==
// @name         Custom DuckDuckGo Bangs
// @namespace    https://github.com/JMcrafter26/userscripts
// @version      1.6.1
// @description  Add your own !bangs to DuckDuckGo (and other search engines) without touching built-in ones
// @author       Cufiy
// @license      AGPL-3.0
// @copyright    Copyright (C) 2026, Cufiy
// @downloadURL  https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js
// @updateURL    https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js
// @match        https://duckduckgo.com/*
// @match        https://*.duckduckgo.com/*
// @match        https://*.google.com/search*
// @match        https://*.bing.com/search*
// @match        https://*.yahoo.com/search*
// @match        https://search.yahoo.com/search*
// @match        https://*.startpage.com/sp/search*
// @match        https://*.startpage.com/do/dsearch*
// @match        https://search.brave.com/search*
// @match        https://*.ecosia.org/search*
// @match        https://*.qwant.com/?*
// @match        https://kagi.com/search*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @connect      duckduckgo.com
// @connect      raw.githubusercontent.com
// @connect      gist.githubusercontent.com
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const OWN_KEY = 'customBangs';
  const LISTS_KEY = 'externalLists';
  const SETTINGS_KEY = 'cbSettings';       // {checkCollisions, syncInterval, enableOtherEngines, useDdgOfficial}
  const DDG_CACHE_KEY = 'ddgOfficialCache';

  // ---------- Storage helpers ----------
  function getOwn() { try { return JSON.parse(GM_getValue(OWN_KEY, '[]')); } catch (e) { return []; } }
  function saveOwn(list) { GM_setValue(OWN_KEY, JSON.stringify(list)); }

  function getLists() { try { return JSON.parse(GM_getValue(LISTS_KEY, '[]')); } catch (e) { return []; } }
  function saveLists(list) { GM_setValue(LISTS_KEY, JSON.stringify(list)); }

  function getSettings() {
    const defaults = { checkCollisions: true, syncInterval: 24, enableOtherEngines: true, useDdgOfficial: true };
    try { return Object.assign(defaults, JSON.parse(GM_getValue(SETTINGS_KEY, '{}'))); }
    catch (e) { return defaults; }
  }
  function saveSettings(s) { GM_setValue(SETTINGS_KEY, JSON.stringify(s)); }

  function getDdgCache() {
    try { return JSON.parse(GM_getValue(DDG_CACHE_KEY, '{"bangs":[],"lastFetched":null}')); }
    catch (e) { return { bangs: [], lastFetched: null }; }
  }
  function saveDdgCache(c) { GM_setValue(DDG_CACHE_KEY, JSON.stringify(c)); }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  // ---------- Shared parser ----------
  function normalizeRemoteBangs(rawText) {
    const data = JSON.parse(rawText);
    if (!Array.isArray(data)) throw new Error('Expected a JSON array');
    return data.map(item => {
      if (item.t !== undefined && item.u !== undefined) {
        return { trigger: String(item.t).replace(/^!/, '').toLowerCase(), name: item.s || item.t, url: item.u };
      }
      if (item.trigger !== undefined && item.url !== undefined) {
        return { trigger: String(item.trigger).replace(/^!/, '').toLowerCase(), name: item.name || item.trigger, url: item.url };
      }
      return null;
    }).filter(Boolean);
  }

  // ---------- Matching & redirect ----------
  function findMatch(trigger, isDDG) {
    const t = trigger.toLowerCase();

    // 0. Config page (aka !bangs)
    if (t === 'config' || t === 'custombangs' || t === 'bangs') return { source: 'bangs' };

    
    // 1. Personal bangs
    const own = getOwn().find(b => b.trigger.toLowerCase() === t);
    if (own) return { source: 'own', bang: own };

    // 2. External lists
    for (const list of getLists()) {
      if (!list.enabled) continue;
      const found = (list.bangs || []).find(b => b.trigger.toLowerCase() === t);
      if (found) return { source: 'list', listName: list.name, bang: found };
    }

    // 3. Official DDG bangs (Only if on another engine and setting is enabled)
    // We skip this on DDG natively to let DDG handle its own internal logic without redundant redirects
    const settings = getSettings();
    if (!isDDG && settings.enableOtherEngines && settings.useDdgOfficial) {
      const ddgCache = getDdgCache();
      const foundOfficial = (ddgCache.bangs || []).find(b => b.trigger.toLowerCase() === t);
      if (foundOfficial) return { source: 'official', bang: foundOfficial };
    }

    return null;
  }

  function buildTarget(url, rest) {
    return url.includes('{{{s}}}')
      ? url.replace(/\{\{\{s\}\}\}/g, encodeURIComponent(rest))
      : url + encodeURIComponent(rest);
  }

  function tryRedirect() {
    const isDDG = location.hostname.includes('duckduckgo.com');
    const settings = getSettings();
    
    if (!isDDG && !settings.enableOtherEngines) return false;

    const params = new URLSearchParams(location.search);
    // Look for common search parameters across engines (q: Google/Bing/DDG/Brave, p: Yahoo, query: Startpage)
    const q = ['q', 'p', 'query', 'text'].map(k => params.get(k)).find(Boolean);
    if (!q) return false;

    const match = q.match(/(^|\s)!(\S+)/);
    if (!match) return false;

    const hit = findMatch(match[2], isDDG);
    if (!hit) return false; 

    const rest = q.replace(match[0], ' ').trim().replace(/\s+/g, ' ');
    location.replace(buildTarget(hit.bang.url, rest));
    return true;
  }

  if (tryRedirect()) return;

  // ---------- Remote sync ----------
  function syncList(id, { silent = false } = {}) {
    return new Promise((resolve, reject) => {
      const lists = getLists();
      const list = lists.find(l => l.id === id);
      if (!list) return reject(new Error('list not found'));
      GM_xmlhttpRequest({
        method: 'GET', url: list.url, nocache: true,
        onload: (res) => {
          try {
            const parsed = normalizeRemoteBangs(res.responseText);
            const fresh = getLists();
            const target = fresh.find(l => l.id === id);
            if (!target) return resolve(null);
            target.bangs = parsed;
            target.lastSync = new Date().toISOString();
            saveLists(fresh);
            if (!silent) GM_notification({ text: `${target.name}: synced ${parsed.length} bangs`, title: 'Custom Bangs' });
            resolve(parsed);
          } catch (e) {
            if (!silent) GM_notification({ text: `${list.name}: sync failed — ${e.message}`, title: 'Custom Bangs' });
            reject(e);
          }
        },
        onerror: (e) => {
          if (!silent) GM_notification({ text: `${list.name}: sync request failed`, title: 'Custom Bangs' });
          reject(e);
        }
      });
    });
  }

  function fetchDdgOfficial({ silent = false } = {}) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET', url: 'https://duckduckgo.com/bang.js', nocache: true,
        onload: (res) => {
          try {
            const parsed = normalizeRemoteBangs(res.responseText);
            saveDdgCache({ bangs: parsed, lastFetched: new Date().toISOString() });
            if (!silent) GM_notification({ text: `Cached ${parsed.length} official DDG bangs`, title: 'Custom Bangs' });
            resolve(parsed);
          } catch (e) {
            if (!silent) GM_notification({ text: 'Fetching official DDG bangs failed: ' + e.message, title: 'Custom Bangs' });
            reject(e);
          }
        },
        onerror: (e) => { if (!silent) GM_notification({ text: 'Fetching official DDG bangs failed', title: 'Custom Bangs' }); reject(e); }
      });
    });
  }

  // ---------- Collision helpers ----------
  function officialTriggerMap() {
    return new Map(getDdgCache().bangs.map(b => [b.trigger.toLowerCase(), b]));
  }

  function ownCollision(trigger) {
    if (!getSettings().checkCollisions) return null;
    return officialTriggerMap().get(trigger.toLowerCase()) || null;
  }

  function listStats(list, allLists, ownBangs) {
    const settings = getSettings();
    const idx = allLists.findIndex(l => l.id === list.id);
    const higherSets = allLists.slice(0, idx).filter(l => l.enabled)
      .map(l => new Set((l.bangs || []).map(b => b.trigger.toLowerCase())));
    const ownSet = new Set(ownBangs.map(b => b.trigger.toLowerCase()));
    const official = settings.checkCollisions ? officialTriggerMap() : null;

    let shadowed = 0, officialCollisions = 0;
    for (const b of (list.bangs || [])) {
      const t = b.trigger.toLowerCase();
      if (ownSet.has(t) || higherSets.some(s => s.has(t))) shadowed++;
      if (official && official.has(t)) officialCollisions++;
    }
    return { shadowed, officialCollisions, total: (list.bangs || []).length };
  }

  // ---------- UI ----------
  const STYLE = `
  .cb-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:999999;display:flex;
    align-items:flex-start;justify-content:center;padding:16px;overflow:auto;font-family:-apple-system,system-ui,sans-serif;box-sizing:border-box;}
  .cb-modal{background:#181818;color:#eee;width:100%;max-width:780px;border-radius:12px;padding:24px;
    box-shadow:0 10px 40px rgba(0,0,0,.5);position:relative;box-sizing:border-box;margin-bottom:40px;}
  .cb-modal h2{margin:0 0 16px;font-size:20px;}
  .cb-row{display:flex;gap:8px;margin-bottom:10px;align-items:center;flex-wrap:wrap;}
  .cb-row input, .cb-row select{flex:1;background:#111;border:1px solid #333;color:#eee;border-radius:8px;padding:8px 10px;font-size:14px;box-sizing:border-box;}
  .cb-row input.cb-trigger{flex:0 0 90px;}
  .cb-list{max-height:260px;overflow:auto;margin-bottom:16px;border:1px solid #2a2a2a;border-radius:8px;}
  .cb-item{display:flex;gap:8px;align-items:center;padding:10px;border-bottom:1px solid #2a2a2a;}
  .cb-item:last-child{border-bottom:none;}
  .cb-item-info{display:flex;flex:1;align-items:center;overflow:hidden;gap:8px;}
  .cb-item-actions{display:flex;gap:6px;flex-shrink:0;}
  .cb-item .cb-trig{color:#7ab7ff;font-weight:600;width:70px;flex-shrink:0;}
  .cb-item .cb-name{flex:1;color:#ccc;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;align-items:center;}
  .cb-item .cb-url{flex:2;color:#888;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .cb-cat-badge{background:#333;padding:3px 6px;border-radius:4px;font-size:11px;margin-right:6px;color:#bbb;white-space:nowrap;}
  .cb-warn{color:#e0b040;font-size:12px;cursor:help;}
  .cb-btn{background:#2a2a2a;color:#eee;border:1px solid #3a3a3a;border-radius:8px;padding:8px 12px;
    font-size:13px;cursor:pointer;white-space:nowrap;box-sizing:border-box;}
  .cb-btn:hover{background:#333;}
  .cb-btn.danger{color:#ff8080;}
  .cb-btn.primary{background:#3574f0;border-color:#3574f0;}
  .cb-btn:disabled{opacity:.35;cursor:default;}
  .cb-section{margin-top:20px;padding-top:16px;border-top:1px solid #2a2a2a;}
  .cb-section h3{margin:0 0 4px;font-size:14px;color:#aaa;text-transform:uppercase;letter-spacing:.05em;}
  .cb-section .cb-hint{color:#777;font-size:12px;margin-bottom:10px;}
  .cb-section textarea{width:100%;min-height:120px;background:#111;border:1px solid #333;color:#eee;
    border-radius:8px;padding:8px;font-family:monospace;font-size:12px;box-sizing:border-box;}
  .cb-flex{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center;}
  .cb-close{position:absolute;top:16px;right:20px;cursor:pointer;color:#888;font-size:24px;background:none;border:none;}
  .cb-small{color:#888;font-size:12px;margin-top:4px;}
  .cb-listrow{display:flex;gap:8px;align-items:center;padding:10px;border-bottom:1px solid #2a2a2a;flex-wrap:wrap;}
  .cb-listrow:last-child{border-bottom:none;}
  .cb-listrow.disabled{opacity:.45;}
  .cb-listrow .cb-lname{flex:1;min-width:0;}
  .cb-listrow .cb-lname .cb-ltitle{font-size:14px;color:#eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .cb-listrow .cb-lname .cb-lmeta{font-size:11px;color:#888;}
  .cb-order-badge{width:22px;height:22px;border-radius:6px;background:#222;display:flex;align-items:center;
    justify-content:center;font-size:11px;color:#888;flex-shrink:0;}
  .cb-toggle{width:18px;height:18px;flex-shrink:0;}
  
  /* Mobile Responsiveness */
  @media (max-width: 650px) {
    .cb-modal { padding: 16px; }
    .cb-row { flex-direction: column; align-items: stretch; }
    .cb-row input.cb-trigger { flex: 1; }
    .cb-item { flex-direction: column; align-items: flex-start; gap: 10px; }
    .cb-item-info { flex-direction: column; align-items: flex-start; width: 100%; gap: 6px; }
    .cb-item .cb-url { width: 100%; white-space: normal; word-break: break-all; }
    .cb-item-actions { width: 100%; justify-content: space-between; }
    .cb-item-actions button { flex: 1; text-align: center; }
    .cb-listrow { flex-direction: column; align-items: flex-start; gap: 12px; }
    .cb-listrow > div:first-child { display: flex; align-items: center; gap: 8px; width: 100%; }
    .cb-listrow .cb-lname { width: 100%; }
    .cb-listrow .cb-btn { width: 100%; }
    .cb-flex { flex-direction: column; align-items: stretch; }
    .cb-flex button { width: 100%; }
    .cb-flex .cb-small { text-align: center; }
  }
  `;

  function injectStyle() {
    if (document.getElementById('cb-style')) return;
    const s = document.createElement('style');
    s.id = 'cb-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str == null ? '' : String(str);
    return d.innerHTML;
  }

  function openManager() {
    injectStyle();
    let editBangId = null;

    const overlay = document.createElement('div');
    overlay.className = 'cb-overlay';
    overlay.innerHTML = `
      <div class="cb-modal">
        <button class="cb-close" title="Close">×</button>
        <h2>Custom Bangs</h2>

        <div class="cb-section" style="margin-top:0;border-top:none;padding-top:0;">
          <h3>Your own bangs <span style="color:#666;">(always highest priority)</span></h3>
          <div class="cb-list" id="cb-own-list"></div>
          
          <div class="cb-row">
            <input class="cb-trigger" id="cb-in-trigger" placeholder="!gh" />
            <input id="cb-in-name" placeholder="Site name, e.g. GitHub" />
            <select id="cb-in-category">
              <option value="">Choose category</option>
              <option value="Tech">Tech</option>
              <option value="Shopping">Shopping</option>
              <option value="Research">Research</option>
              <option value="Online Services">Online Services</option>
              <option value="News">News</option>
              <option value="Multimedia">Multimedia</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Translation">Translation</option>
            </select>
          </div>
          <div class="cb-row">
            <input id="cb-in-url" placeholder="https://github.com/search?q={{{s}}}" title="Paste a search URL here and we'll automatically replace the query with {{{s}}}!" />
          </div>
          <div class="cb-row">
            <input id="cb-in-example" placeholder="Example search, e.g. userscripts" />
            <button class="cb-btn" id="cb-test">Test</button>
            <button class="cb-btn primary" id="cb-add">Add</button>
            <button class="cb-btn" id="cb-cancel-edit" style="display:none;">Cancel</button>
          </div>
        </div>

        <div class="cb-section">
          <h3>External bang lists</h3>
          <div class="cb-hint">Checked in order below, after your own bangs. Drag priority with ↑/↓ — not the same as your own bangs, these come from someone else's index.</div>
          <div class="cb-list" id="cb-lists"></div>
          <div class="cb-row">
            <input id="cb-list-name" placeholder="List name, e.g. Someone's gist" style="flex:1;" />
            <input id="cb-list-url" placeholder="https://gist.githubusercontent.com/.../raw/bangs.json" style="flex:2;" />
            <button class="cb-btn primary" id="cb-list-add">Add list</button>
          </div>
        </div>

        <div class="cb-section">
          <h3>Settings & Sync</h3>
          
          <div class="cb-row" style="margin-bottom:12px; flex-direction: row; flex-wrap: nowrap; align-items: center;">
            <input type="checkbox" id="cb-engine-toggle" style="flex:0 0 auto;width:18px;height:18px;" />
            <label for="cb-engine-toggle" style="font-size:13px;color:#ccc;line-height:1.4;cursor:pointer;">Enable Custom Bangs on other search engines (Google, Bing, Yahoo, Startpage, etc.)</label>
          </div>
          <div class="cb-row" style="margin-bottom:12px; flex-direction: row; flex-wrap: nowrap; align-items: center; padding-left: 26px;">
            <input type="checkbox" id="cb-ddg-official-toggle" style="flex:0 0 auto;width:18px;height:18px;" />
            <label for="cb-ddg-official-toggle" style="font-size:13px;color:#ccc;line-height:1.4;cursor:pointer;">Use official DuckDuckGo bangs on other search engines</label>
          </div>

          <div class="cb-row" style="margin-bottom:12px; flex-direction: row; flex-wrap: nowrap; align-items: center;">
            <input type="checkbox" id="cb-collision-toggle" style="flex:0 0 auto;width:18px;height:18px;" />
            <label for="cb-collision-toggle" style="font-size:13px;color:#ccc;line-height:1.4;cursor:pointer;">Warn when a bang collides with DuckDuckGo's official list</label>
          </div>

          <div class="cb-row" style="margin-bottom:12px; flex-direction: row; flex-wrap: nowrap; align-items: center; max-width: 350px;">
            <label for="cb-sync-interval" style="font-size:13px;color:#ccc;white-space:nowrap;">Auto-sync interval:</label>
            <select id="cb-sync-interval" style="margin-left: 10px;">
              <option value="0">Never (Manual only)</option>
              <option value="12">Every 12 Hours</option>
              <option value="24">Daily</option>
              <option value="168">Weekly</option>
            </select>
          </div>

          <div class="cb-flex">
            <button class="cb-btn" id="cb-ddg-refresh">Refresh official DDG bang cache</button>
            <span class="cb-small" id="cb-ddg-status"></span>
          </div>
        </div>

        <div class="cb-section">
          <h3>Backup & Restore (Everything)</h3>
          <div class="cb-hint">Export or import your entire configuration (own bangs, external lists, and settings) to easily copy it to another browser.</div>
          <textarea id="cb-json" placeholder='{"own": [], "lists": [], "settings": {}}'></textarea>
          <div class="cb-flex">
            <button class="cb-btn" id="cb-export-all">Export Everything</button>
            <button class="cb-btn danger" id="cb-import-all">Import Everything (Overwrites!)</button>
          </div>
        </div>
      </div>
    `;
    document.documentElement.appendChild(overlay);

    const ownListEl = overlay.querySelector('#cb-own-list');
    const listsEl = overlay.querySelector('#cb-lists');
    const ddgStatusEl = overlay.querySelector('#cb-ddg-status');
    const collisionToggle = overlay.querySelector('#cb-collision-toggle');
    const engineToggle = overlay.querySelector('#cb-engine-toggle');
    const ddgOfficialToggle = overlay.querySelector('#cb-ddg-official-toggle');
    const ddgOfficialLabel = overlay.querySelector('label[for="cb-ddg-official-toggle"]');
    const syncIntervalSel = overlay.querySelector('#cb-sync-interval');
    const urlInput = overlay.querySelector('#cb-in-url');

    // Init settings
    const settings = getSettings();
    collisionToggle.checked = settings.checkCollisions;
    syncIntervalSel.value = settings.syncInterval;
    
    engineToggle.checked = settings.enableOtherEngines;
    ddgOfficialToggle.checked = settings.useDdgOfficial;
    
    function updateDdgOfficialState() {
      ddgOfficialToggle.disabled = !engineToggle.checked;
      ddgOfficialLabel.style.opacity = engineToggle.checked ? '1' : '0.5';
      if (!engineToggle.checked) ddgOfficialToggle.checked = false;
    }
    updateDdgOfficialState();

    collisionToggle.addEventListener('change', () => {
      saveSettings(Object.assign(getSettings(), { checkCollisions: collisionToggle.checked }));
      renderOwn(); renderLists();
    });

    engineToggle.addEventListener('change', () => {
      saveSettings(Object.assign(getSettings(), { enableOtherEngines: engineToggle.checked }));
      updateDdgOfficialState();
      saveSettings(Object.assign(getSettings(), { useDdgOfficial: ddgOfficialToggle.checked }));
    });

    ddgOfficialToggle.addEventListener('change', () => {
      saveSettings(Object.assign(getSettings(), { useDdgOfficial: ddgOfficialToggle.checked }));
    });

    syncIntervalSel.addEventListener('change', () => {
      saveSettings(Object.assign(getSettings(), { syncInterval: parseInt(syncIntervalSel.value, 10) }));
    });

    // Auto-extract URL query parameter on paste
    urlInput.addEventListener('paste', (e) => {
      if (urlInput.value.trim() !== '') return; 
      
      const pastedText = (e.clipboardData || window.clipboardData).getData('text');
      if (!pastedText || pastedText.includes('{{{s}}}')) return;

      try {
        const urlObj = new URL(pastedText);
        const queryParamsToLookFor = ['q', 'query', 'search', 's', 'term', 'keyword', 'k', 'p', 'text'];
        let modified = false;

        for (const param of queryParamsToLookFor) {
          if (urlObj.searchParams.has(param)) {
            urlObj.searchParams.set(param, '{{{s}}}');
            modified = true;
            break; 
          }
        }

        // If no known query parameter was found but the url contains /search/something pattern, we can also replace that
        if (!modified) {
          const searchPathMatch = urlObj.pathname.match(/\/search\/([^\/]+)/);
          if (searchPathMatch) {
            urlObj.pathname = urlObj.pathname.replace(searchPathMatch[1], '{{{s}}}');
            modified = true;
          }
        }

        if (modified) {
          e.preventDefault(); 
          urlInput.value = urlObj.toString().replace(/(?:%7B){3}s(?:%7D){3}/gi, '{{{s}}}');
        }
      } catch (err) {
        // Not a valid URL, ignore and let standard paste happen
      }
    });

    function renderDdgStatus() {
      const cache = getDdgCache();
      ddgStatusEl.textContent = cache.lastFetched
        ? `${cache.bangs.length} bangs cached · last fetched ${new Date(cache.lastFetched).toLocaleString()}`
        : 'Not fetched yet';
    }
    renderDdgStatus();

    overlay.querySelector('#cb-ddg-refresh').addEventListener('click', (e) => {
      e.target.disabled = true;
      fetchDdgOfficial().then(() => { renderDdgStatus(); renderOwn(); renderLists(); })
        .finally(() => { e.target.disabled = false; });
    });

    // ---- Own bangs ----
    function renderOwn() {
      const own = getOwn();
      if (!own.length) {
        ownListEl.innerHTML = '<div style="padding:16px;color:#666;font-size:13px;">No custom bangs yet.</div>';
        return;
      }
      ownListEl.innerHTML = own.map(b => {
        const collision = ownCollision(b.trigger);
        const warn = collision
          ? `<span class="cb-warn" title="Overrides official DDG bang !${escapeHtml(b.trigger)} → ${escapeHtml(collision.url)}">⚠</span>`
          : '';
        const catBadge = b.category ? `<span class="cb-cat-badge">${escapeHtml(b.category)}</span>` : '';
        
        return `
        <div class="cb-item" data-id="${b.id}">
          <div class="cb-item-info">
            <span class="cb-trig">!${escapeHtml(b.trigger)}</span>
            <span class="cb-name">${catBadge}${escapeHtml(b.name)}</span>
            <span class="cb-url">${escapeHtml(b.url)}</span>
            ${warn}
          </div>
          <div class="cb-item-actions">
            <button class="cb-btn" data-action="test">Test</button>
            <button class="cb-btn" data-action="edit">Edit</button>
            <button class="cb-btn danger" data-action="delete">Delete</button>
          </div>
        </div>`;
      }).join('');
    }

    ownListEl.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const item = e.target.closest('.cb-item');
      const id = item.dataset.id;
      const own = getOwn();
      const bang = own.find(b => b.id === id);

      if (btn.dataset.action === 'delete') {
        if (editBangId === id) overlay.querySelector('#cb-cancel-edit').click();
        saveOwn(own.filter(b => b.id !== id));
        renderOwn(); renderLists();
      } else if (btn.dataset.action === 'test') {
        const q = bang.example || 'test';
        window.open(buildTarget(bang.url, q), '_blank');
      } else if (btn.dataset.action === 'edit') {
        editBangId = bang.id;
        overlay.querySelector('#cb-in-trigger').value = bang.trigger;
        overlay.querySelector('#cb-in-name').value = bang.name || '';
        overlay.querySelector('#cb-in-category').value = bang.category || '';
        overlay.querySelector('#cb-in-url').value = bang.url || '';
        overlay.querySelector('#cb-in-example').value = bang.example || '';
        overlay.querySelector('#cb-add').textContent = 'Save Edit';
        overlay.querySelector('#cb-cancel-edit').style.display = 'inline-block';
      }
    });

    overlay.querySelector('#cb-cancel-edit').addEventListener('click', () => {
      editBangId = null;
      overlay.querySelector('#cb-in-trigger').value = '';
      overlay.querySelector('#cb-in-name').value = '';
      overlay.querySelector('#cb-in-category').value = '';
      overlay.querySelector('#cb-in-url').value = '';
      overlay.querySelector('#cb-in-example').value = '';
      overlay.querySelector('#cb-add').textContent = 'Add';
      overlay.querySelector('#cb-cancel-edit').style.display = 'none';
    });

    overlay.querySelector('#cb-add').addEventListener('click', () => {
      const trigger = overlay.querySelector('#cb-in-trigger').value.trim().replace(/^!/, '');
      const name = overlay.querySelector('#cb-in-name').value.trim();
      const category = overlay.querySelector('#cb-in-category').value;
      const url = overlay.querySelector('#cb-in-url').value.trim();
      const example = overlay.querySelector('#cb-in-example').value.trim();
      
      if (!trigger || !url) { alert('Bang command and Bang URL are required.'); return; }
      if (!url.includes('{{{s}}}') && !confirm('URL has no {{{s}}} placeholder — the query will just be appended. Continue?')) return;

      const list = getOwn();
      
      if (editBangId) {
        const idx = list.findIndex(b => b.id === editBangId);
        if (idx >= 0) {
          const conflictIdx = list.findIndex(b => b.trigger.toLowerCase() === trigger.toLowerCase() && b.id !== editBangId);
          if (conflictIdx >= 0) {
            alert('Another custom bang with this trigger already exists!');
            return;
          }
          list[idx] = { id: editBangId, name, trigger, url, example, category };
        }
        editBangId = null;
        overlay.querySelector('#cb-add').textContent = 'Add';
        overlay.querySelector('#cb-cancel-edit').style.display = 'none';
      } else {
        const existingIdx = list.findIndex(b => b.trigger.toLowerCase() === trigger.toLowerCase());
        const entry = { id: existingIdx >= 0 ? list[existingIdx].id : uid(), name, trigger, url, example, category };
        if (existingIdx >= 0) list[existingIdx] = entry; else list.push(entry);
      }

      saveOwn(list);
      overlay.querySelector('#cb-in-trigger').value = '';
      overlay.querySelector('#cb-in-name').value = '';
      overlay.querySelector('#cb-in-category').value = '';
      overlay.querySelector('#cb-in-url').value = '';
      overlay.querySelector('#cb-in-example').value = '';
      renderOwn(); renderLists();
    });

    overlay.querySelector('#cb-test').addEventListener('click', () => {
      const url = overlay.querySelector('#cb-in-url').value.trim();
      const example = overlay.querySelector('#cb-in-example').value.trim() || 'test';
      if (!url) return;
      window.open(buildTarget(url, example), '_blank');
    });

    // ---- Global Import/Export ----
    overlay.querySelector('#cb-export-all').addEventListener('click', () => {
      const payload = {
        own: getOwn(),
        lists: getLists(),
        settings: getSettings()
      };
      overlay.querySelector('#cb-json').value = JSON.stringify(payload, null, 2);
    });

    overlay.querySelector('#cb-import-all').addEventListener('click', () => {
      const raw = overlay.querySelector('#cb-json').value.trim();
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        
        if (Array.isArray(parsed)) {
          throw new Error('This looks like a list of bangs (v1 export). Please wrap it in {"own": [...]} or re-export from the new version.');
        }
        
        if (!parsed.own || !parsed.lists) {
          throw new Error('Invalid format. Expected "own" and "lists" arrays.');
        }

        if (!confirm(`This will OVERWRITE your entire Custom Bangs configuration (including external lists and settings). Continue?`)) return;
        
        saveOwn(parsed.own);
        saveLists(parsed.lists);
        if (parsed.settings) saveSettings(Object.assign(getSettings(), parsed.settings));
        
        // Sync UI toggles with new settings
        const newSettings = getSettings();
        overlay.querySelector('#cb-collision-toggle').checked = newSettings.checkCollisions;
        overlay.querySelector('#cb-sync-interval').value = newSettings.syncInterval;
        overlay.querySelector('#cb-engine-toggle').checked = newSettings.enableOtherEngines;
        overlay.querySelector('#cb-ddg-official-toggle').checked = newSettings.useDdgOfficial;
        updateDdgOfficialState();
        
        renderOwn(); 
        renderLists();
        
        alert('Data imported successfully!');
        overlay.querySelector('#cb-json').value = '';
      } catch (e) { 
        alert('Import failed: ' + e.message); 
      }
    });

    // ---- External lists ----
    function renderLists() {
      const lists = getLists();
      const own = getOwn();
      if (!lists.length) {
        listsEl.innerHTML = '<div style="padding:16px;color:#666;font-size:13px;">No external lists added yet.</div>';
        return;
      }
      listsEl.innerHTML = lists.map((l, i) => {
        const stats = listStats(l, lists, own);
        const collisionText = getSettings().checkCollisions
          ? ` · ${stats.officialCollisions} collide with official DDG bangs`
          : '';
        return `
        <div class="cb-listrow ${l.enabled ? '' : 'disabled'}" data-id="${l.id}">
          <div>
            <span class="cb-order-badge">${i + 1}</span>
            <input type="checkbox" class="cb-toggle" data-action="toggle" ${l.enabled ? 'checked' : ''} title="Enabled" />
          </div>
          <div class="cb-lname">
            <div class="cb-ltitle">${escapeHtml(l.name)}</div>
            <div class="cb-lmeta">${stats.total} bangs · ${stats.shadowed} shadowed by higher priority${collisionText}${l.lastSync ? ' · synced ' + new Date(l.lastSync).toLocaleString() : ' · never synced'}</div>
          </div>
          <button class="cb-btn" data-action="up" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button class="cb-btn" data-action="down" ${i === lists.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="cb-btn" data-action="sync">Sync</button>
          <button class="cb-btn danger" data-action="remove">Remove</button>
        </div>`;
      }).join('');
    }

    listsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const row = e.target.closest('.cb-listrow');
      const id = row.dataset.id;
      const lists = getLists();
      const idx = lists.findIndex(l => l.id === id);
      if (idx === -1) return;
      const action = btn.dataset.action;

      if (action === 'toggle') {
        lists[idx].enabled = btn.checked;
        saveLists(lists); renderLists();
      } else if (action === 'up' && idx > 0) {
        [lists[idx - 1], lists[idx]] = [lists[idx], lists[idx - 1]];
        saveLists(lists); renderLists();
      } else if (action === 'down' && idx < lists.length - 1) {
        [lists[idx + 1], lists[idx]] = [lists[idx], lists[idx + 1]];
        saveLists(lists); renderLists();
      } else if (action === 'remove') {
        if (!confirm(`Remove "${lists[idx].name}"?`)) return;
        lists.splice(idx, 1);
        saveLists(lists); renderLists();
      } else if (action === 'sync') {
        btn.disabled = true;
        syncList(id).then(() => renderLists()).finally(() => { btn.disabled = false; });
      }
    });

    overlay.querySelector('#cb-list-add').addEventListener('click', () => {
      const name = overlay.querySelector('#cb-list-name').value.trim();
      const url = overlay.querySelector('#cb-list-url').value.trim();
      if (!name || !url) { alert('Name and URL are required.'); return; }
      const lists = getLists();
      const entry = { id: uid(), name, url, enabled: true, bangs: [], lastSync: null };
      lists.push(entry);
      saveLists(lists);
      overlay.querySelector('#cb-list-name').value = '';
      overlay.querySelector('#cb-list-url').value = '';
      renderLists();
      syncList(entry.id).then(() => renderLists());
    });

    overlay.querySelector('.cb-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });

    renderOwn();
    renderLists();
  }

  // ---------- Menu commands & Floating UI ----------
  function registerMenu() {
    GM_registerMenuCommand('⚙️ Manage Custom Bangs', openManager);
    GM_registerMenuCommand('🔄 Sync all external lists', () => {
      const lists = getLists();
      if (!lists.length) { alert('No external lists added yet.'); return; }
      Promise.all(lists.map(l => syncList(l.id, { silent: true })))
        .then(() => GM_notification({ text: `Synced ${lists.length} list(s)`, title: 'Custom Bangs' }));
    });
  }

  function injectFloatingButton() {
    if (location.hostname.includes('duckduckgo.com') && location.pathname === '/bangs') {
      if (document.getElementById('cb-floating-btn')) return;

      const btn = document.createElement('button');
      btn.id = 'cb-floating-btn';
      btn.textContent = '⚙️ Custom Bangs';
      Object.assign(btn.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: '99999',
        background: '#3574f0',
        color: '#fff',
        border: 'none',
        borderRadius: '24px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        fontFamily: '-apple-system, system-ui, sans-serif'
      });

      btn.addEventListener('mouseenter', () => btn.style.background = '#4a84f4');
      btn.addEventListener('mouseleave', () => btn.style.background = '#3574f0');
      btn.addEventListener('click', openManager);

      document.body.appendChild(btn);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      registerMenu();
      injectFloatingButton();
    });
  } else {
    registerMenu();
    injectFloatingButton();
  }

  // ---------- Background auto-sync ----------
  const syncHours = getSettings().syncInterval;
  if (syncHours > 0) {
    const syncIntervalMs = syncHours * 60 * 60 * 1000;
    
    for (const list of getLists()) {
      if (list.enabled && (!list.lastSync || Date.now() - new Date(list.lastSync).getTime() > syncIntervalMs)) {
        syncList(list.id, { silent: true }).catch(() => {});
      }
    }

    if (getSettings().checkCollisions || (getSettings().enableOtherEngines && getSettings().useDdgOfficial)) {
      const cache = getDdgCache();
      if (!cache.lastFetched || Date.now() - new Date(cache.lastFetched).getTime() > syncIntervalMs) {
        fetchDdgOfficial({ silent: true }).catch(() => {});
      }
    }
  }

})();