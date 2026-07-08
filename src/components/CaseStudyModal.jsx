import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

function slugOf(project) {
  return project.github.split('/').pop().toLowerCase();
}

function Block({ label, children }) {
  return (
    <div>
      <div style={{
        fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: '#6e6e6e',
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px',
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: '#9a9a9a', lineHeight: 1.7 }}>
          <span style={{ color: '#555', flexShrink: 0, marginTop: '2px', fontFamily: 'JetBrains Mono', fontSize: '0.62rem' }}>—</span>
          {it}
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyModal({ project, onClose }) {
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    restoreFocusRef.current = document.activeElement;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus the close button once mounted
    const t = setTimeout(() => closeRef.current?.focus(), 30);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
      if (restoreFocusRef.current instanceof HTMLElement) restoreFocusRef.current.focus();
    };
  }, [project, onClose]);

  const cs = project?.caseStudy;

  // Rendered through a portal to document.body so the fixed overlay escapes any
  // ancestor with `contain`/`transform` (e.g. `.section { contain: content }`),
  // which would otherwise confine `position: fixed` to the section box.
  return createPortal(
    <AnimatePresence>
      {project && cs && (
        <motion.div
          key="cs-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 3000,
            background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '5vh 20px', overflowY: 'auto',
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '720px',
              background: '#080808', border: '1px solid #1c1c1c', borderRadius: '14px',
              boxShadow: '0 40px 100px -30px rgba(0,0,0,0.9)', overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close case study"
              style={{
                position: 'absolute', top: '16px', right: '16px', zIndex: 2,
                width: '34px', height: '34px', borderRadius: '8px',
                border: '1px solid #242424', background: 'rgba(0,0,0,0.5)',
                color: '#c4c4c4', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.color = '#c4c4c4'; }}
            >
              <FiX size={16} />
            </button>

            {/* Preview image */}
            <div className="cs-hero-img">
              <img
                src={`/previews/${slugOf(project)}.webp`}
                alt={`${project.title} preview`}
                loading="eager"
                onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
              />
              <div className="cs-hero-overlay" />
            </div>

            <div style={{ padding: '28px 32px 34px' }}>
              {/* Title block */}
              <div style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: '#6e6e6e',
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px',
              }}>
                {project.context}
              </div>
              <h2 style={{
                fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: 800,
                letterSpacing: '-0.02em', color: '#f5f5f5', marginBottom: '6px', lineHeight: 1.1,
              }}>
                {project.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#7d7d7d', marginBottom: '28px' }}>
                {project.subtitle}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                <Block label="The Problem">
                  <p style={{ fontSize: '0.9rem', color: '#9a9a9a', lineHeight: 1.75 }}>{cs.problem}</p>
                </Block>
                <Block label="Approach"><Bullets items={cs.approach} /></Block>
                <Block label="Outcome"><Bullets items={cs.result} /></Block>

                {/* Tech */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', paddingTop: '4px' }}>
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <FiGithub size={13} /> Source Code
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                      <FiExternalLink size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <style>{`
            .cs-hero-img {
              position: relative;
              width: 100%;
              aspect-ratio: 16 / 9;
              background: #0a0a0a;
              border-bottom: 1px solid #1c1c1c;
              overflow: hidden;
            }
            .cs-hero-img img {
              width: 100%; height: 100%; object-fit: cover; object-position: top;
              display: block;
              filter: grayscale(0.35) contrast(1.02);
              transition: filter 0.5s var(--ease-out);
            }
            .cs-hero-img:hover img { filter: grayscale(0) contrast(1); }
            .cs-hero-overlay {
              position: absolute; inset: 0; pointer-events: none;
              background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(8,8,8,0.6) 100%);
            }
            @media (max-width: 480px) {
              .cs-hero-img { aspect-ratio: 4 / 3; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
