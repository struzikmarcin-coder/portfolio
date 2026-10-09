/* Umami analytics (cookie-free, no consent banner). Loaded on every page, gate screen included.
   To switch on: paste the Website ID from Umami (Settings → Websites → Edit) into WEBSITE_ID below.
   Empty = nothing loads and nothing is tracked.
   Skip your own visits: open any page with ?notrack=1 once per browser (?notrack=0 undoes it).

   Custom events (Umami → Events):
     newsletter-submit     someone pressed Subscribe / Notify me      {form: homepage|gate, gift}
     newsletter-signup     GetResponse sent them back (?subscribed=1)  {form, gift}
     newsletter-confirmed  they clicked the confirmation link        {gift}
     pdf-download          click on any PDF link                     {file}
     bonus-click           click on a note's free-PDF box            {gift, note}
     note-read             reader got to the end of a note           {note}
     contact-click         email or LinkedIn link                    {type, place} */
(function(){
  var WEBSITE_ID = '1556e948-c8d7-4c55-bd3e-17a06cd1ce02';
  var q = location.search;

  try{
    if(/[?&]notrack=1/.test(q)) localStorage.setItem('umami.disabled', '1');
    if(/[?&]notrack=0/.test(q)) localStorage.removeItem('umami.disabled');
  }catch(e){}
  if(!WEBSITE_ID) return;

  function gift(){ try{ return localStorage.getItem('imstruzik-gift') || 'none'; }catch(e){ return 'none'; } }
  function track(name, data){ if(window.umami && umami.track) umami.track(name, data); }
  var path = location.pathname, noteMatch = path.match(/^\/notes\/([^\/]+)\/?$/);

  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://cloud.umami.is/script.js';
  s.setAttribute('data-website-id', WEBSITE_ID);
  s.setAttribute('data-domains', 'imstruzik.com');
  s.onload = function(){
    // GetResponse thank-you pages: the homepage form returns to /?subscribed=1#newsletter, the gate form to /?subscribed=1
    if(/[?&]subscribed=1/.test(q)) track('newsletter-signup', {form: location.hash === '#newsletter' ? 'homepage' : 'gate', gift: gift()});
    if(/[?&]confirmed=1/.test(q)) track('newsletter-confirmed', {gift: gift()});
  };
  document.head.appendChild(s);

  document.addEventListener('submit', function(ev){
    var f = ev.target;
    if(!f.action || f.action.indexOf('getresponse.com') < 0 || ev.defaultPrevented) return;
    track('newsletter-submit', {form: f.closest('#cs-gate') ? 'gate' : 'homepage', gift: (q.match(/[?&]gift=([a-z]+)/) || [0, 'none'])[1]});
  });

  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href]');
    if(!a) return;
    var href = a.getAttribute('href'), place = a.closest('#cs-gate') ? 'gate' : (noteMatch ? noteMatch[1] : path);
    if(/\.pdf(\?|#|$)/i.test(href)) track('pdf-download', {file: href.split('/').pop()});
    else if(/[?&]gift=/.test(href)) track('bonus-click', {gift: href.match(/[?&]gift=([a-z]+)/)[1], note: noteMatch ? noteMatch[1] : path});
    else if(/^mailto:/i.test(href)) track('contact-click', {type: 'email', place: place});
    else if(/linkedin\.com/i.test(href)) track('contact-click', {type: 'linkedin', place: place});
  });

  // "Read" = the end of the note's article came into view (not just opened the page)
  if(noteMatch && 'IntersectionObserver' in window){
    document.addEventListener('DOMContentLoaded', function(){
      var art = document.querySelector('article');
      if(!art) return;
      var end = document.createElement('div');
      art.appendChild(end);
      var io = new IntersectionObserver(function(entries){
        if(!entries[0].isIntersecting || document.documentElement.classList.contains('cs-locked')) return;
        track('note-read', {note: noteMatch[1]});
        io.disconnect();
      });
      io.observe(end);
    });
  }
})();
