import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiSearch } from 'react-icons/fi';
import { data } from '../data';
import { sections, useActiveSection } from '../hooks/useActiveSection';
import CommandPalette from './CommandPalette';

const links = sections.map(({ id, label }) => ({ label, href: `#${id}`, id }));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const activeSection = useActiveSection(0.25);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Listen to open-command-palette event from shortcuts
  useEffect(() => {
    const handleOpenCmd = () => setCmdOpen(true);
    window.addEventListener('open-command-palette', handleOpenCmd);
    return () => window.removeEventListener('open-command-palette', handleOpenCmd);
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
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="nav-cmd-trigger"
              title="Quick Actions & Search (Cmd+K)"
              aria-label="Open Command Palette"
            >
              <FiSearch size={12} />
              <span className="nav-cmd-text">Quick Actions</span>
              <kbd className="nav-cmd-kbd">⌘K</kbd>
            </button>
          </li>
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

        {/* Mobile Actions (Search + Hamburger) */}
        <div className="mobile-nav-actions">
          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            aria-label="Open search and actions"
            className="mobile-search-btn"
          >
            <FiSearch size={16} />
          </button>
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-drawer"
            className="mobile-menu-btn"
          >
            {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
          </button>
        </div>
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
                <div style={{ paddingTop: '8px', marginTop: '6px', borderTop: '1px solid #161616', display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); setCmdOpen(true); }}
                    className="btn btn-ghost"
                    style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: '0.78rem', gap: '6px' }}
                  >
                    <FiSearch size={13} /> Quick Actions
                  </button>
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                    style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: '0.78rem', gap: '6px' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FiGithub size={13} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      <style>{`
        .nav-cmd-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #090909;
          border: 1px solid #1e1e1e;
          border-radius: 6px;
          padding: 6px 11px;
          color: #888888;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-cmd-trigger:hover {
          border-color: #383838;
          color: #ffffff;
          background: #111111;
        }
        .nav-cmd-kbd {
          background: #161616;
          border: 1px solid #282828;
          border-radius: 4px;
          padding: 1px 5px;
          font-size: 0.62rem;
          color: #aaaaaa;
        }

        .mobile-nav-actions {
          display: none;
        }
        .mobile-search-btn,
        .mobile-menu-btn {
          background: #090909;
          border: 1px solid #222222;
          border-radius: 6px;
          color: #f5f5f5;
          cursor: pointer;
          padding: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, background 0.2s;
        }
        .mobile-search-btn:hover,
        .mobile-menu-btn:hover {
          border-color: #444444;
          background: #141414;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-actions { display: inline-flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}

