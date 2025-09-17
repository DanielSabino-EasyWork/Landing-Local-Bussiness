tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'ui-sans-serif','system-ui','Segoe UI','Roboto','Ubuntu','Helvetica Neue','Arial','Noto Sans','sans-serif'],
            serif: ['Fraunces','ui-serif','Georgia','serif']
          },
          colors: {
            base: { 900: '#12100e', 800:'#1a1713' },
            text: { DEFAULT:'#f5efe6', muted:'#cdbeb0' },
            brand: { 300:'#fbd38d', 400:'#f6ad55', 500:'#dd6b20' },
            accent:{ 300:'#fca5a5', 400:'#f87171' }
          },
          boxShadow: { soft: '0 10px 30px rgba(0,0,0,.35)' },
          borderRadius: { xl2: '16px' },
          backgroundImage: {
            gridfade: 'radial-gradient(1100px 520px at 80% -10%, rgba(246,173,85,.10), transparent 50%), radial-gradient(900px 500px at 0% 10%, rgba(239,68,68,.08), transparent 50%)'
          },
        }
      }
    }