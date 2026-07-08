import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { data } from '../data';
import { sections, useActiveSection } from '../hooks/useActiveSection';

const links = sections.map(({ id, label }) => ({ label, href: `#${id}` }));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(0.3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '13px 0' : '22px 0',
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid #181818' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.05rem', color: '#f5f5f5', letterSpacing: '-0.02em' }}>
            Sultan<span style={{ color: '#2a2a2a' }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: '36px', listStyle: 'none', alignItems: 'center' }}>
          {links.map(({ label, href }) => {
            const id = href.slice(1);
            const isActive = activeSection === id;
            return (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    color: isActive ? '#f5f5f5' : '#444',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    transition: 'color 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.target.style.color = '#f5f5f5'}
                  onMouseLeave={e => e.target.style.color = isActive ? '#f5f5f5' : '#444'}
                >
                  {label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: '-4px', left: 0, right: 0,
                      height: '1px', background: '#333',
                    }} />
                  )}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={data.github}
              target="_blank"
              rel="noreferrer"
              id="navbar-github-btn"
              className="btn btn-ghost"
              style={{ padding: '6px 14px', fontSize: '0.76rem' }}
            >
              GitHub
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{ background: 'none', border: 'none', color: '#f5f5f5', cursor: 'pointer', display: 'none', padding: '4px' }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: '#000', borderTop: '1px solid #181818', overflow: 'hidden' }}
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '13px 22px',
                  color: '#7d7d7d',
                  textDecoration: 'none',
                  borderBottom: '1px solid #111',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#f5f5f5'}
                onMouseLeave={e => e.target.style.color = '#7d7d7d'}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 360px) {
          #navbar .container { padding: 0 14px; }
        }
      `}</style>
    </motion.nav>
  );
}
