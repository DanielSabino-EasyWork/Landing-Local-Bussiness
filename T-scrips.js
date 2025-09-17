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