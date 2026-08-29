import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="back-to-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
      aria-label="Scroll back to top of page"
      style={{
        position: 'fixed',
        bottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
        right: 'max(20px, env(safe-area-inset-right, 20px))',
        width: '42px',
        height: '42px',
        border: '1px solid #282828',
        borderRadius: '10px',
        background: 'rgba(12, 12, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: '#aaaaaa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 800,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease, border-color 0.2s, color 0.2s, background 0.2s',
        pointerEvents: visible ? 'auto' : 'none',
        boxShadow: '0 8px 24px -6px rgba(0,0,0,0.7)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#555555';
        e.currentTarget.style.color = '#ffffff';
        e.currentTarget.style.background = '#181818';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#282828';
        e.currentTarget.style.color = '#aaaaaa';
        e.currentTarget.style.background = 'rgba(12, 12, 12, 0.85)';
      }}
    >
      <FiArrowUp size={16} />
    </button>
  );
}

