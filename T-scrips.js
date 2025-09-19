// Helpers
    const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

    // Año dinámico
    $('#year').textContent = new Date().getFullYear();

    // Menú lateral (off-canvas)
    const htmlEl = document.documentElement;
    const menuBtn = $('#menuBtn');
    const drawer = $('#mobileDrawer');
    const backdrop = $('#menuBackdrop');
    const menuClose = $('#menuClose');
    let isMenuOpen = false;
    function setMenu(open){
      isMenuOpen = open;
      drawer.classList.toggle('-translate-x-full', !open);
      drawer.classList.toggle('translate-x-0', open);
      drawer.toggleAttribute('inert', !open);
      drawer.setAttribute('aria-hidden', String(!open));
      backdrop.classList.toggle('hidden', !open);
      htmlEl.classList.toggle('overflow-hidden', open);
      menuBtn?.setAttribute('aria-expanded', String(open));
      menuBtn?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if(open){ drawer.querySelector('a, button')?.focus(); }
    }
    menuBtn?.addEventListener('click', ()=> setMenu(!isMenuOpen));
    backdrop?.addEventListener('click', ()=> setMenu(false));
    menuClose?.addEventListener('click', ()=> setMenu(false));
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') setMenu(false); });
    drawer?.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', ()=> setMenu(false)));
    const mql = window.matchMedia('(min-width: 768px)');
    const onBp = (e)=>{ if(e.matches) setMenu(false); };
    try { mql.addEventListener('change', onBp); } catch(_) { mql.addListener(onBp); }

    // Swiper (hero specials)
    window.addEventListener('load', ()=>{
      const swiper = new Swiper('#specialsSwiper', {
        loop: true,
        autoplay: { delay: 4200, disableOnInteraction: false },
        pagination: { el: '#specialsPagination', clickable: true },
        a11y: { enabled: true }
      });
    });

    // Auto-theme by viewport center (stable theme switching)
    (function(){
      const sections = Array.from(document.querySelectorAll('#styles article[data-theme]'));
      let raf = 0;
      function setThemeByCenter(){
        const mid = window.innerHeight * 0.5;
        let chosen = null, delta = Infinity;
        for(const sec of sections){
          const r = sec.getBoundingClientRect();
          if(r.top <= mid && r.bottom >= mid){
            const center = (r.top + r.bottom)/2; const d = Math.abs(center - mid);
            if(d < delta){ delta = d; chosen = sec; }
          }
        }
        document.body.setAttribute('data-theme', chosen ? chosen.dataset.theme : 'base');
      }
      const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(setThemeByCenter); };
      window.addEventListener('scroll', onScroll, {passive:true});
      window.addEventListener('resize', setThemeByCenter);
      setThemeByCenter();
    })();

    // Form validation
    const form = $('#bookingForm');
    const showError = (name, msg) => { const el = document.querySelector(`[data-error-for="${name}"]`); if(el) el.textContent = msg || ''; };
    form?.addEventListener('submit', (e)=>{
      e.preventDefault(); let ok = true;
      const name = $('#name'); if(!name.value || name.value.trim().length < 2){ ok=false; showError('name','Enter your name (min. 2 characters)'); } else showError('name');
      const email = $('#email'); const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value); if(!emailOk){ ok=false; showError('email','Enter a valid email'); } else showError('email');
      const size = $('#size'); const sizeOk = Number(size.value) >= 1 && Number(size.value) <= 20; if(!sizeOk){ ok=false; showError('size','Party size must be between 1 and 20'); } else showError('size');
      const dt = $('#datetime'); if(!dt.value){ ok=false; showError('datetime','Select date & time'); } else showError('datetime');
      if(ok){ form.reset(); $('#formSuccess').textContent = 'Thanks! We will confirm by email.'; setTimeout(()=> $('#formSuccess').textContent = '', 6000); }
    });