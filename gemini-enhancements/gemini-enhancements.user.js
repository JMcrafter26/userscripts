// ==UserScript==
// @name         Gemini Chat Persist
// @author       Cufiy
// @namespace    local.gemini.persist
// @version      0.3.1
// @description  Saves Gemini chats locally on-device (GM_setValue), shows them right inside the real sidebar, can reopen a saved chat inline (same look as a real chat) and seamlessly continues it by re-injecting the hidden history when you reply. No export, no server, no API costs.
// @match        https://gemini.google.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  /* =========================================================================
   * CONFIG / SELECTORS
   * -------------------------------------------------------------------------
   * All selectors were taken from a real Gemini page (as of July 2026).
   * Google tends to change the DOM structure every few months.
   * If the script stops finding messages: open the Debug panel (💾 button ->
   * "Debug Info") to see what it currently finds, then just tweak the arrays
   * below - the first selector that matches something is used.
   * ======================================================================= */
  const SEL = {
    // Note: ".chat-history" matches MULTIPLE elements on the real page
    // (e.g. also the sidebar's "Activity disabled" notice). That's why we
    // try the unique data-test-id selector first (see findChatHistoryContainer).
    chatHistory: ['[data-test-id="chat-history-container"]', '.chat-history'],
    turn: ['.conversation-container'],
    userQueryText: ['user-query-content .query-text', 'user-query .query-text'],
    userQueryLine: ['.query-text-line'],
    modelMarkdown: ['message-content .markdown'],
    inputEditor: ['rich-textarea .ql-editor'],
    // Sidebar ("Recent conversations" list + individual chat rows).
    sidebarSection: ['[data-test-id="chats-expandable-section"]'],
    sidebarRow: ['gem-nav-list-item[data-test-id="conversation"]'],
    sidebarRowTitle: ['.title-text'],
    sidebarSectionTitle: ['.expandable-section-title'],
    // Per-row "pin" and "more options" (⋮) buttons inside a cloned sidebar
    // row. Matched by aria-label since the class names are the ones most
    // likely to rot with a Google redesign; case-insensitive to survive
    // locale/casing differences.
    rowPinButton: ['button[aria-label*="pin" i]'],
    rowMenuButton: ['button[aria-label*="options" i]', 'button[aria-label*="more" i]'],
  };

  // Class-name fragments (case-insensitive) that Gemini's own CSS uses on
  // ancestors of the input editor to render the big centered "new chat"
  // composer instead of the normal slim bottom-docked one. Not a real
  // selector list (position in the tree varies), so it's matched via
  // classList scanning in forceNormalComposerLayout() instead of qAll/q1.
  const EMPTY_STATE_CLASS_PATTERN = /(empty[-_]?state|landing|zero[-_]?state|welcome)/i;

  const DEBOUNCE_MS = 800;
  const STORAGE_INDEX_PREFIX = 'gp_index_u'; // + user id, e.g. gp_index_u1
  const STORAGE_CHAT_PREFIX = 'gp_chat_u'; // + user id + '_' + chat id
  const LEGACY_STORAGE_INDEX_KEY = 'gp_index'; // pre-0.3.0, single-account
  const LEGACY_STORAGE_CHAT_PREFIX = 'gp_chat_';
  const LEGACY_MIGRATION_FLAG = 'gp_migrated_v3';
  const TEMPLATE_TURN_STYLE_KEY = 'gp_tpl_turn_style';
  const TEMPLATE_ROW_KEY = 'gp_tpl_row';
  const TEMPLATE_SECTION_KEY = 'gp_tpl_section';

  /* =========================================================================
   * HELPERS
   * ======================================================================= */

  // Tries multiple selectors in order, returns the first match.
  function qAll(root, selectors) {
    for (const sel of selectors) {
      const found = root.querySelectorAll(sel);
      if (found.length) return found;
    }
    return [];
  }
  function q1(root, selectors) {
    for (const sel of selectors) {
      const found = root.querySelector(sel);
      if (found) return found;
    }
    return null;
  }

  // Special case for .chat-history: can match more than one element (e.g.
  // the sidebar's "Activity disabled" notice also carries this class). Pick
  // the candidate that actually contains conversation turns.
  function findChatHistoryContainer() {
    const unique = document.querySelector('[data-test-id="chat-history-container"]');
    if (unique) return unique;

    const candidates = document.querySelectorAll('.chat-history');
    for (const el of candidates) {
      if (el.querySelector('.conversation-container')) return el;
    }
    return candidates[0] || null;
  }

  function debounce(fn, ms) {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  /* -------------------------------------------------------------------------
   * TRUSTED TYPES
   * -------------------------------------------------------------------------
   * Gemini sets "require-trusted-types-for 'script'" via CSP. That forbids
   * assigning raw strings directly through .innerHTML = "..." (the browser
   * throws exactly the error you saw). We first try to register our own
   * policy; if the page doesn't allow that (e.g. because "trusted-types"
   * restricts which policy names may be created), we fall back to
   * DOMParser - that creates a separate document and is not itself a
   * "sink", so we can append the resulting nodes via appendChild afterwards.
   * ----------------------------------------------------------------------- */
  let ttPolicy = null;
  try {
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
      ttPolicy = window.trustedTypes.createPolicy('gemini-persist#html', {
        createHTML: (s) => s,
      });
    }
  } catch (e) {
    ttPolicy = null; // policy name not allowed, etc. -> fallback below kicks in
  }

  function clearElement(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  // Replaces the content of `el` with the HTML string `html` without using
  // the .innerHTML sink directly with a raw string (which Trusted Types
  // blocks).
  function setHTML(el, html) {
    clearElement(el);
    if (ttPolicy) {
      try {
        el.innerHTML = ttPolicy.createHTML(html);
        return;
      } catch (e) {
        // fall through to the fallback below
      }
    }
    try {
      const parsed = new DOMParser().parseFromString(
        '<!doctype html><body>' + html + '</body>',
        'text/html'
      );
      const frag = document.createDocumentFragment();
      Array.from(parsed.body.childNodes).forEach((n) => {
        frag.appendChild(document.importNode(n, true));
      });
      el.appendChild(frag);
    } catch (e) {
      // Last resort: plain text, so the UI doesn't stay empty.
      el.textContent = html;
    }
  }

  /* -------------------------------------------------------------------------
   * ACCOUNT / USER ID
   * -------------------------------------------------------------------------
   * Gemini URLs look like https://gemini.google.com/u/1/app/<id>?pageId=none
   * for a signed-in multi-account browser. The "/u/<n>/" segment identifies
   * which Google account is active in that tab. We read it fresh every time
   * (instead of caching) since the same tab can switch accounts. If the
   * segment is missing (can happen for the default account) we fall back to
   * "0", matching Google's own convention.
   * ----------------------------------------------------------------------- */
  function getUserIndex() {
    const m = location.pathname.match(/\/u\/(\d+)\//);
    return m ? m[1] : '0';
  }

  /* -------------------------------------------------------------------------
   * STORAGE (namespaced per Google account)
   * ----------------------------------------------------------------------- */
  function indexKey(uid) {
    return STORAGE_INDEX_PREFIX + uid;
  }
  function chatKey(uid, id) {
    return STORAGE_CHAT_PREFIX + uid + '_' + id;
  }

  function readIndex(uid) {
    try {
      return JSON.parse(GM_getValue(indexKey(uid), '[]'));
    } catch (e) {
      return [];
    }
  }
  function writeIndex(uid, list) {
    GM_setValue(indexKey(uid), JSON.stringify(list));
  }
  function readChat(uid, id) {
    try {
      return JSON.parse(GM_getValue(chatKey(uid, id), '[]'));
    } catch (e) {
      return [];
    }
  }
  function writeChat(uid, id, turns) {
    GM_setValue(chatKey(uid, id), JSON.stringify(turns));
  }
  function deleteChat(uid, id) {
    GM_deleteValue(chatKey(uid, id));
    writeIndex(uid, readIndex(uid).filter((c) => c.id !== id));
  }

  // One-off migration from the pre-0.3.0 single-account storage layout.
  // Everything that existed before gets assigned to account "0", since that
  // was the implicit account for anyone who only ever used one profile.
  function migrateLegacyStorage() {
    if (GM_getValue(LEGACY_MIGRATION_FLAG, false)) return;
    try {
      const legacyIndex = JSON.parse(GM_getValue(LEGACY_STORAGE_INDEX_KEY, '[]'));
      if (legacyIndex.length) {
        const uid = '0';
        const newIndex = readIndex(uid);
        legacyIndex.forEach((meta) => {
          const turns = JSON.parse(GM_getValue(LEGACY_STORAGE_CHAT_PREFIX + meta.id, '[]'));
          writeChat(uid, meta.id, turns);
          if (!newIndex.find((c) => c.id === meta.id)) newIndex.push(meta);
          GM_deleteValue(LEGACY_STORAGE_CHAT_PREFIX + meta.id);
        });
        writeIndex(uid, newIndex);
        GM_deleteValue(LEGACY_STORAGE_INDEX_KEY);
      }
    } catch (e) {
      // Nothing to migrate, or malformed legacy data - ignore.
    }
    GM_setValue(LEGACY_MIGRATION_FLAG, true);
  }

  /* =========================================================================
   * VISUAL STYLE FOR RECONSTRUCTED TURNS
   * -------------------------------------------------------------------------
   * Earlier versions cloned the outerHTML of a real turn/sidebar row and
   * relied on its classes + Angular's scoped "_ngcontent-*" attributes to
   * pick up the same CSS. That works ONLY within the page load it was
   * captured on: Angular assigns those "_ngcontent-*" ids at runtime as
   * components boot up, so the same component can get a DIFFERENT id on
   * every refresh. A template persisted from an earlier session therefore
   * silently stops matching any CSS rule on the next reload - which is
   * exactly the "looks fine right after saving, breaks after refresh" bug.
   *
   * Sidebar rows still try that trick opportunistically (see below) because
   * it's harmless there. For the actual message bubbles we no longer rely
   * on it at all: reconstructed turns are built with our OWN small,
   * self-contained inline-styled markup that can never break from a class
   * rename or a re-assigned scope id. We DO still snapshot a couple of
   * purely cosmetic computed-style values (background/text colour) from a
   * real bubble when one is visible, and use them instead of the hardcoded
   * defaults if available - this keeps the reconstructed bubbles roughly
   * on-theme without depending on anything structural.
   * ======================================================================= */
  let sidebarRowTemplateHTML = GM_getValue(TEMPLATE_ROW_KEY, null);
  let sidebarSectionTemplateHTML = GM_getValue(TEMPLATE_SECTION_KEY, null);
  let turnStyleSnapshot = (() => {
    try {
      return JSON.parse(GM_getValue(TEMPLATE_TURN_STYLE_KEY, 'null'));
    } catch (e) {
      return null;
    }
  })();

  const DEFAULT_BUBBLE_STYLE = { backgroundColor: 'rgba(255,255,255,0.08)', color: '#e3e3e3' };
  const DEFAULT_MODEL_STYLE = { color: '#e3e3e3' };

  // Set while WE are the ones inserting reconstructed nodes into the page,
  // so the style-learning code never accidentally learns from its own fake
  // output.
  let isReconstructing = false;

  function snapshotStyle(el) {
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { backgroundColor: cs.backgroundColor, color: cs.color };
  }

  // Picks a real value from the live snapshot, falling back to a sane
  // hardcoded default if we don't have one yet or it's transparent/unset.
  function pickColor(snapshotValue, fallback) {
    if (!snapshotValue) return fallback;
    if (snapshotValue === 'rgba(0, 0, 0, 0)' || snapshotValue === 'transparent') return fallback;
    return snapshotValue;
  }

  /* -------------------------------------------------------------------------
   * ICONS
   * -------------------------------------------------------------------------
   * Small inline SVGs (Material-Symbols-style outline paths, 24x24 viewBox)
   * used instead of emoji so reconstructed UI reads as real icons rather
   * than placeholder glyphs. All use currentColor / 1.5px stroke so they
   * inherit whatever text colour is set on their container/button.
   * ----------------------------------------------------------------------- */
  const ICON_PATHS = {
    thumbUp: 'M2 21h2a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H2v11zM22.83 12.32a2 2 0 0 0-1.83-1.32H15l1-4.5V6a1.5 1.5 0 0 0-1.5-1.5h-.34a1 1 0 0 0-.9.55L10.5 11H7v10h11.5a2 2 0 0 0 1.95-1.57l1.3-6a2 2 0 0 0-.92-1.11z',
    thumbDown: 'M22 3h-2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2V3zM2.17 11.68A2 2 0 0 0 4 13h6l-1 4.5V18a1.5 1.5 0 0 0 1.5 1.5h.34a1 1 0 0 0 .9-.55L13.5 13H17V3H5.5a2 2 0 0 0-1.95 1.57l-1.3 6a2 2 0 0 0 .92 1.11z',
    refresh: 'M17.65 6.35A7.95 7.95 0 0 0 12 4a8 8 0 1 0 7.75 10h-2.08A6 6 0 1 1 12 6a5.96 5.96 0 0 1 4.22 1.78L13 11h7V4z',
    copy: 'M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z',
    save: 'M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 6h9v4H6V6z',
  };

  function makeIcon(name, sizePx) {
    const size = sizePx || 18;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', String(size));
    svg.setAttribute('height', String(size));
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', ICON_PATHS[name] || '');
    svg.appendChild(path);
    return svg;
  }

  function captureTurnStyle(turnEl) {
    if (isReconstructing || turnEl.hasAttribute('data-gp-fake')) return;
    const bubbleEl = turnEl.querySelector('.user-query-bubble-with-background') || q1(turnEl, SEL.userQueryText);
    const modelEl = q1(turnEl, SEL.modelMarkdown);
    const snapshot = { bubble: snapshotStyle(bubbleEl), model: snapshotStyle(modelEl) };
    turnStyleSnapshot = snapshot;
    GM_setValue(TEMPLATE_TURN_STYLE_KEY, JSON.stringify(snapshot));
  }


  function captureSidebarTemplates() {
    if (isReconstructing) return;
    if (!sidebarSectionTemplateHTML) {
      const section = document.querySelector(SEL.sidebarSection[0]);
      if (section && !section.hasAttribute('data-gp-fake')) {
        sidebarSectionTemplateHTML = section.outerHTML;
        GM_setValue(TEMPLATE_SECTION_KEY, sidebarSectionTemplateHTML);
      }
    }
    if (!sidebarRowTemplateHTML) {
      const row = document.querySelector(SEL.sidebarRow[0]);
      if (row && !row.closest('[data-gp-fake]')) {
        sidebarRowTemplateHTML = row.outerHTML;
        GM_setValue(TEMPLATE_ROW_KEY, sidebarRowTemplateHTML);
      }
    }
  }

  /* -------------------------------------------------------------------------
   * CHAT ID
   * -------------------------------------------------------------------------
   * A brand-new chat has no ID in the URL yet (just "/app") - we use a
   * per-tab temporary ID for that case. But Google can ALSO swap a real ID
   * for another real ID mid-flow (observed: an interim ID gets replaced by
   * the final one once the conversation is fully established). Either way,
   * whenever the ID we see changes, we check whether the new content still
   * starts with the same first user message as the old id's stored content.
   * If so, it's the same conversation getting renamed - migrate the old
   * entry into the new id. If the first message differs, it's genuinely a
   * different conversation (e.g. "Continue with context" intentionally
   * starts a new chat) and both stay as separate saved entries.
   * ----------------------------------------------------------------------- */
  let sessionTempId = null;
  let lastKnownChatId = null;

  function migrateIfSameConversation(uid, oldId, newId, newTurns) {
    if (oldId === newId) return;
    const oldTurns = readChat(uid, oldId);
    if (!oldTurns.length) return;

    const oldFirstUser = oldTurns.find((t) => t.role === 'user');
    const newFirstUser = newTurns.find((t) => t.role === 'user');
    const sameConversation =
      oldFirstUser && newFirstUser && oldFirstUser.text === newFirstUser.text;

    if (!sameConversation) return; // a genuinely different conversation - keep both

    deleteChat(uid, oldId);
    // The fresh data for newId gets written right after by the normal
    // saveCurrentChat() flow that triggered this call.
  }

  // `currentTurns` is optional: pass the freshly extracted turns when calling
  // this as part of an actual save, so a same-conversation check can run.
  // Debug/display-only calls can omit it and won't affect the tracked state.
  function getChatId(currentTurns) {
    const m = location.pathname.match(/\/app\/([a-zA-Z0-9_-]+)/);
    let id;
    if (m) {
      id = m[1];
    } else {
      if (!sessionTempId) {
        sessionTempId = 'temp_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      }
      id = sessionTempId;
    }

    if (currentTurns) {
      const uid = getUserIndex();
      if (lastKnownChatId && id !== lastKnownChatId) {
        migrateIfSameConversation(uid, lastKnownChatId, id, currentTurns);
      }
      lastKnownChatId = id;
    }

    return id;
  }

  function getChatTitle() {
    const raw = document.title || 'Untitled chat';
    return raw.replace(/\s*-\s*Google Gemini\s*$/i, '').trim() || 'Untitled chat';
  }

  /* =========================================================================
   * EXTRACTION
   * ======================================================================= */

  let lastFoundCounts = { turns: 0, user: 0, model: 0 };

  function extractTurns() {
    const history = findChatHistoryContainer();
    if (!history) {
      lastFoundCounts = { turns: 0, user: 0, model: 0 };
      return [];
    }
    const turnEls = qAll(history, SEL.turn);
    const turns = [];
    let userCount = 0;
    let modelCount = 0;

    turnEls.forEach((turnEl) => {
      // Never read back our own reconstructed (fake) turns.
      if (turnEl.hasAttribute('data-gp-fake')) return;

      // User text: join multiple <p class="query-text-line"> lines together
      const userTextEl = q1(turnEl, SEL.userQueryText);
      let userText = '';
      if (userTextEl) {
        const lines = qAll(userTextEl, SEL.userQueryLine);
        if (lines.length) {
          userText = Array.from(lines).map((l) => l.textContent.trim()).join('\n');
        } else {
          userText = userTextEl.textContent.trim();
        }
      }
      if (userText) {
        userCount++;
        turns.push({ role: 'user', text: userText, html: null, ts: Date.now() });
      }

      // Model reply: rendered markdown HTML + plain text
      const modelEl = q1(turnEl, SEL.modelMarkdown);
      if (modelEl) {
        modelCount++;
        turns.push({
          role: 'model',
          text: modelEl.textContent.trim(),
          html: modelEl.innerHTML,
          ts: Date.now(),
        });
      }

      // Learn the real bubble/text colours so reconstructed saved chats can
      // stay roughly on-theme (see captureTurnStyle for why we no longer
      // clone the raw markup itself).
      if (userText || modelEl) captureTurnStyle(turnEl);
    });

    lastFoundCounts = { turns: turnEls.length, user: userCount, model: modelCount };
    return turns;
  }

  function saveCurrentChat() {
    const turns = extractTurns();
    if (!turns.length) return;

    const uid = getUserIndex();
    const id = getChatId(turns);
    writeChat(uid, id, turns);

    const index = readIndex(uid);
    const existing = index.find((c) => c.id === id);
    const meta = {
      id,
      user: uid,
      title: getChatTitle(),
      updated: Date.now(),
      turnCount: turns.length,
    };
    if (existing) {
      Object.assign(existing, meta);
    } else {
      index.push(meta);
    }
    writeIndex(uid, index);
    updateDebugPanel();
    refreshSidebarRows();
  }

  const debouncedSave = debounce(saveCurrentChat, DEBOUNCE_MS);

  /* =========================================================================
   * WATCHING FOR CHANGES
   * ======================================================================= */

  // Called on every chat-history mutation. Order matters: first check
  // whether this mutation is our own auto-resend finally landing (and if
  // so, clean up its visible text before anything else touches the DOM),
  // then run the normal save/extract flow - but never save while we're
  // still mid-reveal, so the ugly hidden-context text never ends up
  // persisted to storage.
  function onChatMutation() {
    revealRealSendIfPending();
    if (pendingRevealQuestion) return; // still waiting for the real turn to render
    if (pendingHistoryTurns) {
      // The real turn has rendered and been "revealed", but we're still
      // waiting for the reply to finish streaming before prepending the old
      // history above it - keep pushing that wait out on every mutation.
      scheduleHistoryPrepend();
      return;
    }
    debouncedSave();
  }

  // Deliberately observes document.body (not the specific chat-history
  // container) with subtree:true. The container element itself gets fully
  // destroyed and recreated by Angular when the URL changes from a brand
  // new chat (/app) to a real one (/app/<id>) - which happens exactly when
  // you reply to a saved chat. An observer attached to the OLD container
  // keeps watching a detached node forever after that and silently never
  // fires again, which is what was leaving pendingRevealQuestion /
  // pendingHistoryTurns stuck (see Debug Info) and the chat looking blank.
  // document.body itself is never replaced, so this is immune to that.
  function startObserving() {
    const observer = new MutationObserver(() => onChatMutation());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* =========================================================================
   * CONTEXT REINJECTION (manual - via the debug popup's "Continue" button)
   * ======================================================================= */

  function buildContextPrefix(turns) {
    const header =
      "Here is the conversation history from an earlier chat. " +
      "Please continue the conversation seamlessly, as if this chat were still running:\n\n---\n\n";
    const body = turns
      .map((t) => (t.role === 'user' ? 'Me: ' + t.text : 'Gemini: ' + t.text))
      .join('\n\n');
    return header + body + '\n\n---\n\n';
  }

  function injectIntoInput(text) {
    const editor = q1(document, SEL.inputEditor);
    if (!editor) return false;

    editor.focus();
    // contenteditable: insert as a single paragraph
    clearElement(editor);
    const p = document.createElement('p');
    p.textContent = text;
    editor.appendChild(p);
    editor.classList.remove('ql-blank');

    // Angular/Quill needs to be notified of the change -> fire an input event
    editor.dispatchEvent(new InputEvent('input', { bubbles: true }));
    return true;
  }

  function continueChatWithContext(turns, newQuestion) {
    const prefix = buildContextPrefix(turns);
    const fullText = prefix + 'New question: ' + newQuestion;

    const ok = injectIntoInput(fullText);
    if (ok) {
      toast('Context inserted. Check the text in the input field and send it.');
    } else {
      // Fallback: copy to clipboard if the input field wasn't found
      navigator.clipboard
        .writeText(fullText)
        .then(() => toast('Input field not found - copied the text to the clipboard instead.'))
        .catch(() => toast('Input field not found and clipboard copy failed too. See Debug Info.'));
    }
  }

  /* =========================================================================
   * INLINE RECONSTRUCTION
   * -------------------------------------------------------------------------
   * Turns a saved chat into real-looking DOM inside the actual chat area,
   * and seamlessly continues it: when the user replies, we transparently
   * prepend the hidden history to what actually gets sent to Gemini, then
   * strip that hidden part back out of the newly rendered message so only
   * the short new question stays visible - like Gemini's own "reopen past
   * chat" (App Activity) feature, just running fully locally.
   * ======================================================================= */

  // `activeSavedChat` is set while the visible chat area is showing a
  // reconstructed saved chat and no real reply has been sent yet.
  let activeSavedChat = null; // { id, turns, title }
  let awaitingAutoResend = false; // true while our own synthetic resend is in flight
  let pendingRevealQuestion = null; // short question to reveal once the real turn renders
  let lastPathForSavedView = null;
  // The saved-chat turns to visually re-attach ABOVE the real reply, once it
  // has fully rendered (see handleSavedChatSend / prependSavedHistory for
  // why this happens in two steps instead of just leaving the fake turns in
  // place the whole time).
  let pendingHistoryTurns = null;
  let revealSettleTimer = null;
  // When the current reveal/prepend flow started (Date.now()) - used by the
  // watchdog in watchForNavigationAway to detect a stuck flow (e.g. Gemini
  // erroring out, or a future DOM change we haven't adapted to yet) and
  // recover instead of leaving the chat permanently blank. Also doubles as
  // the saved chat's title for the recovery toast.
  let sendFlowStartedAt = null;
  let sendFlowTitle = null;
  const SEND_FLOW_TIMEOUT_MS = 25000;
  // Elements whose "empty state" class we temporarily stripped so the
  // composer displays normally while browsing a saved chat (see
  // forceNormalComposerLayout). Restored on exit / before a real send.
  let composerLayoutPatched = [];

  function groupTurnsIntoPairs(turns) {
    const pairs = [];
    let i = 0;
    while (i < turns.length) {
      const t = turns[i];
      if (t.role === 'user') {
        const next = turns[i + 1];
        if (next && next.role === 'model') {
          pairs.push({ user: t, model: next });
          i += 2;
        } else {
          pairs.push({ user: t, model: null });
          i += 1;
        }
      } else {
        // Orphan model turn (shouldn't normally happen) - render standalone.
        pairs.push({ user: null, model: t });
        i += 1;
      }
    }
    return pairs;
  }

  // Self-contained turn markup - no dependency on Angular classes or scoped
  // attributes at all, so it can never break just because the page reloaded
  // (see the big comment above captureTurnStyle for why that used to happen).
  function buildTurnNode(pair) {
    const node = document.createElement('div');
    node.setAttribute('data-gp-fake', 'turn');
    Object.assign(node.style, { margin: '32px 0', maxWidth: '100%' });

    if (pair.user) {
      const bubbleColor = turnStyleSnapshot
        ? pickColor(turnStyleSnapshot.bubble && turnStyleSnapshot.bubble.backgroundColor, DEFAULT_BUBBLE_STYLE.backgroundColor)
        : DEFAULT_BUBBLE_STYLE.backgroundColor;
      const bubbleTextColor = turnStyleSnapshot
        ? pickColor(turnStyleSnapshot.bubble && turnStyleSnapshot.bubble.color, DEFAULT_BUBBLE_STYLE.color)
        : DEFAULT_BUBBLE_STYLE.color;

      const userRow = document.createElement('div');
      Object.assign(userRow.style, { display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' });

      const bubble = document.createElement('div');
      Object.assign(bubble.style, {
        display: 'inline-block', maxWidth: '70%', padding: '12px 20px',
        borderRadius: '24px', backgroundColor: bubbleColor, color: bubbleTextColor,
        fontSize: '16px', lineHeight: '1.5', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      });
      pair.user.text.split('\n').forEach((line, i) => {
        if (i > 0) bubble.appendChild(document.createElement('br'));
        bubble.appendChild(document.createTextNode(line));
      });

      userRow.appendChild(bubble);
      node.appendChild(userRow);
    }

    if (pair.model) {
      const modelTextColor = turnStyleSnapshot
        ? pickColor(turnStyleSnapshot.model && turnStyleSnapshot.model.color, DEFAULT_MODEL_STYLE.color)
        : DEFAULT_MODEL_STYLE.color;

      const modelWrap = document.createElement('div');
      Object.assign(modelWrap.style, { color: modelTextColor, fontSize: '16px', lineHeight: '1.6' });
      setHTML(modelWrap, pair.model.html || escapeHtml(pair.model.text));
      node.appendChild(modelWrap);

      // A row of inert-but-recognizable action icons, matching the real
      // layout, so it doesn't look visually "unfinished" - clicking any of
      // them just explains that it's a local reconstruction.
      const actionsRow = document.createElement('div');
      Object.assign(actionsRow.style, { display: 'flex', gap: '4px', marginTop: '8px', opacity: '0.7' });
      ['thumbUp', 'thumbDown', 'refresh', 'copy'].forEach((iconName) => {
        const btn = document.createElement('button');
        btn.appendChild(makeIcon(iconName, 18));
        Object.assign(btn.style, {
          border: 'none', background: 'none', color: 'inherit', cursor: 'pointer',
          padding: '6px', borderRadius: '999px', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
        });
        btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(128,128,128,0.15)'; });
        btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; });
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toast('This is a locally reconstructed saved chat - this action is not available here.');
        });
        actionsRow.appendChild(btn);
      });
      node.appendChild(actionsRow);
    }

    return node;
  }

  /* -------------------------------------------------------------------------
   * NON-DESTRUCTIVE CONTAINER HANDLING
   * -------------------------------------------------------------------------
   * We used to call clearElement() on the REAL chat-history container before
   * dropping our reconstructed turns in. That's what was causing the "reply
   * never renders, not even the user's own message bubble, forever" bug:
   * Angular's structural directives (*ngFor/*ngIf) leave invisible anchor
   * comment nodes inside that exact container to track where to render
   * things, EVEN WHEN IT'S EMPTY. Deleting all of the container's children
   * deletes those anchors too, and once they're gone Angular has lost its
   * own bookkeeping for that container and can never render a real turn
   * into it again - the send still goes out fine (hence the "stop
   * generating" button correctly appearing), but nothing can ever paint.
   * The fix: never remove the container's existing children. Only HIDE them
   * (display:none, restorable) and add our own reconstructed turns as one
   * separate wrapper <div> alongside them - Angular's own nodes, anchors
   * included, stay untouched underneath the whole time.
   * ----------------------------------------------------------------------- */
  let hiddenRealChildren = []; // { el, prevDisplay } - restored via restoreHiddenContainerChildren

  function hideExistingContainerChildren(container) {
    hiddenRealChildren = [];
    Array.from(container.children).forEach((child) => {
      if (child.hasAttribute('data-gp-fake')) return;
      hiddenRealChildren.push({ el: child, prevDisplay: child.style.display });
      child.style.display = 'none';
    });
  }

  function restoreHiddenContainerChildren() {
    hiddenRealChildren.forEach(({ el, prevDisplay }) => {
      el.style.display = prevDisplay || '';
    });
    hiddenRealChildren = [];
  }

  function removeFakeHistoryWrapper(container) {
    const wrapper = container && container.querySelector('[data-gp-fake="wrapper"]');
    if (wrapper) wrapper.remove();
  }

  function buildFakeHistoryWrapper(turns) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-gp-fake', 'wrapper');
    const pairs = groupTurnsIntoPairs(turns);
    pairs.forEach((pair) => {
      const node = buildTurnNode(pair);
      if (node) wrapper.appendChild(node);
    });
    return wrapper;
  }

  /* -------------------------------------------------------------------------
   * COMPOSER LAYOUT
   * -------------------------------------------------------------------------
   * On a brand-new chat, Gemini shows a big centered "empty state" composer
   * (different background, position, size) instead of the normal slim
   * bottom-docked one. Which one shows is driven by Angular's own internal
   * state (has a real message been sent?), not by how many DOM nodes happen
   * to sit in the chat-history container - so just inserting our fake turns
   * there doesn't make it switch. We can't flip Angular's actual state, but
   * we CAN cosmetically force the swap by stripping whichever "empty state"
   * class is keeping the big composer active, so a saved chat you're just
   * browsing (not replying to yet) doesn't look like a blank new chat.
   * This is a best-effort visual patch, not a functional fix - if it stops
   * matching after a Google redesign, open Debug Info to see how many
   * elements it patched (0 = the class name changed, tweak
   * EMPTY_STATE_CLASS_PATTERN at the top of the file).
   * ----------------------------------------------------------------------- */
  function forceNormalComposerLayout() {
    const editor = q1(document, SEL.inputEditor);
    if (!editor) return;
    const touched = [];
    let el = editor;
    for (let i = 0; i < 8 && el; i++, el = el.parentElement) {
      if (!el.classList || !el.classList.length) continue;
      const hit = Array.from(el.classList).filter((c) => EMPTY_STATE_CLASS_PATTERN.test(c));
      if (hit.length) {
        touched.push({ el, classes: hit });
        hit.forEach((c) => el.classList.remove(c));
      }
    }
    composerLayoutPatched = touched;
  }

  function restoreComposerLayout() {
    composerLayoutPatched.forEach(({ el, classes }) => classes.forEach((c) => el.classList.add(c)));
    composerLayoutPatched = [];
  }

  function openSavedChatInline(id) {
    const uid = getUserIndex();
    const turns = readChat(uid, id);
    const meta = readIndex(uid).find((c) => c.id === id);
    if (!turns.length) {
      toast('This saved chat has no content.');
      return;
    }

    const container = findChatHistoryContainer();
    if (!container) {
      toast('Chat area not found.');
      return;
    }

    // Cancel any leftover deferred-prepend from a previous saved chat we
    // might have been mid-flight on (shouldn't normally happen, but avoids
    // a stale timer landing history from chat A on top of chat B).
    clearTimeout(revealSettleTimer);
    pendingHistoryTurns = null;
    sendFlowStartedAt = null;
    sendFlowTitle = null;

    // Hide (never remove) whatever Angular already has in this container -
    // e.g. the "new chat" welcome/suggestions - so its own anchor nodes
    // stay intact and it can still render into this container later. Any
    // previously-hidden real children from an earlier open are restored
    // first so we don't stack hides across multiple opens.
    removeFakeHistoryWrapper(container);
    restoreHiddenContainerChildren();
    hideExistingContainerChildren(container);

    isReconstructing = true;
    container.appendChild(buildFakeHistoryWrapper(turns));
    isReconstructing = false;

    activeSavedChat = { id, turns, title: meta ? meta.title : 'Saved chat' };
    pendingRevealQuestion = null;
    lastPathForSavedView = location.pathname;

    forceNormalComposerLayout();

    container.scrollTop = container.scrollHeight;
    closeOverlay();
    toast('Showing saved chat "' + (meta ? meta.title : id) + '". Reply normally to continue it.');
  }

  function exitSavedChatView() {
    const container = findChatHistoryContainer();
    if (container) removeFakeHistoryWrapper(container);
    restoreHiddenContainerChildren();
    clearTimeout(revealSettleTimer);
    pendingHistoryTurns = null;
    sendFlowStartedAt = null;
    sendFlowTitle = null;
    activeSavedChat = null;
    pendingRevealQuestion = null;
    restoreComposerLayout();
    toast('Exited saved chat view.');
  }

  // Detects if a keydown/click is the user trying to send a message.
  function isSendTrigger(e) {
    if (e.type === 'keydown') {
      return e.key === 'Enter' && !e.shiftKey && !e.isComposing;
    }
    if (e.type === 'click') {
      const btn = e.target.closest('button');
      if (!btn) return false;
      const label = (btn.getAttribute('aria-label') || '').toLowerCase();
      return label.includes('send') || label.includes('senden');
    }
    return false;
  }

  // Runs BEFORE Angular's own handlers (capture phase on document), so we
  // can rewrite the input before the real send happens.
  function attachSendInterceptor() {
    ['keydown', 'click'].forEach((type) => {
      document.addEventListener(
        type,
        (e) => {
          if (!activeSavedChat) return;
          if (awaitingAutoResend) return; // this is our own synthetic resend - let it through

          const editor = q1(document, SEL.inputEditor);
          if (type === 'keydown' && (!editor || !editor.contains(e.target))) return;
          if (!isSendTrigger(e)) return;

          e.preventDefault();
          e.stopImmediatePropagation();
          handleSavedChatSend(editor);
        },
        true // capture
      );
    });
  }

  function handleSavedChatSend(editorArg) {
    const editor = editorArg || q1(document, SEL.inputEditor);
    if (!editor) return;
    const question = editor.textContent.trim();
    if (!question) return;

    const prefix = buildContextPrefix(activeSavedChat.turns);
    const fullText = prefix + 'New question: ' + question;

    // IMPORTANT: remove our fake reconstructed wrapper AND restore whatever
    // real (Angular-owned) children were hidden underneath it, BEFORE the
    // real send happens - Angular renders the new user turn + streamed
    // reply into this exact container using its own anchor nodes, which we
    // never touched (see the NON-DESTRUCTIVE CONTAINER HANDLING comment
    // above buildFakeHistoryWrapper). We stash the turns in
    // pendingHistoryTurns and visually re-attach them above the real reply
    // afterwards, once it's actually finished rendering (see
    // revealRealSendIfPending / scheduleHistoryPrepend) - this is the
    // "blank chat, paste context, prepend history after" approach.
    pendingHistoryTurns = activeSavedChat.turns;
    pendingRevealQuestion = question;
    sendFlowStartedAt = Date.now();
    sendFlowTitle = activeSavedChat.title;

    const container = findChatHistoryContainer();
    if (container) removeFakeHistoryWrapper(container);
    restoreHiddenContainerChildren();
    // Let Angular's own send flow handle the empty->normal composer
    // transition itself from here on, same as any real first message.
    restoreComposerLayout();

    injectIntoInput(fullText);

    // Give Quill/Angular a tick to pick up the injected input event before
    // triggering the real send ourselves.
    setTimeout(() => {
      awaitingAutoResend = true;
      triggerRealSend();
      setTimeout(() => {
        awaitingAutoResend = false;
      }, 500);
    }, 50);
  }

  function triggerRealSend() {
    const editor = q1(document, SEL.inputEditor);
    if (editor) {
      editor.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, cancelable: true })
      );
      return;
    }
    const btn = Array.from(document.querySelectorAll('button')).find((b) => {
      const label = (b.getAttribute('aria-label') || '').toLowerCase();
      return label.includes('send') || label.includes('senden');
    });
    if (btn) btn.click();
  }

  // Once the real (Gemini-rendered) turn with the hidden context lands in
  // the DOM, strip the hidden part back out so only the short new question
  // stays visible - this is the "hide it afterwards so it stays seamless"
  // step.
  function revealRealSendIfPending() {
    if (!pendingRevealQuestion) return;
    const container = findChatHistoryContainer();
    if (!container) return;
    const turnEls = qAll(container, SEL.turn);
    for (let i = turnEls.length - 1; i >= 0; i--) {
      const turnEl = turnEls[i];
      if (turnEl.hasAttribute('data-gp-fake')) continue; // skip our reconstructed turns
      const userTextEl = q1(turnEl, SEL.userQueryText);
      if (!userTextEl) continue;
      const text = userTextEl.textContent;
      if (text.includes('New question:') && text.includes(pendingRevealQuestion)) {
        clearElement(userTextEl);
        const p = document.createElement('p');
        p.className = 'query-text-line ng-star-inserted';
        p.textContent = pendingRevealQuestion;
        userTextEl.appendChild(p);
        pendingRevealQuestion = null;
        // Don't prepend the old history yet - the reply is likely still
        // streaming in. Wait for things to go quiet first (see
        // scheduleHistoryPrepend, called from onChatMutation while
        // pendingHistoryTurns is set).
        scheduleHistoryPrepend();
        break;
      }
    }
  }

  // Debounces the history-prepend until the DOM around the new reply has
  // stopped changing for a bit, i.e. it's done streaming. Called repeatedly
  // from onChatMutation while we're waiting, so every new chunk of the
  // streamed reply pushes the timer back out.
  function scheduleHistoryPrepend() {
    if (!pendingHistoryTurns) return;
    clearTimeout(revealSettleTimer);
    revealSettleTimer = setTimeout(prependSavedHistory, 1200);
  }

  // Visually re-attaches the old saved-chat turns above the now-real,
  // fully-rendered reply. This runs AFTER the real send/render finished
  // cleanly (see handleSavedChatSend for why we clear the fake nodes out
  // before sending in the first place).
  function prependSavedHistory() {
    if (!pendingHistoryTurns) return;
    const container = findChatHistoryContainer();
    if (!container) return; // will retry on the next mutation/tick if this fires too early
    const turns = pendingHistoryTurns;
    pendingHistoryTurns = null; // clear first - inserting nodes below triggers a mutation too

    isReconstructing = true;
    container.insertBefore(buildFakeHistoryWrapper(turns), container.firstChild);
    isReconstructing = false;

    // The conversation is now live and self-contained on Google's side -
    // stop hijacking further sends in this chat.
    activeSavedChat = null;
    sendFlowStartedAt = null;
    sendFlowTitle = null;
  }

  // Recovers from a send flow that never completed (reveal or prepend stuck
  // for too long - e.g. Gemini errored out, or some future DOM change we
  // haven't adapted to yet). Rather than silently staying stuck forever
  // (which also kept intercepting every subsequent Enter keypress as if it
  // were another reply to the saved chat), we give up, put the saved chat's
  // history back on screen so nothing looks blank/lost, and let the person
  // know via a toast + Debug Info.
  function recoverStuckSendFlow() {
    const title = sendFlowTitle;
    const turns = pendingHistoryTurns;
    clearTimeout(revealSettleTimer);
    pendingRevealQuestion = null;
    pendingHistoryTurns = null;
    activeSavedChat = null;
    sendFlowStartedAt = null;
    sendFlowTitle = null;
    restoreComposerLayout();

    const container = findChatHistoryContainer();
    if (container && turns) {
      // Same rule as everywhere else now: never clearElement() the real
      // container (it would delete Angular's own anchor nodes and brick
      // this chat's ability to ever render a reply again) - just hide
      // whatever's there (which might genuinely be a real reply that's
      // still mid-stream) and lay our reconstructed view on top of it.
      removeFakeHistoryWrapper(container);
      restoreHiddenContainerChildren();
      hideExistingContainerChildren(container);
      isReconstructing = true;
      container.appendChild(buildFakeHistoryWrapper(turns));
      isReconstructing = false;
    }
    toast(
      'Gemini\u2019s reply to "' + (title || 'your saved chat') + '" didn\u2019t come through in time, ' +
      'so this restored the saved view instead of leaving it blank. Check Debug Info, and Gemini\u2019s ' +
      'own chat list/network tab, to see if the message actually sent.'
    );
  }

  // If the user navigates away to a different (real) chat while a saved
  // chat is open, drop out of saved-chat mode so we stop intercepting sends.
  // NOTE: we deliberately do NOT reset state here while a send we triggered
  // ourselves is still in flight (pendingRevealQuestion / pendingHistoryTurns
  // set) - Gemini's own SPA changes the URL from /app to /app/<realId> as a
  // normal side effect of that first real send, which used to look
  // indistinguishable from the user manually clicking away, and reset our
  // reveal/prepend state before it ever got to run.
  function watchForNavigationAway() {
    setInterval(() => {
      const midOwnSendFlow = pendingRevealQuestion || pendingHistoryTurns;
      if (midOwnSendFlow && sendFlowStartedAt && Date.now() - sendFlowStartedAt > SEND_FLOW_TIMEOUT_MS) {
        recoverStuckSendFlow();
      } else if (activeSavedChat && !midOwnSendFlow && location.pathname !== lastPathForSavedView) {
        activeSavedChat = null;
        pendingRevealQuestion = null;
      }
      updateExitButtonVisibility();
    }, 1000);
  }

  /* =========================================================================
   * SIDEBAR INTEGRATION
   * -------------------------------------------------------------------------
   * Adds a second "Saved chats (local)" section right below Gemini's own
   * "Recent conversations" section, built from a cloned copy of that same
   * section's markup so it inherits the exact same styling.
   * ======================================================================= */

  // Clones the real "Recent conversations" section as a styling template,
  // when one exists to clone from at all (see buildHandcraftedSection for
  // why it might not).
  function buildClonedSection() {
    if (!sidebarSectionTemplateHTML) return null;
    const wrapper = document.createElement('div');
    setHTML(wrapper, sidebarSectionTemplateHTML);
    const section = wrapper.firstElementChild;
    if (!section) return null;
    section.setAttribute('data-gp-fake', 'section');

    const titleEl = q1(section, SEL.sidebarSectionTitle);
    if (titleEl) titleEl.textContent = 'Saved chats (local)';

    // Avoid id/aria-controls collisions with the real section we cloned from.
    section.querySelectorAll('[id]').forEach((el) => {
      el.id = 'gp-' + el.id;
    });
    section.querySelectorAll('[aria-controls]').forEach((el) => {
      el.setAttribute('aria-controls', 'gp-' + el.getAttribute('aria-controls'));
    });

    return section;
  }

  // Hand-built section that doesn't depend on any real markup existing at
  // all. This is the important fallback: if "Activity in Gemini Apps" is
  // turned off (as it will be for most people who actually want this
  // script), Google never renders a "Recent conversations" section in the
  // first place - so there's nothing to clone from, ever. Styled inline to
  // roughly match the dark sidebar theme so it doesn't look out of place.
  function buildHandcraftedSection() {
    const section = document.createElement('div');
    section.setAttribute('data-gp-fake', 'section');
    Object.assign(section.style, { padding: '4px 0 8px' });

    const header = document.createElement('div');
    header.textContent = 'Saved chats (local)';
    Object.assign(header.style, {
      padding: '8px 16px 4px', fontSize: '12px', fontWeight: '500',
      color: 'rgba(232,234,237,0.6)', letterSpacing: '.01em',
    });
    section.appendChild(header);

    const list = document.createElement('div');
    list.setAttribute('data-gp-row-list', '1');
    section.appendChild(list);

    return section;
  }

  function buildHandcraftedRow(meta) {
    const row = document.createElement('div');
    row.setAttribute('data-gp-fake', 'row');
    row.setAttribute('data-gp-id', meta.id);
    Object.assign(row.style, {
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '8px 16px', margin: '0 8px', borderRadius: '20px',
      fontSize: '13px', color: 'rgba(232,234,237,0.85)', cursor: 'pointer',
      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      transition: 'background-color .1s ease',
    });
    row.addEventListener('mouseenter', () => {
      row.style.backgroundColor = 'rgba(232,234,237,0.08)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.backgroundColor = 'transparent';
    });

    const icon = makeIcon('save', 13);
    icon.style.flexShrink = '0';
    icon.style.opacity = '0.75';
    row.appendChild(icon);

    const title = document.createElement('span');
    title.textContent = meta.title;
    Object.assign(title.style, { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
    row.appendChild(title);

    row.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openSavedChatInline(meta.id);
    });

    return row;
  }

  // Cleans up a row cloned from the real sidebar template (see the big
  // comment above captureTurnStyle for why a cloned template's OWN scoped
  // CSS can silently stop applying after a reload): hides the pin toggle
  // (there's no working pin behaviour behind a fake row anyway, and it was
  // rendering as a stray full-width row instead of an inline icon), forces
  // the row and its trailing "⋮" button back onto one line regardless of
  // whether the button's own styling still applies, and swaps whatever
  // leading icon/avatar the real row had (which may depend on state we
  // don't have, e.g. conversation type) for our own so it's at least
  // consistently correct rather than occasionally wrong.
  function sanitizeClonedRow(row) {
    Object.assign(row.style, { display: 'flex', alignItems: 'center', gap: row.style.gap || '10px' });

    const pinBtn = q1(row, SEL.rowPinButton);
    if (pinBtn) pinBtn.style.display = 'none';

    const menuBtn = q1(row, SEL.rowMenuButton);
    if (menuBtn) {
      menuBtn.style.flexShrink = '0';
      menuBtn.style.marginLeft = 'auto';
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toast('This is a locally reconstructed saved chat - this action is not available here.');
      });
    }

    const icon = q1(row, ['svg', 'mat-icon', 'img']);
    if (icon) {
      const replacement = makeIcon('save', 13);
      replacement.style.flexShrink = '0';
      replacement.style.opacity = '0.75';
      icon.replaceWith(replacement);
    }
  }

  function renderSidebarRows(section) {
    const rowParent = section.querySelector('[data-gp-row-list]') || section;
    clearElement(rowParent);

    const uid = getUserIndex();
    const index = readIndex(uid).sort((a, b) => b.updated - a.updated);

    if (!index.length) {
      const empty = document.createElement('div');
      empty.textContent = 'No saved chats yet for this account.';
      Object.assign(empty.style, { padding: '4px 16px 8px', fontSize: '12px', color: 'rgba(232,234,237,0.5)' });
      rowParent.appendChild(empty);
      return;
    }

    index.forEach((meta) => {
      let row;
      if (sidebarRowTemplateHTML) {
        const rowWrapper = document.createElement('div');
        setHTML(rowWrapper, sidebarRowTemplateHTML);
        row = rowWrapper.firstElementChild;
        if (row) {
          row.setAttribute('data-gp-fake', 'row');
          row.setAttribute('data-gp-id', meta.id);
          const link = q1(row, ['a']);
          if (link) {
            link.removeAttribute('href'); // we handle opening ourselves, no page navigation
            link.setAttribute('aria-label', meta.title);
          }
          const titleEl = q1(row, SEL.sidebarRowTitle);
          if (titleEl) titleEl.textContent = meta.title;
          sanitizeClonedRow(row);
          row.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSavedChatInline(meta.id);
          });
        }
      }
      if (!row) row = buildHandcraftedRow(meta);
      rowParent.appendChild(row);
    });
  }

  // Finds a stable place in the sidebar to mount our section, whether or
  // not the real "Recent conversations" section exists on this account.
  function findSidebarAnchor() {
    const realSection = document.querySelector(SEL.sidebarSection[0]);
    if (realSection && realSection.parentElement) return realSection;

    // Activity disabled -> no real section to anchor to. Anchor after the
    // "Notebooks" block instead, found by its visible text rather than a
    // guessed class name (the word "Notebooks" appears to stay untranslated
    // across locales in the product, unlike most other sidebar labels).
    const textNodes = Array.from(document.querySelectorAll('a, button, div, span, p'));
    const notebooksLabel = textNodes.find(
      (el) => el.children.length === 0 && el.textContent.trim() === 'Notebooks'
    );
    if (!notebooksLabel) return null;

    // Walk up a few levels from the plain text label to a section-sized
    // wrapper (has its own siblings in the sidebar), not the whole sidebar.
    let el = notebooksLabel;
    for (let i = 0; i < 4 && el.parentElement && el.parentElement.children.length <= 2; i++) {
      el = el.parentElement;
    }
    return el.parentElement ? el : null;
  }

  function mountSidebarSection() {
    const already = document.querySelector('[data-gp-fake="section"]');
    if (already) {
      renderSidebarRows(already);
      return;
    }

    const anchor = findSidebarAnchor();
    if (!anchor || !anchor.parentElement) return; // nowhere sensible to mount yet, retry later

    isReconstructing = true;
    const section = buildClonedSection() || buildHandcraftedSection();
    isReconstructing = false;

    renderSidebarRows(section);
    anchor.parentElement.insertBefore(section, anchor.nextSibling);
  }

  function refreshSidebarRows() {
    const section = document.querySelector('[data-gp-fake="section"]');
    if (section) renderSidebarRows(section);
  }

  function pollSidebar() {
    setInterval(() => {
      captureSidebarTemplates();
      mountSidebarSection();
    }, 2000);
  }

  /* =========================================================================
   * UI: floating button, list, reconstruction, debug panel
   * ======================================================================= */

  function toast(msg) {
    const el = document.createElement('div');
    el.textContent = msg;
    Object.assign(el.style, {
      position: 'fixed', bottom: '90px', right: '20px', maxWidth: '280px',
      background: '#1f1f1f', color: '#fff', padding: '10px 14px',
      borderRadius: '10px', fontSize: '13px', zIndex: 999999,
      boxShadow: '0 2px 10px rgba(0,0,0,.3)',
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  function closeOverlay() {
    const existing = document.getElementById('gp-overlay');
    if (existing) existing.remove();
  }

  function baseOverlay(innerHtml) {
    closeOverlay();
    const overlay = document.createElement('div');
    overlay.id = 'gp-overlay';
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', background: 'rgba(0,0,0,.6)',
      zIndex: 999998, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'center',
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeOverlay();
    });

    const panel = document.createElement('div');
    Object.assign(panel.style, {
      background: '#fff', color: '#1f1f1f', width: '100%', maxWidth: '600px',
      maxHeight: '85vh', overflowY: 'auto', borderRadius: '16px 16px 0 0',
      padding: '16px', fontFamily: 'system-ui, sans-serif', fontSize: '14px',
    });
    setHTML(panel, innerHtml);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    return panel;
  }

  function renderChatList() {
    const uid = getUserIndex();
    const index = readIndex(uid).sort((a, b) => b.updated - a.updated);
    const rows = index
      .map(
        (c) => `
        <div class="gp-row" data-id="${c.id}" style="padding:12px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center;cursor:pointer;">
          <div>
            <div style="font-weight:600;">${escapeHtml(c.title)}</div>
            <div style="color:#666;font-size:12px;">${new Date(c.updated).toLocaleString()} · ${c.turnCount} messages</div>
          </div>
          <button class="gp-del" data-id="${c.id}" style="border:none;background:none;color:#c33;font-size:16px;">✕</button>
        </div>`
      )
      .join('');

    const panel = baseOverlay(`
      <h3 style="margin:0 0 4px;">Saved chats (${index.length})</h3>
      <p style="color:#888;font-size:12px;margin:0 0 12px;">Account: /u/${uid}/ · This is the debug list - saved chats also appear in the real sidebar now.</p>
      ${index.length ? rows : '<p style="color:#666;">No saved chats yet. Write something in Gemini - this chat will be saved automatically.</p>'}
      <button id="gp-debug-open" style="margin-top:12px;font-size:12px;color:#666;background:none;border:1px solid #ddd;border-radius:8px;padding:6px 10px;">Debug Info</button>
    `);

    panel.querySelectorAll('.gp-row').forEach((row) => {
      row.addEventListener('click', (e) => {
        if (e.target.classList.contains('gp-del')) return;
        renderChatDetail(row.dataset.id);
      });
    });
    panel.querySelectorAll('.gp-del').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this saved chat?')) {
          deleteChat(uid, btn.dataset.id);
          renderChatList();
          refreshSidebarRows();
        }
      });
    });
    panel.querySelector('#gp-debug-open').addEventListener('click', renderDebugPanel);
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function renderChatDetail(id) {
    const uid = getUserIndex();
    const turns = readChat(uid, id);
    const meta = readIndex(uid).find((c) => c.id === id);

    const bubbles = turns
      .map((t) => {
        const isUser = t.role === 'user';
        const content = t.html ? t.html : escapeHtml(t.text);
        return `
          <div style="margin:10px 0;display:flex;justify-content:${isUser ? 'flex-end' : 'flex-start'};">
            <div style="max-width:80%;padding:10px 14px;border-radius:14px;background:${isUser ? '#d6e4ff' : '#f1f1f1'};">
              ${content}
            </div>
          </div>`;
      })
      .join('');

    const panel = baseOverlay(`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <button id="gp-back" style="border:none;background:none;font-size:18px;">←</button>
        <h3 style="margin:0;">${escapeHtml(meta ? meta.title : 'Chat')}</h3>
      </div>
      <div id="gp-bubbles">${bubbles}</div>
      <div style="margin-top:14px;border-top:1px solid #eee;padding-top:10px;">
        <button id="gp-open-inline" style="background:#1a73e8;color:#fff;border:none;border-radius:8px;padding:8px 14px;">Open in chat (seamless)</button>
        <p style="color:#888;font-size:11px;margin-top:6px;">Opens this saved chat directly in the main chat area, styled like a real chat. Just reply normally to continue it - the hidden history is sent along automatically and stays hidden.</p>
      </div>
      <div style="margin-top:14px;border-top:1px solid #eee;padding-top:10px;">
        <textarea id="gp-continue-input" placeholder="New question - will be inserted into the current input field together with the history above as context..." style="width:100%;min-height:60px;border:1px solid #ddd;border-radius:8px;padding:8px;font-family:inherit;font-size:13px;"></textarea>
        <button id="gp-continue-btn" style="margin-top:8px;background:none;color:#1a73e8;border:1px solid #1a73e8;border-radius:8px;padding:8px 14px;">Continue with context (manual)</button>
        <p style="color:#888;font-size:11px;margin-top:6px;">Doesn't open a new tab automatically - make sure you're currently in a new/empty Gemini chat before clicking "continue".</p>
      </div>
    `);

    panel.querySelector('#gp-back').addEventListener('click', renderChatList);
    panel.querySelector('#gp-open-inline').addEventListener('click', () => {
      openSavedChatInline(id);
    });
    panel.querySelector('#gp-continue-btn').addEventListener('click', () => {
      const q = panel.querySelector('#gp-continue-input').value.trim();
      if (!q) {
        toast('Please enter a new question first.');
        return;
      }
      continueChatWithContext(turns, q);
      closeOverlay();
    });
  }

  function renderDebugPanel() {
    extractTurns(); // refreshes lastFoundCounts
    baseOverlay(`
      <h3 style="margin:0 0 12px;">Debug Info</h3>
      <p><b>Current account (/u/N/):</b> ${getUserIndex()}</p>
      <p><b>Chat history container found:</b> ${findChatHistoryContainer() ? 'yes' : 'NO'}</p>
      <p><b>Turns (conversation-container) found:</b> ${lastFoundCounts.turns}</p>
      <p><b>Of those with user text detected:</b> ${lastFoundCounts.user}</p>
      <p><b>Of those with model reply detected:</b> ${lastFoundCounts.model}</p>
      <p><b>Input field found:</b> ${q1(document, SEL.inputEditor) ? 'yes' : 'NO'}</p>
      <p><b>Current chat ID:</b> ${getChatId()}</p>
      <p><b>Real bubble colours learned this session:</b> ${turnStyleSnapshot ? 'yes' : 'no - using hardcoded defaults'}</p>
      <p><b>Sidebar section style learned (real, Activity on):</b> ${sidebarSectionTemplateHTML ? 'yes' : 'no - using hand-styled fallback'}</p>
      <p><b>Sidebar row style learned (real):</b> ${sidebarRowTemplateHTML ? 'yes' : 'no - using hand-styled fallback'}</p>
      <p><b>Sidebar anchor currently found:</b> ${findSidebarAnchor() ? 'yes' : 'NO'}</p>
      <p><b>Sidebar section currently mounted:</b> ${document.querySelector('[data-gp-fake="section"]') ? 'yes' : 'NO'}</p>
      <p><b>Currently viewing a saved chat:</b> ${activeSavedChat ? activeSavedChat.title : 'no'}</p>
      <p><b>Waiting to reveal a real send:</b> ${pendingRevealQuestion ? 'yes ("' + pendingRevealQuestion + '")' : 'no'}</p>
      <p><b>Waiting to prepend old history:</b> ${pendingHistoryTurns ? pendingHistoryTurns.length + ' turns queued' : 'no'}</p>
      <p><b>Composer "empty state" classes currently patched:</b> ${composerLayoutPatched.length}</p>
      <p><b>Send-flow watchdog:</b> ${sendFlowStartedAt ? Math.round((Date.now() - sendFlowStartedAt) / 1000) + 's elapsed (auto-recovers at ' + (SEND_FLOW_TIMEOUT_MS / 1000) + 's)' : 'idle'}</p>
      <p style="color:#888;font-size:12px;margin-top:12px;">
        If this shows 0, Google likely changed class names / custom elements.
        Open the page in the Web Inspector (Mac + iPhone via cable) and adjust
        the SEL selectors at the top of the script.
      </p>
      <button id="gp-back2" style="margin-top:10px;border:1px solid #ddd;border-radius:8px;padding:6px 10px;background:none;">Back to list</button>
    `).querySelector('#gp-back2').addEventListener('click', renderChatList);
  }

  function updateDebugPanel() {
    // Placeholder for a future live-update if the debug panel is open.
  }

  let exitButtonEl = null;

  function createFloatingButton() {
    const btn = document.createElement('button');
    btn.appendChild(makeIcon('save', 22));
    btn.title = 'Saved chats (debug list)';
    Object.assign(btn.style, {
      position: 'fixed', bottom: '20px', right: '20px', width: '48px', height: '48px',
      borderRadius: '50%', border: 'none', background: '#1a73e8', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 999997, boxShadow: '0 2px 8px rgba(0,0,0,.3)',
    });
    btn.addEventListener('click', renderChatList);
    document.body.appendChild(btn);

    exitButtonEl = document.createElement('button');
    exitButtonEl.textContent = '↩ Exit saved chat view';
    Object.assign(exitButtonEl.style, {
      // Top-center: the sidebar's bottom area is taken up by the account/
      // location footer, and the bottom-right corner by the toasts and the
      // 💾 button, so the top of the page is the one spot that's reliably
      // empty on both the real "Activity enabled" and "disabled" layouts.
      position: 'fixed', top: '12px', left: '50%', transform: 'translateX(-50%)', display: 'none',
      border: 'none', borderRadius: '20px', background: '#1f1f1f', color: '#fff',
      fontSize: '12px', padding: '8px 14px', zIndex: 999997,
      boxShadow: '0 2px 8px rgba(0,0,0,.3)', cursor: 'pointer',
    });
    exitButtonEl.addEventListener('click', exitSavedChatView);
    document.body.appendChild(exitButtonEl);
  }

  function updateExitButtonVisibility() {
    if (!exitButtonEl) return;
    exitButtonEl.style.display = activeSavedChat ? 'block' : 'none';
  }

  /* =========================================================================
   * START
   * ======================================================================= */

  function init() {
    migrateLegacyStorage();
    createFloatingButton();
    attachSendInterceptor();
    startObserving();
    pollSidebar();
    watchForNavigationAway();
    // Try an initial save shortly after load (in case a chat is already open)
    setTimeout(saveCurrentChat, 2000);
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
