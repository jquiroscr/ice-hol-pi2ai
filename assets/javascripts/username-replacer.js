// ============================================================
//  Username Replacer — HOL PI Systems 2 AI
//  Replaces USERNAME placeholder in code blocks
//  Users: user001 – user050
// ============================================================
(function () {
  const PLACEHOLDER = 'USERNAME';
  const STORAGE_KEY = 'ice_hol_username';

  // Build dropdown options user001–user050
  function buildOptions() {
    const sel = document.getElementById('user-number-input');
    if (!sel) return;
    for (let i = 1; i <= 50; i++) {
      const val = 'user' + String(i).padStart(3, '0');
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = val;
      sel.appendChild(opt);
    }
  }

  // Walk DOM and replace text nodes only (preserves syntax highlighting)
  function walkReplace(node, from, to) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue.includes(from)) {
        node.nodeValue = node.nodeValue.split(from).join(to);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(c => walkReplace(c, from, to));
    }
  }

  function initBlocks() {
    document.querySelectorAll('code').forEach(block => {
      if (block.textContent.includes(PLACEHOLDER) && !block.hasAttribute('data-orig')) {
        block.setAttribute('data-orig', block.innerHTML);
      }
    });
  }

  function applyUsername(username) {
    document.querySelectorAll('code[data-orig]').forEach(block => {
      block.innerHTML = block.getAttribute('data-orig');
      if (username) walkReplace(block, PLACEHOLDER, username);
    });
    const disp = document.getElementById('selected-username');
    if (disp) disp.textContent = username || 'Ninguno';
  }

  function setup() {
    buildOptions();
    initBlocks();

    const sel    = document.getElementById('user-number-input');
    const save   = document.getElementById('user-username-save');
    const clear  = document.getElementById('user-username-clear');
    const saved  = localStorage.getItem(STORAGE_KEY) || '';

    if (sel && saved) sel.value = saved;
    applyUsername(saved);

    if (save) {
      save.addEventListener('click', () => {
        const u = sel ? sel.value : '';
        localStorage.setItem(STORAGE_KEY, u);
        applyUsername(u);
      });
    }
    if (clear) {
      clear.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        if (sel) sel.value = '';
        applyUsername('');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', setup);

  // Material SPA navigation
  if (window.location$) {
    window.location$.subscribe(() => setTimeout(() => { initBlocks(); applyUsername(localStorage.getItem(STORAGE_KEY) || ''); }, 120));
  }
})();
