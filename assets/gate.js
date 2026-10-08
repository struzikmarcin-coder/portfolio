/* Temporary "coming soon" gate while the site is being polished.
   Unlock in a browser: add ?preview=imstruzik to any URL (remembered in this browser).
   Lock again: ?preview=off. To launch for real, delete this file's <script> tag from every page. */
(function(){
  var KEY = 'imstruzik-preview', d = document.documentElement, m = location.search.match(/[?&]preview=([^&]*)/);
  try{
    if(m && m[1] === 'imstruzik') localStorage.setItem(KEY, '1');
    if(m && m[1] === 'off') localStorage.removeItem(KEY);
    if(localStorage.getItem(KEY) === '1' || (m && m[1] === 'imstruzik')) return;
  }catch(e){ if(m && m[1] === 'imstruzik') return; }
  d.className += ' cs-locked';
  var css = document.createElement('style');
  css.textContent = 'html.cs-locked body>*:not(#cs-gate){display:none!important}'
    + 'html.cs-locked,html.cs-locked body{background:#08090a;overflow:hidden}'
    + '#cs-gate{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;text-align:center;color:#f4f5f6;font-family:Archivo,system-ui,sans-serif;background:radial-gradient(60% 50% at 50% 40%,rgba(107,138,253,.14),transparent 70%),#08090a}'
    + '#cs-gate .cs-eyebrow{font:500 12px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase;color:#6b8afd}'
    + '#cs-gate h1{margin:0;font-size:clamp(36px,8vw,64px);font-weight:800;letter-spacing:-.03em;line-height:1.02}'
    + '#cs-gate p{margin:0;max-width:40ch;font-size:16px;line-height:1.6;color:#9aa0a8}'
    + '#cs-gate a{color:#f4f5f6;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.25)}'
    + '#cs-gate a:hover{border-color:#6b8afd}';
  document.head.appendChild(css);
  document.addEventListener('DOMContentLoaded', function(){
    var g = document.createElement('div');
    g.id = 'cs-gate';
    g.innerHTML = '<span class="cs-eyebrow">imstruzik.com</span>'
      + '<h1>Coming soon</h1>'
      + '<p>Marcin Struzik, AI motion designer. New site and newsletter on the way.</p>'
      + '<p><a href="https://www.linkedin.com/in/imstruzik/" rel="noopener">LinkedIn</a> &nbsp;&middot;&nbsp; <a href="mailto:hello@imstruzik.com">hello@imstruzik.com</a></p>';
    document.body.appendChild(g);
  });
})();
