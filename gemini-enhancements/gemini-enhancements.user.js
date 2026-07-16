// ==UserScript==
// @name         Gemini Enhancements (locally saved chats, no API/training)
// @author       @cufiy
// @namespace    local.gemini.persist
// @version      0.3.0
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
  };

  const DEBOUNCE_MS = 800;
  const STORAGE_INDEX_PREFIX = 'gp_index_u'; // + user id, e.g. gp_index_u1
  const STORAGE_CHAT_PREFIX = 'gp_chat_u'; // + user id + '_' + chat id
  const LEGACY_STORAGE_INDEX_KEY = 'gp_index'; // pre-0.3.0, single-account
  const LEGACY_STORAGE_CHAT_PREFIX = 'gp_chat_';
  const LEGACY_MIGRATION_FLAG = 'gp_migrated_v3';
  const TEMPLATE_TURN_KEY = 'gp_tpl_turn';
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
   * VISUAL TEMPLATES
   * -------------------------------------------------------------------------
   * Instead of hand-building HTML with guessed class names (fragile - see
   * the note above about Google renaming things), we clone the outerHTML of
   * a REAL, currently-rendered turn / sidebar row the first time we see one,
   * and reuse that as a stamp for saved chats later on. This is what makes
   * reconstructed chats look pixel-identical to real ones: it literally is
   * the same markup, just with the text swapped out.
   *
   * Templates are cached in memory and persisted via GM_setValue so a saved
   * chat can still be opened even on a brand-new/empty page that has no
   * real turns to learn from yet.
   * ======================================================================= */
  let turnTemplateHTML = GM_getValue(TEMPLATE_TURN_KEY, null);
  let sidebarRowTemplateHTML = GM_getValue(TEMPLATE_ROW_KEY, null);
  let sidebarSectionTemplateHTML = GM_getValue(TEMPLATE_SECTION_KEY, null);
  let turnStyleSnapshot = (() => {
    try {
      return JSON.parse(GM_getValue(TEMPLATE_TURN_STYLE_KEY, 'null'));
    } catch (e) {
      return null;
    }
  })();

  // Set while WE are the ones inserting reconstructed nodes into the page,
  // so the template-learning code never accidentally learns from its own
  // fake output.
  let isReconstructing = false;

  // Cloning outerHTML preserves classes and Angular's scoped "_ngcontent-*"
  // attributes, which is usually enough for the clone to pick up the same
  // CSS. But some visual details (e.g. the user-message bubble background)
  // can depend on Angular internals we can't replicate from static markup.
  // As a safety net we also snapshot a handful of *computed* style values
  // from the real element and re-apply them as inline styles on the clone,
  // so the important bits (background, radius, padding, alignment) are
  // guaranteed to look right even if the class-based styling doesn't
  // carry over perfectly.
  const STYLE_PROPS_TO_SNAPSHOT = [
    'backgroundColor', 'color', 'borderRadius', 'padding', 'margin',
    'fontSize', 'lineHeight', 'fontFamily', 'maxWidth', 'display',
    'justifyContent', 'alignItems', 'textAlign', 'boxShadow', 'border', 'whiteSpace',
  ];

  function snapshotStyle(el) {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const snap = {};
    STYLE_PROPS_TO_SNAPSHOT.forEach((p) => {
      snap[p] = cs[p];
    });
    return snap;
  }

  function applyStyleSnapshot(el, snap) {
    if (!el || !snap) return;
    Object.assign(el.style, snap);
  }

  function captureTurnTemplate(turnEl) {
    if (isReconstructing || turnEl.hasAttribute('data-gp-fake')) return;
    const html = turnEl.outerHTML;
    // The bubble background sits on the ancestor span carrying this class;
    // fall back to the plain query-text container if that span isn't found.
    const bubbleEl = turnEl.querySelector('.user-query-bubble-with-background') || q1(turnEl, SEL.userQueryText);
    const modelEl = q1(turnEl, SEL.modelMarkdown);
    const snapshot = { bubble: snapshotStyle(bubbleEl), model: snapshotStyle(modelEl) };

    if (html !== turnTemplateHTML) {
      turnTemplateHTML = html;
      GM_setValue(TEMPLATE_TURN_KEY, html);
    }
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

      // Learn what a "real" turn looks like so saved chats can be
      // reconstructed with identical styling later.
      if (userText || modelEl) captureTurnTemplate(turnEl);
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
    debouncedSave();
  }

  function startObserving() {
    const target = findChatHistoryContainer() || document.body;
    const observer = new MutationObserver(() => onChatMutation());
    observer.observe(target, { childList: true, subtree: true, characterData: true });

    // If the chat history container doesn't exist yet on load (e.g. a brand
    // new, fully empty session): keep retrying to attach every few seconds.
    if (target === document.body) {
      const retry = setInterval(() => {
        const found = findChatHistoryContainer();
        if (found) {
          clearInterval(retry);
          observer.disconnect();
          const obs2 = new MutationObserver(() => onChatMutation());
          obs2.observe(found, { childList: true, subtree: true, characterData: true });
        }
      }, 3000);
    }
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

  function buildTurnNode(pair) {
    if (!turnTemplateHTML) return null;
    const wrapper = document.createElement('div');
    setHTML(wrapper, turnTemplateHTML);
    const node = wrapper.firstElementChild;
    if (!node) return null;
    node.setAttribute('data-gp-fake', 'turn');

    // Fill in the user side.
    const userTextEl = q1(node, SEL.userQueryText);
    const bubbleEl = node.querySelector('.user-query-bubble-with-background') || userTextEl;
    if (userTextEl && pair.user) {
      clearElement(userTextEl);
      pair.user.text.split('\n').forEach((line) => {
        const p = document.createElement('p');
        p.className = 'query-text-line ng-star-inserted';
        p.textContent = line;
        userTextEl.appendChild(p);
      });
      // Belt-and-braces: force the real bubble look via the snapshot taken
      // from a genuine message, in case the cloned classes alone don't
      // fully reproduce it (see note above buildTurnNode).
      if (turnStyleSnapshot) applyStyleSnapshot(bubbleEl, turnStyleSnapshot.bubble);
    } else if (!pair.user) {
      const userQueryEl = node.querySelector('user-query');
      if (userQueryEl) userQueryEl.style.display = 'none';
    }

    // Fill in the model side.
    const modelEl = q1(node, SEL.modelMarkdown);
    if (modelEl && pair.model) {
      setHTML(modelEl, pair.model.html || escapeHtml(pair.model.text));
      if (turnStyleSnapshot) applyStyleSnapshot(modelEl, turnStyleSnapshot.model);
    } else if (!pair.model) {
      const modelResponseEl = node.querySelector('model-response');
      if (modelResponseEl) modelResponseEl.style.display = 'none';
    }

    // Buttons cloned from a real turn (copy/thumbs/regenerate/...) look
    // right but aren't wired to Angular, so they'd otherwise do nothing.
    // Make that explicit instead of leaving dead controls.
    node.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toast('This is a locally reconstructed saved chat - this action is not available here.');
      });
    });

    return node;
  }

  function openSavedChatInline(id) {
    const uid = getUserIndex();
    const turns = readChat(uid, id);
    const meta = readIndex(uid).find((c) => c.id === id);
    if (!turns.length) {
      toast('This saved chat has no content.');
      return;
    }
    if (!turnTemplateHTML) {
      toast('Styling not learned yet - open any real chat with at least one reply once, then try again.');
      return;
    }

    const container = findChatHistoryContainer();
    if (!container) {
      toast('Chat area not found.');
      return;
    }

    isReconstructing = true;
    clearElement(container);

    const pairs = groupTurnsIntoPairs(turns);
    pairs.forEach((pair) => {
      const node = buildTurnNode(pair);
      if (node) container.appendChild(node);
    });
    isReconstructing = false;

    activeSavedChat = { id, turns, title: meta ? meta.title : 'Saved chat' };
    pendingRevealQuestion = null;
    lastPathForSavedView = location.pathname;

    container.scrollTop = container.scrollHeight;
    closeOverlay();
    toast('Showing saved chat "' + (meta ? meta.title : id) + '". Reply normally to continue it.');
  }

  function exitSavedChatView() {
    const container = findChatHistoryContainer();
    if (container) {
      container.querySelectorAll('[data-gp-fake="turn"]').forEach((n) => n.remove());
    }
    activeSavedChat = null;
    pendingRevealQuestion = null;
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

    pendingRevealQuestion = question;
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
        // The conversation is now live and self-contained on Google's side -
        // stop hijacking further sends in this chat.
        activeSavedChat = null;
        break;
      }
    }
  }

  // If the user navigates away to a different (real) chat while a saved
  // chat is open, drop out of saved-chat mode so we stop intercepting sends.
  function watchForNavigationAway() {
    setInterval(() => {
      if (activeSavedChat && location.pathname !== lastPathForSavedView) {
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

    const icon = document.createElement('span');
    icon.textContent = '💾';
    Object.assign(icon.style, { fontSize: '13px', flexShrink: '0' });
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
      <p><b>Turn style learned:</b> ${turnTemplateHTML ? 'yes' : 'NO'}</p>
      <p><b>Sidebar section style learned (real, Activity on):</b> ${sidebarSectionTemplateHTML ? 'yes' : 'no - using hand-styled fallback'}</p>
      <p><b>Sidebar row style learned (real):</b> ${sidebarRowTemplateHTML ? 'yes' : 'no - using hand-styled fallback'}</p>
      <p><b>Sidebar anchor currently found:</b> ${findSidebarAnchor() ? 'yes' : 'NO'}</p>
      <p><b>Sidebar section currently mounted:</b> ${document.querySelector('[data-gp-fake="section"]') ? 'yes' : 'NO'}</p>
      <p><b>Currently viewing a saved chat:</b> ${activeSavedChat ? activeSavedChat.title : 'no'}</p>
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
    btn.textContent = '💾';
    btn.title = 'Saved chats (debug list)';
    Object.assign(btn.style, {
      position: 'fixed', bottom: '20px', right: '20px', width: '48px', height: '48px',
      borderRadius: '50%', border: 'none', background: '#1a73e8', color: '#fff',
      fontSize: '20px', zIndex: 999997, boxShadow: '0 2px 8px rgba(0,0,0,.3)',
    });
    btn.addEventListener('click', renderChatList);
    document.body.appendChild(btn);

    exitButtonEl = document.createElement('button');
    exitButtonEl.textContent = '↩ Exit saved chat view';
    Object.assign(exitButtonEl.style, {
      // Bottom-LEFT on purpose: the toasts and the 💾 button both live in
      // the bottom-right corner, so keeping this on the opposite side means
      // it never gets covered by a toast popping up.
      position: 'fixed', bottom: '20px', left: '20px', display: 'none',
      border: 'none', borderRadius: '20px', background: '#1f1f1f', color: '#fff',
      fontSize: '12px', padding: '8px 12px', zIndex: 999997,
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