import { useState, useEffect } from 'react';
import { sections, useActiveSection } from '../hooks/useActiveSection';

export default function SideNav() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const active = useActiveSection(0.3);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 280);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Section Quick Navigation"
      style={{
        position: 'fixed',
        right: '28px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        zIndex: 900,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="sidenav"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <div
            key={id}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Hover Tooltip Label */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: isActive ? '#ffffff' : '#888888',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              opacity: hovered === id ? 1 : 0,
              transform: hovered === id ? 'translateX(0)' : 'translateX(6px)',
              transition: 'opacity 0.2s, transform 0.2s',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              background: '#111111',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid #222222',
            }}>
              {label}
            </div>

            {/* Navigation Indicator Dot */}
            <a
              href={`#${id}`}
              title={label}
              aria-label={`Jump to ${label} section`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                width: isActive ? '9px' : '5px',
                height: isActive ? '9px' : '5px',
                borderRadius: '50%',
                background: isActive ? '#ffffff' : 'transparent',
                border: isActive ? '1px solid #ffffff' : '1px solid #404040',
                display: 'block',
                transition: 'all 0.25s var(--ease-out)',
                flexShrink: 0,
                boxShadow: isActive ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = '#ffffff'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = '#404040'; }}
            />
          </div>
        );
      })}

      <style>{`
        @media (max-width: 1024px) {
          .sidenav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

