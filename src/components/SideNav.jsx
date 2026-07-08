import { useState, useEffect } from 'react';
import { sections, useActiveSection } from '../hooks/useActiveSection';

export default function SideNav() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const active = useActiveSection(0.35);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav aria-label="Section navigation" style={{
      position: 'fixed', right: '28px', top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: '14px',
      zIndex: 900,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.4s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }} className="sidenav">
      {sections.map(({ id, label }) => (
        <div
          key={id}
          style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Tooltip label */}
          <div style={{
            fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
            color: '#7d7d7d', letterSpacing: '0.08em', textTransform: 'uppercase',
            opacity: hovered === id ? 1 : 0,
            transform: hovered === id ? 'translateX(0)' : 'translateX(6px)',
            transition: 'opacity 0.2s, transform 0.2s',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            {label}
          </div>

          {/* Dot */}
          <a
            href={`#${id}`}
            title={label}
            aria-label={`Go to ${label} section`}
            aria-current={active === id ? 'true' : undefined}
            style={{
              width: active === id ? '8px' : '5px',
              height: active === id ? '8px' : '5px',
              borderRadius: '50%',
              background: active === id ? '#fff' : 'transparent',
              border: active === id ? '1px solid #fff' : '1px solid #333',
              display: 'block',
              transition: 'all 0.25s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#888'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = active === id ? '#fff' : '#333'; }}
          />
        </div>
      ))}

      <style>{`
        @media (max-width: 1024px) { .sidenav { display: none !important; } }
      `}</style>
    </nav>
  );
}
