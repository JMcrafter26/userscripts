// ==UserScript==
// @name         Custom DuckDuckGo Bangs
// @namespace    https://github.com/JMcrafter26/userscripts
// @version      1.1.0
// @description  Add your own !bangs to DuckDuckGo without touching DDG's built-in ones
// @author       Cufiy
// @downloadURL    https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js
// @updateURL      https://raw.githubusercontent.com/JMcrafter26/userscripts/main/custom-bangs/custom-bangs.user.js
// @match        https://duckduckgo.com/*
// @match        https://*.duckduckgo.com/*
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

  const OWN_KEY = 'customBangs';           // [{id, name, trigger, url, example}]
  const LISTS_KEY = 'externalLists';       // [{id, name, url, enabled, bangs:[{trigger,name,url}], lastSync}] — array order = priority
  const SETTINGS_KEY = 'cbSettings';       // {checkCollisions:true}
  const DDG_CACHE_KEY = 'ddgOfficialCache';// {bangs:[{trigger,name,url}], lastFetched}

  // ---------- Storage helpers ----------
  function getOwn() { try { return JSON.parse(GM_getValue(OWN_KEY, '[]')); } catch (e) { return []; } }
  function saveOwn(list) { GM_setValue(OWN_KEY, JSON.stringify(list)); }

  function getLists() { try { return JSON.parse(GM_getValue(LISTS_KEY, '[]')); } catch (e) { return []; } }
  function saveLists(list) { GM_setValue(LISTS_KEY, JSON.stringify(list)); }

  function getSettings() {
    try { return Object.assign({ checkCollisions: true }, JSON.parse(GM_getValue(SETTINGS_KEY, '{}'))); }
    catch (e) { return { checkCollisions: true }; }
  }
  function saveSettings(s) { GM_setValue(SETTINGS_KEY, JSON.stringify(s)); }

  function getDdgCache() {
    try { return JSON.parse(GM_getValue(DDG_CACHE_KEY, '{"bangs":[],"lastFetched":null}')); }
    catch (e) { return { bangs: [], lastFetched: null }; }
  }
  function saveDdgCache(c) { GM_setValue(DDG_CACHE_KEY, JSON.stringify(c)); }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  // ---------- Shared parser: handles both DDG's bang.js format and our own {trigger,name,url} ----------
  function normalizeRemoteBangs(rawText) {
    const data = JSON.parse(rawText);
    if (!Array.isArray(data)) throw new Error('Expected a JSON array');
    return data.map(item => {
      if (item.t !== undefined && item.u !== undefined) {
        // DDG bang.js format: t=trigger, u=url, s=site name
        return { trigger: String(item.t).replace(/^!/, '').toLowerCase(), name: item.s || item.t, url: item.u };
      }
      if (item.trigger !== undefined && item.url !== undefined) {
        return { trigger: String(item.trigger).replace(/^!/, '').toLowerCase(), name: item.name || item.trigger, url: item.url };
      }
      return null;
    }).filter(Boolean);
  }

  // ---------- Matching & redirect (runs first, before any UI code) ----------
  function findMatch(trigger) {
    const t = trigger.toLowerCase();

    const own = getOwn().find(b => b.trigger.toLowerCase() === t);
    if (own) return { source: 'own', bang: own };

    for (const list of getLists()) {
      if (!list.enabled) continue;
      const found = (list.bangs || []).find(b => b.trigger.toLowerCase() === t);
      if (found) return { source: 'list', listName: list.name, bang: found };
    }
    return null;
  }

  function buildTarget(url, rest) {
    return url.includes('{{{s}}}')
      ? url.replace(/\{\{\{s\}\}\}/g, encodeURIComponent(rest))
      : url + encodeURIComponent(rest);
  }

  function tryRedirect() {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (!q) return false;

    const match = q.match(/(^|\s)!(\S+)/);
    if (!match) return false;

    const trigger = match[2];
    const hit = findMatch(trigger);
    if (!hit) return false; // not ours -> let DDG handle its own bangs untouched

    const rest = q.replace(match[0], ' ').trim().replace(/\s+/g, ' ');
    location.replace(buildTarget(hit.bang.url, rest));
    return true;
  }

  if (tryRedirect()) return;

  // ---------- Remote sync: one custom list ----------
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
    align-items:flex-start;justify-content:center;padding:40px 16px;overflow:auto;font-family:-apple-system,system-ui,sans-serif;}
  .cb-modal{background:#181818;color:#eee;width:100%;max-width:780px;border-radius:12px;padding:24px;
    box-shadow:0 10px 40px rgba(0,0,0,.5);position:relative;}
  .cb-modal h2{margin:0 0 16px;font-size:20px;}
  .cb-row{display:flex;gap:8px;margin-bottom:10px;align-items:center;}
  .cb-row input{flex:1;background:#111;border:1px solid #333;color:#eee;border-radius:8px;padding:8px 10px;font-size:14px;}
  .cb-row input.cb-trigger{flex:0 0 90px;}
  .cb-list{max-height:260px;overflow:auto;margin-bottom:16px;border:1px solid #2a2a2a;border-radius:8px;}
  .cb-item{display:flex;gap:8px;align-items:center;padding:8px 10px;border-bottom:1px solid #2a2a2a;}
  .cb-item:last-child{border-bottom:none;}
  .cb-item .cb-trig{color:#7ab7ff;font-weight:600;width:70px;flex-shrink:0;}
  .cb-item .cb-name{flex:1;color:#ccc;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .cb-item .cb-url{flex:2;color:#888;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .cb-warn{color:#e0b040;font-size:12px;cursor:help;}
  .cb-btn{background:#2a2a2a;color:#eee;border:1px solid #3a3a3a;border-radius:8px;padding:6px 10px;
    font-size:13px;cursor:pointer;}
  .cb-btn:hover{background:#333;}
  .cb-btn.danger{color:#ff8080;}
  .cb-btn.primary{background:#3574f0;border-color:#3574f0;}
  .cb-btn:disabled{opacity:.35;cursor:default;}
  .cb-section{margin-top:20px;padding-top:16px;border-top:1px solid #2a2a2a;}
  .cb-section h3{margin:0 0 4px;font-size:14px;color:#aaa;text-transform:uppercase;letter-spacing:.05em;}
  .cb-section .cb-hint{color:#777;font-size:12px;margin-bottom:10px;}
  .cb-section textarea{width:100%;min-height:90px;background:#111;border:1px solid #333;color:#eee;
    border-radius:8px;padding:8px;font-family:monospace;font-size:12px;box-sizing:border-box;}
  .cb-flex{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;}
  .cb-close{position:absolute;top:16px;right:20px;cursor:pointer;color:#888;font-size:20px;background:none;border:none;}
  .cb-small{color:#888;font-size:12px;margin-top:4px;}
  .cb-listrow{display:flex;gap:8px;align-items:center;padding:10px;border-bottom:1px solid #2a2a2a;}
  .cb-listrow:last-child{border-bottom:none;}
  .cb-listrow.disabled{opacity:.45;}
  .cb-listrow .cb-lname{flex:1;min-width:0;}
  .cb-listrow .cb-lname .cb-ltitle{font-size:14px;color:#eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .cb-listrow .cb-lname .cb-lmeta{font-size:11px;color:#888;}
  .cb-order-badge{width:22px;height:22px;border-radius:6px;background:#222;display:flex;align-items:center;
    justify-content:center;font-size:11px;color:#888;flex-shrink:0;}
  .cb-toggle{width:16px;height:16px;flex-shrink:0;}
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
          </div>
          <div class="cb-row">
            <input id="cb-in-url" placeholder="https://github.com/search?q={{{s}}}" />
          </div>
          <div class="cb-row">
            <input id="cb-in-example" placeholder="Example search, e.g. userscripts" />
            <button class="cb-btn" id="cb-test">Test</button>
            <button class="cb-btn primary" id="cb-add">Add</button>
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
          <h3>Collision detection</h3>
          <div class="cb-row" style="margin-bottom:6px;">
            <input type="checkbox" id="cb-collision-toggle" style="flex:0 0 auto;width:16px;height:16px;" />
            <label for="cb-collision-toggle" style="font-size:13px;color:#ccc;">Warn when a bang collides with DuckDuckGo's official list</label>
          </div>
          <div class="cb-flex">
            <button class="cb-btn" id="cb-ddg-refresh">Refresh official DDG bang cache</button>
            <span class="cb-small" id="cb-ddg-status"></span>
          </div>
        </div>

        <div class="cb-section">
          <h3>Import / Export (your own bangs)</h3>
          <textarea id="cb-json" placeholder="[]"></textarea>
          <div class="cb-flex">
            <button class="cb-btn" id="cb-export">Export current list</button>
            <button class="cb-btn" id="cb-import">Import (replace list)</button>
          </div>
        </div>
      </div>
    `;
    document.documentElement.appendChild(overlay);

    const ownListEl = overlay.querySelector('#cb-own-list');
    const listsEl = overlay.querySelector('#cb-lists');
    const ddgStatusEl = overlay.querySelector('#cb-ddg-status');
    const collisionToggle = overlay.querySelector('#cb-collision-toggle');

    collisionToggle.checked = getSettings().checkCollisions;
    collisionToggle.addEventListener('change', () => {
      saveSettings(Object.assign(getSettings(), { checkCollisions: collisionToggle.checked }));
      renderOwn(); renderLists();
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
        return `
        <div class="cb-item" data-id="${b.id}">
          <span class="cb-trig">!${escapeHtml(b.trigger)}</span>
          <span class="cb-name">${escapeHtml(b.name)}</span>
          <span class="cb-url">${escapeHtml(b.url)}</span>
          ${warn}
          <button class="cb-btn" data-action="test">Test</button>
          <button class="cb-btn danger" data-action="delete">Delete</button>
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
        saveOwn(own.filter(b => b.id !== id));
        renderOwn(); renderLists();
      } else if (btn.dataset.action === 'test') {
        const q = bang.example || 'test';
        window.open(buildTarget(bang.url, q), '_blank');
      }
    });

    overlay.querySelector('#cb-add').addEventListener('click', () => {
      const trigger = overlay.querySelector('#cb-in-trigger').value.trim().replace(/^!/, '');
      const name = overlay.querySelector('#cb-in-name').value.trim();
      const url = overlay.querySelector('#cb-in-url').value.trim();
      const example = overlay.querySelector('#cb-in-example').value.trim();
      if (!trigger || !url) { alert('Bang command and Bang URL are required.'); return; }
      if (!url.includes('{{{s}}}') && !confirm('URL has no {{{s}}} placeholder — the query will just be appended. Continue?')) return;

      const list = getOwn();
      const existingIdx = list.findIndex(b => b.trigger.toLowerCase() === trigger.toLowerCase());
      const entry = { id: existingIdx >= 0 ? list[existingIdx].id : uid(), name, trigger, url, example };
      if (existingIdx >= 0) list[existingIdx] = entry; else list.push(entry);
      saveOwn(list);
      overlay.querySelector('#cb-in-trigger').value = '';
      overlay.querySelector('#cb-in-name').value = '';
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

    overlay.querySelector('#cb-export').addEventListener('click', () => {
      overlay.querySelector('#cb-json').value = JSON.stringify(getOwn(), null, 2);
    });

    overlay.querySelector('#cb-import').addEventListener('click', () => {
      const raw = overlay.querySelector('#cb-json').value.trim();
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('Expected a JSON array');
        const normalized = parsed.map(b => ({
          id: b.id || uid(), name: b.name || '', trigger: (b.trigger || '').replace(/^!/, ''),
          url: b.url || '', example: b.example || ''
        }));
        if (!confirm(`Replace your ${getOwn().length} current bangs with ${normalized.length} imported bangs?`)) return;
        saveOwn(normalized);
        renderOwn(); renderLists();
      } catch (e) { alert('Invalid JSON: ' + e.message); }
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
          <span class="cb-order-badge">${i + 1}</span>
          <input type="checkbox" class="cb-toggle" data-action="toggle" ${l.enabled ? 'checked' : ''} title="Enabled" />
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

  // ---------- Menu commands ----------
  function registerMenu() {
    GM_registerMenuCommand('⚙️ Manage Custom Bangs', openManager);
    GM_registerMenuCommand('🔄 Sync all external lists', () => {
      const lists = getLists();
      if (!lists.length) { alert('No external lists added yet.'); return; }
      Promise.all(lists.map(l => syncList(l.id, { silent: true })))
        .then(() => GM_notification({ text: `Synced ${lists.length} list(s)`, title: 'Custom Bangs' }));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerMenu);
  } else {
    registerMenu();
  }

  // ---------- Background auto-sync (once/day) ----------
  const DAY = 24 * 60 * 60 * 1000;

  for (const list of getLists()) {
    if (list.enabled && (!list.lastSync || Date.now() - new Date(list.lastSync).getTime() > DAY)) {
      syncList(list.id, { silent: true }).catch(() => {});
    }
  }

  if (getSettings().checkCollisions) {
    const cache = getDdgCache();
    if (!cache.lastFetched || Date.now() - new Date(cache.lastFetched).getTime() > DAY) {
      fetchDdgOfficial({ silent: true }).catch(() => {});
    }
  }

})();