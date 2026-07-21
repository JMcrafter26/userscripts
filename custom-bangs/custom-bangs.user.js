// ==UserScript==
// @name         Custom DuckDuckGo Bangs
// @namespace    https://github.com/JMcrafter26/userscripts
// @version      1.0.0
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
// @connect      raw.githubusercontent.com
// @connect      gist.githubusercontent.com
// @connect      *
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'customBangs';       // [{id, name, trigger, url, example, comments}]
  const SYNC_URL_KEY = 'customBangsSyncUrl';
  const LAST_SYNC_KEY = 'customBangsLastSync';

  // ---------- Storage helpers ----------
  function getBangs() {
    try {
      return JSON.parse(GM_getValue(STORAGE_KEY, '[]'));
    } catch (e) {
      return [];
    }
  }
  function saveBangs(list) {
    GM_setValue(STORAGE_KEY, JSON.stringify(list));
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  // ---------- Bang matching & redirect (runs first, before UI code) ----------
  function tryRedirect() {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (!q) return false;

    // find a !token anywhere in the query (DDG allows bang at start or end)
    const match = q.match(/(^|\s)!(\S+)/);
    if (!match) return false;

    const trigger = match[2].toLowerCase();
    const bangs = getBangs();
    const bang = bangs.find(b => b.trigger.toLowerCase() === trigger);
    if (!bang) return false; // not one of ours -> let DDG handle its own bangs untouched

    // remaining query with the bang token stripped out
    const rest = q.replace(match[0], ' ').trim().replace(/\s+/g, ' ');
    const target = bang.url.includes('{{{s}}}')
      ? bang.url.replace(/\{\{\{s\}\}\}/g, encodeURIComponent(rest))
      : bang.url + encodeURIComponent(rest);

    location.replace(target);
    return true;
  }

  // Bail out early if we redirected — don't bother building the UI on this load.
  if (tryRedirect()) return;

  // ---------- Remote sync ----------
  function syncFromRemote(url, { silent = false } = {}) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url,
        nocache: true,
        onload: (res) => {
          try {
            const remote = JSON.parse(res.responseText);
            if (!Array.isArray(remote)) throw new Error('JSON is not an array');
            const normalized = remote.map(b => ({
              id: b.id || uid(),
              name: b.name || '',
              trigger: (b.trigger || '').replace(/^!/, ''),
              url: b.url || '',
              example: b.example || '',
              comments: b.comments || ''
            }));
            saveBangs(normalized);
            GM_setValue(LAST_SYNC_KEY, new Date().toISOString());
            if (!silent) GM_notification({ text: `Synced ${normalized.length} bangs`, title: 'Custom Bangs' });
            resolve(normalized);
          } catch (e) {
            if (!silent) GM_notification({ text: 'Sync failed: ' + e.message, title: 'Custom Bangs' });
            reject(e);
          }
        },
        onerror: (e) => {
          if (!silent) GM_notification({ text: 'Sync request failed', title: 'Custom Bangs' });
          reject(e);
        }
      });
    });
  }

  // ---------- UI ----------
  const STYLE = `
  .cb-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:999999;display:flex;
    align-items:flex-start;justify-content:center;padding:40px 16px;overflow:auto;font-family:-apple-system,system-ui,sans-serif;}
  .cb-modal{background:#181818;color:#eee;width:100%;max-width:720px;border-radius:12px;padding:24px;
    box-shadow:0 10px 40px rgba(0,0,0,.5);}
  .cb-modal h2{margin:0 0 16px;font-size:20px;}
  .cb-row{display:flex;gap:8px;margin-bottom:10px;align-items:center;}
  .cb-row input{flex:1;background:#111;border:1px solid #333;color:#eee;border-radius:8px;padding:8px 10px;font-size:14px;}
  .cb-row input.cb-trigger{flex:0 0 90px;}
  .cb-list{max-height:320px;overflow:auto;margin-bottom:16px;border:1px solid #2a2a2a;border-radius:8px;}
  .cb-item{display:flex;gap:8px;align-items:center;padding:8px 10px;border-bottom:1px solid #2a2a2a;}
  .cb-item:last-child{border-bottom:none;}
  .cb-item .cb-trig{color:#7ab7ff;font-weight:600;width:70px;flex-shrink:0;}
  .cb-item .cb-name{flex:1;color:#ccc;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .cb-item .cb-url{flex:2;color:#888;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .cb-btn{background:#2a2a2a;color:#eee;border:1px solid #3a3a3a;border-radius:8px;padding:6px 12px;
    font-size:13px;cursor:pointer;}
  .cb-btn:hover{background:#333;}
  .cb-btn.danger{color:#ff8080;}
  .cb-btn.primary{background:#3574f0;border-color:#3574f0;}
  .cb-section{margin-top:20px;padding-top:16px;border-top:1px solid #2a2a2a;}
  .cb-section h3{margin:0 0 10px;font-size:14px;color:#aaa;text-transform:uppercase;letter-spacing:.05em;}
  .cb-section textarea{width:100%;min-height:100px;background:#111;border:1px solid #333;color:#eee;
    border-radius:8px;padding:8px;font-family:monospace;font-size:12px;box-sizing:border-box;}
  .cb-flex{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;}
  .cb-close{position:absolute;top:16px;right:20px;cursor:pointer;color:#888;font-size:20px;background:none;border:none;}
  .cb-modal{position:relative;}
  .cb-small{color:#888;font-size:12px;margin-top:4px;}
  `;

  function injectStyle() {
    if (document.getElementById('cb-style')) return;
    const s = document.createElement('style');
    s.id = 'cb-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  function openManager() {
    injectStyle();
    let bangs = getBangs();
    let draft = { name: '', trigger: '', url: '', example: '' };

    const overlay = document.createElement('div');
    overlay.className = 'cb-overlay';
    overlay.innerHTML = `
      <div class="cb-modal">
        <button class="cb-close" title="Close">×</button>
        <h2>Custom Bangs</h2>

        <div class="cb-list" id="cb-list"></div>

        <div class="cb-section">
          <h3>Add a bang</h3>
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
          <h3>Import / Export</h3>
          <textarea id="cb-json" placeholder="[]"></textarea>
          <div class="cb-flex">
            <button class="cb-btn" id="cb-export">Export current list</button>
            <button class="cb-btn" id="cb-import">Import (replace list)</button>
          </div>
        </div>

        <div class="cb-section">
          <h3>Remote sync</h3>
          <div class="cb-row">
            <input id="cb-sync-url" placeholder="https://gist.githubusercontent.com/you/xxxx/raw/bangs.json" />
            <button class="cb-btn primary" id="cb-sync-now">Sync now</button>
          </div>
          <div class="cb-small" id="cb-sync-status"></div>
        </div>
      </div>
    `;
    document.documentElement.appendChild(overlay);

    const listEl = overlay.querySelector('#cb-list');
    const syncUrlInput = overlay.querySelector('#cb-sync-url');
    const syncStatus = overlay.querySelector('#cb-sync-status');
    syncUrlInput.value = GM_getValue(SYNC_URL_KEY, '');
    renderSyncStatus();

    function renderSyncStatus() {
      const last = GM_getValue(LAST_SYNC_KEY, '');
      syncStatus.textContent = last ? `Last synced: ${new Date(last).toLocaleString()}` : 'Never synced';
    }

    function render() {
      bangs = getBangs();
      if (!bangs.length) {
        listEl.innerHTML = '<div style="padding:16px;color:#666;font-size:13px;">No custom bangs yet.</div>';
        return;
      }
      listEl.innerHTML = bangs.map(b => `
        <div class="cb-item" data-id="${b.id}">
          <span class="cb-trig">!${b.trigger}</span>
          <span class="cb-name">${escapeHtml(b.name)}</span>
          <span class="cb-url">${escapeHtml(b.url)}</span>
          <button class="cb-btn" data-action="test">Test</button>
          <button class="cb-btn danger" data-action="delete">Delete</button>
        </div>
      `).join('');
    }

    function escapeHtml(str) {
      const d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }

    listEl.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const item = e.target.closest('.cb-item');
      const id = item.dataset.id;
      const bang = bangs.find(b => b.id === id);
      if (btn.dataset.action === 'delete') {
        saveBangs(bangs.filter(b => b.id !== id));
        render();
      } else if (btn.dataset.action === 'test') {
        const q = bang.example || 'test';
        const target = bang.url.includes('{{{s}}}')
          ? bang.url.replace(/\{\{\{s\}\}\}/g, encodeURIComponent(q))
          : bang.url + encodeURIComponent(q);
        window.open(target, '_blank');
      }
    });

    overlay.querySelector('#cb-add').addEventListener('click', () => {
      const trigger = overlay.querySelector('#cb-in-trigger').value.trim().replace(/^!/, '');
      const name = overlay.querySelector('#cb-in-name').value.trim();
      const url = overlay.querySelector('#cb-in-url').value.trim();
      const example = overlay.querySelector('#cb-in-example').value.trim();
      if (!trigger || !url) {
        alert('Bang command and Bang URL are required.');
        return;
      }
      if (!url.includes('{{{s}}}')) {
        if (!confirm('URL has no {{{s}}} placeholder — the query will just be appended to the end. Continue?')) return;
      }
      const list = getBangs();
      const existingIdx = list.findIndex(b => b.trigger.toLowerCase() === trigger.toLowerCase());
      const entry = { id: existingIdx >= 0 ? list[existingIdx].id : uid(), name, trigger, url, example };
      if (existingIdx >= 0) list[existingIdx] = entry; else list.push(entry);
      saveBangs(list);
      overlay.querySelector('#cb-in-trigger').value = '';
      overlay.querySelector('#cb-in-name').value = '';
      overlay.querySelector('#cb-in-url').value = '';
      overlay.querySelector('#cb-in-example').value = '';
      render();
    });

    overlay.querySelector('#cb-test').addEventListener('click', () => {
      const url = overlay.querySelector('#cb-in-url').value.trim();
      const example = overlay.querySelector('#cb-in-example').value.trim() || 'test';
      if (!url) return;
      const target = url.includes('{{{s}}}')
        ? url.replace(/\{\{\{s\}\}\}/g, encodeURIComponent(example))
        : url + encodeURIComponent(example);
      window.open(target, '_blank');
    });

    overlay.querySelector('#cb-export').addEventListener('click', () => {
      overlay.querySelector('#cb-json').value = JSON.stringify(getBangs(), null, 2);
    });

    overlay.querySelector('#cb-import').addEventListener('click', () => {
      const raw = overlay.querySelector('#cb-json').value.trim();
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('Expected a JSON array');
        const normalized = parsed.map(b => ({
          id: b.id || uid(),
          name: b.name || '',
          trigger: (b.trigger || '').replace(/^!/, ''),
          url: b.url || '',
          example: b.example || '',
          comments: b.comments || ''
        }));
        if (!confirm(`Replace your ${getBangs().length} current bangs with ${normalized.length} imported bangs?`)) return;
        saveBangs(normalized);
        render();
      } catch (e) {
        alert('Invalid JSON: ' + e.message);
      }
    });

    overlay.querySelector('#cb-sync-now').addEventListener('click', () => {
      const url = syncUrlInput.value.trim();
      if (!url) { alert('Enter a remote JSON URL first.'); return; }
      GM_setValue(SYNC_URL_KEY, url);
      syncFromRemote(url).then(() => { render(); renderSyncStatus(); }).catch(() => {});
    });

    overlay.querySelector('.cb-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });

    render();
  }

  // ---------- Menu commands ----------
  function registerMenu() {
    GM_registerMenuCommand('⚙️ Manage Custom Bangs', openManager);
    GM_registerMenuCommand('🔄 Sync bangs now', () => {
      const url = GM_getValue(SYNC_URL_KEY, '');
      if (!url) { alert('No sync URL set yet. Open "Manage Custom Bangs" to set one.'); return; }
      syncFromRemote(url);
    });
  }

  // UI only needs to exist once DOM/menu APIs are ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerMenu);
  } else {
    registerMenu();
  }

  // Optional: auto-sync once a day if a sync URL is set
  const last = GM_getValue(LAST_SYNC_KEY, '');
  const url = GM_getValue(SYNC_URL_KEY, '');
  if (url && (!last || Date.now() - new Date(last).getTime() > 24 * 60 * 60 * 1000)) {
    syncFromRemote(url, { silent: true }).catch(() => {});
  }

})();