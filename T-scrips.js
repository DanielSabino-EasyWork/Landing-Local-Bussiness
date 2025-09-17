// Helpers
    const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

    // Dynamic year
    $('#year').textContent = new Date().getFullYear();

    // Image fallback: if an Unsplash image fails, swap to fallback
    $$('img[data-fallback]').forEach(img => {
      img.addEventListener('error', () => {
        const fallback = img.getAttribute('data-fallback');
        if(fallback && img.src !== fallback){ img.src = fallback; }
      }, { once: true });
    });

    // Mobile menu toggle
    const menuBtn = $('#menuBtn');
    const mobileMenu = $('#mobileMenu');
    menuBtn?.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', open);
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
    // Top Promo Slider logic (autoplay, controls, dots, pause on hover)
    (function(){
      const slider = document.getElementById('topSlider');
      const track  = document.getElementById('topSlides');
      const prev   = document.getElementById('topPrev');
      const next   = document.getElementById('topNext');
      const dotsEl = document.getElementById('topDots');
      if(!slider || !track) return;
      const slides = Array.from(track.children);
      let i = 0, timer = null;

      function renderDots(){
        dotsEl.innerHTML='';
        slides.forEach((_, idx)=>{
          const b = document.createElement('button');
          b.className = 'w-2.5 h-2.5 rounded-full bg-white/40 transition';
          b.setAttribute('aria-label', `Go to slide ${idx+1}`);
          b.addEventListener('click', ()=>{ go(idx); });
          dotsEl.appendChild(b);
        });
      }
      function setActive(){
        track.style.transform = `translateX(-${i*100}%)`;
        Array.from(dotsEl.children).forEach((d, idx)=>{
          d.classList.toggle('bg-amber-300', idx===i);
          d.classList.toggle('bg-white/40', idx!==i);
        });
      }
      function go(n){ i = (n+slides.length)%slides.length; setActive(); }
      function play(){ timer = setInterval(()=> go(i+1), 4500); }
      function pause(){ clearInterval(timer); timer=null; }

      renderDots();
      setActive();
      play();

      prev?.addEventListener('click', ()=> go(i-1));
      next?.addEventListener('click', ()=> go(i+1));

      slider.addEventListener('mouseenter', pause);
      slider.addEventListener('mouseleave', play);
      slider.addEventListener('keydown', (e)=>{
        if(e.key==='ArrowLeft') { e.preventDefault(); go(i-1); }
        if(e.key==='ArrowRight'){ e.preventDefault(); go(i+1); }
      });
    })();

    // Tabs filter (Menu)
    const tabButtons = $$('.tab-btn');
    const cards = $$('#menuGrid [data-cat]');
    tabButtons.forEach(btn => btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.setAttribute('aria-selected','false'));
      btn.setAttribute('aria-selected','true');
      const key = btn.dataset.tab;
      cards.forEach(card => {
        card.classList.toggle('hidden', key !== 'all' && card.dataset.cat !== key);
      });
    }));

    // Booking form validation
    const form = $('#bookingForm');
    const showError = (name, msg) => { const el = document.querySelector(`[data-error-for="${name}"]`); if(el) el.textContent = msg || ''; };

    form?.addEventListener('submit', (e)=>{
      e.preventDefault();
      let ok = true;
      const name = $('#name');
      if(!name.value || name.value.trim().length < 2){ ok=false; showError('name','Enter your name (min. 2 characters)'); } else showError('name');
      const email = $('#email');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value);
      if(!emailOk){ ok=false; showError('email','Enter a valid email'); } else showError('email');
      const size = $('#size');
      const sizeOk = Number(size.value) >= 1 && Number(size.value) <= 20;
      if(!sizeOk){ ok=false; showError('size','Party size must be between 1 and 20'); } else showError('size');
      const dt = $('#datetime');
      if(!dt.value){ ok=false; showError('datetime','Select date & time'); } else showError('datetime');

      if(ok){
        form.reset();
        $('#formSuccess').textContent = 'Thanks! We will confirm by email.';
        setTimeout(()=> $('#formSuccess').textContent = '', 6000);
      }
    });