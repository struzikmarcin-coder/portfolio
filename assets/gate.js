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
    + '#cs-gate a:hover{border-color:#6b8afd}'
    + '#cs-gate form{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;max-width:460px;margin-top:6px}'
    + '#cs-gate input[type=email]{flex:1 1 220px;min-width:0;padding:14px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#f4f5f6;font:inherit;font-size:15px}'
    + '#cs-gate input[type=email]:focus{outline:none;border-color:#6b8afd;background:rgba(107,138,253,.07)}'
    + '#cs-gate button{flex:0 0 auto;cursor:pointer;border:0;padding:14px 24px;border-radius:999px;background:#3b5bdb;color:#fff;font:inherit;font-size:15px;font-weight:600;box-shadow:0 12px 32px rgba(59,91,219,.4)}'
    + '#cs-gate .cs-note{font-size:13px;color:#6d737b}'
    + '#cs-gate .cs-note.ok{color:#8dfba1}'
    + '#cs-gate .cs-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}';
  document.head.appendChild(css);
  document.addEventListener('DOMContentLoaded', function(){
    var q = location.search;
    var note = /[?&]subscribed=1/.test(q) ? ['Almost there: check your inbox and click the confirmation link.', 1]
      : /[?&]confirmed=1/.test(q) ? ["You're in. Thanks for confirming, you'll hear from me first.", 1]
      : ['Get the launch heads-up and the first issue of the newsletter. Free, one click to unsubscribe.', 0];
    var g = document.createElement('div');
    g.id = 'cs-gate';
    g.innerHTML = '<span class="cs-eyebrow">imstruzik.com</span>'
      + '<h1>Coming soon</h1>'
      + '<p>Marcin Struzik, AI motion designer. New site and newsletter on the way: practical AI for video, from someone who uses it daily.</p>'
      // same GetResponse plain-HTML signup as the newsletter section in index.html
      + '<form action="https://app.getresponse.com/add_subscriber.html" method="post" accept-charset="utf-8">'
      +   '<input type="hidden" name="campaign_token" value="7Cw5K">'
      +   '<input type="hidden" name="thankyou_url" value="https://imstruzik.com/?subscribed=1">'
      +   '<input type="hidden" name="start_day" value="0">'
      +   '<label class="cs-sr" for="cs-email">Your email address</label>'
      +   '<input id="cs-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required>'
      +   '<button type="submit">Notify me</button>'
      + '</form>'
      + '<p class="cs-note' + (note[1] ? ' ok' : '') + '">' + note[0] + '</p>'
      + '<p><a href="https://www.linkedin.com/in/imstruzik/" rel="noopener">LinkedIn</a> &nbsp;&middot;&nbsp; <a href="mailto:hello@imstruzik.com">hello@imstruzik.com</a></p>';
    document.body.appendChild(g);
  });
})();
