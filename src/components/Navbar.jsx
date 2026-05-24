import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub } from 'react-icons/fi';
import { data } from '../data';

const links = [
  { label: 'About',          href: '#hero' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '14px 0' : '20px 0',
        background: scrolled ? 'rgba(0,0,0,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid #1c1c1c' : 'none',
        transition: 'all 0.35s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.01em' }}>
            {data.nameShort}<span style={{ color: '#444' }}>.</span>
          </span>
        </a>

        <ul style={{ display: 'flex', gap: '40px', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                style={{ color: '#555', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.03em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#555'}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={data.github}
              target="_blank"
              rel="noreferrer"
              id="navbar-github-btn"
              className="btn btn-ghost"
              style={{ padding: '7px 16px', fontSize: '0.8rem', gap: '6px' }}
            >
              <FiGithub size={13} /> GitHub
            </a>
          </li>
        </ul>

        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'none' }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: '#000', borderTop: '1px solid #1c1c1c' }}
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '14px 24px', color: '#555', textDecoration: 'none', borderBottom: '1px solid #111', fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#555'}
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
      `}</style>
    </motion.nav>
  );
}
