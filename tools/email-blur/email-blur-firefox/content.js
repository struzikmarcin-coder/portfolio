(() => {
  const RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const CLS = '__email-blur';
  const FADE = 'linear-gradient(to right,transparent,#000 20%,#000 80%,transparent)';
  let style = null, obs = null;

  const mark = (el, textNode) => {
    if (!el || el.nodeType !== 1) return;
    el.classList.add(CLS);
    if (!textNode) return;
    // dopasuj zanikanie do szerokości samego tekstu, a nie całego bloku
    const r = document.createRange(); r.selectNodeContents(textNode);
    const t = r.getBoundingClientRect(), e = el.getBoundingClientRect();
    if (!t.width || !e.width) return;
    const pad = 12;
    el.style.setProperty('--eb-x', Math.max(0, t.left - e.left - pad) + 'px');
    el.style.setProperty('--eb-w', Math.min(e.width, t.width + 2 * pad) + 'px');
  };
  const checkEl = el => {
    if (el.nodeType !== 1 || el.closest('script,style')) return;
    if ((el.value && RE.test(el.value)) || RE.test(el.placeholder || '') ||
        RE.test(el.title || '') || RE.test(el.getAttribute('href') || '') ||
        RE.test(el.getAttribute('aria-label') || '')) mark(el);
  };
  const checkText = n => {
    const p = n.parentElement;
    if (p && RE.test(n.data) && !p.closest('script,style')) mark(p, n);
  };
  const scan = root => {
    if (root.nodeType === 3) return checkText(root);
    if (root.nodeType !== 1) return;
    checkEl(root);
    root.querySelectorAll('*').forEach(checkEl);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) checkText(n);
  };
  const onInput = e => checkEl(e.target);

  const start = () => {
    if (style || !document.body) return;
    style = document.createElement('style');
    style.textContent = `.${CLS}{filter:blur(6px)!important;
      -webkit-mask:${FADE} var(--eb-x,0) 0/var(--eb-w,100%) 100% no-repeat!important;
      mask:${FADE} var(--eb-x,0) 0/var(--eb-w,100%) 100% no-repeat!important;}`;
    (document.head || document.documentElement).appendChild(style);
    scan(document.body);
    obs = new MutationObserver(ms => ms.forEach(m => {
      if (m.type === 'childList') m.addedNodes.forEach(scan);
      else if (m.type === 'characterData') scan(m.target);
      else checkEl(m.target);
    }));
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['value', 'placeholder', 'title', 'href', 'aria-label'] });
    document.addEventListener('input', onInput, true);
  };
  const stop = () => {
    if (!style) return;
    obs.disconnect(); obs = null;
    document.removeEventListener('input', onInput, true);
    style.remove(); style = null;
    document.querySelectorAll('.' + CLS).forEach(el => {
      el.classList.remove(CLS); el.style.removeProperty('--eb-x'); el.style.removeProperty('--eb-w');
    });
  };

  chrome.storage.local.get({ enabled: true }, ({ enabled }) => enabled && start());
  chrome.storage.onChanged.addListener(ch => {
    if (ch.enabled) ch.enabled.newValue ? start() : stop();
  });
})();
