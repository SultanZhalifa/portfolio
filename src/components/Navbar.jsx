import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub } from 'react-icons/fi';
import { data } from '../data';
import { sections, useActiveSection } from '../hooks/useActiveSection';

const links = sections.map(({ id, label }) => ({ label, href: `#${id}`, id }));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(0.25);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <motion.nav
      id="navbar"
      role="navigation"
      aria-label="Main Navigation"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(4, 4, 4, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
        transition: 'padding 0.3s var(--ease-out), background 0.3s var(--ease-out), border-color 0.3s var(--ease-out)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {/* Brand Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff', letterSpacing: '-0.03em' }}>
            Sultan<span style={{ color: '#555555' }}>.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          {links.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    color: isActive ? '#ffffff' : '#888888',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '6px 2px',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = isActive ? '#ffffff' : '#888888'}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: '#ffffff',
                        borderRadius: '2px',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
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
              style={{ padding: '7px 15px', fontSize: '0.78rem', gap: '6px' }}
            >
              <FiGithub size={13} />
              <span>GitHub</span>
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-drawer"
          style={{
            background: 'none',
            border: '1px solid #222222',
            borderRadius: '6px',
            color: '#f5f5f5',
            cursor: 'pointer',
            display: 'none',
            padding: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#070707',
              borderTop: '1px solid #1a1a1a',
              borderBottom: '1px solid #1a1a1a',
              overflow: 'hidden',
            }}
          >
            <div className="container" style={{ padding: '14px 20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {links.map(({ label, href, id }) => {
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        color: isActive ? '#ffffff' : '#9a9a9a',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        background: isActive ? '#141414' : 'transparent',
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-mono)',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.background = '#111111';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = isActive ? '#ffffff' : '#9a9a9a';
                        e.currentTarget.style.background = isActive ? '#141414' : 'transparent';
                      }}
                    >
                      <span>{label}</span>
                      {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff' }} />}
                    </a>
                  );
                })}
                <div style={{ paddingTop: '8px', marginTop: '6px', borderTop: '1px solid #161616' }}>
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                    style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FiGithub size={14} /> Visit GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}

