import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function NotFound() {
  const { theme, setTheme } = useTheme();
  const prevTheme = useRef(theme);

  useEffect(() => {
    // Remember the user's real theme, then force light
    prevTheme.current = theme;
    if (theme !== 'light') {
      setTheme('light');
    }

    // Restore original theme when leaving
    return () => {
      if (prevTheme.current !== 'light') {
        setTheme(prevTheme.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <div
          style={{
            backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
            height: 400,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          }}
          aria-hidden="true"
        >
          <h1
            style={{
              textAlign: 'center',
              color: '#111827',
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              paddingTop: 24,
              fontWeight: 900,
              letterSpacing: '-0.04em'
            }}
          >
            404
          </h1>
        </div>

        <div style={{ marginTop: 32 }}>
          <h3
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              marginBottom: 16,
              color: '#111827'
            }}
          >
            Aradığınız sayfa bulunamadı
          </h3>
          <p style={{ marginBottom: 32, color: '#6b7280', fontSize: 16, lineHeight: 1.7 }}>
            Ulaşmaya çalıştığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>

          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '13px 26px',
              borderRadius: 12,
              background: '#10b981',
              color: '#064e3b',
              fontWeight: 800,
              fontSize: 15,
              fontFamily: 'Outfit, sans-serif',
              boxShadow: '0 8px 25px rgba(16,185,129,0.25)',
              transition: 'all 0.3s ease'
            }}
          >
            <Send size={18} />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
