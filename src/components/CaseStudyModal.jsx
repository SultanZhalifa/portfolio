import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import { previewOf } from '../lib/preview';

function Block({ label, children }) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.66rem',
        color: '#808080',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '10px',
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.88rem', color: '#a0a0a0', lineHeight: 1.75 }}>
          <span style={{ color: '#808080', flexShrink: 0, marginTop: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>—</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }) {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: '14px', fontSize: '0.88rem', color: '#b0b0b0', lineHeight: 1.75 }}>
          <span aria-hidden="true" style={{
            flexShrink: 0,
            width: '22px',
            height: '22px',
            marginTop: '2px',
            borderRadius: '6px',
            border: '1px solid #2a2a2a',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.66rem',
            color: '#c4c4c4',
          }}>
            {i + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

function Decisions({ items }) {
  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {items.map((d) => (
        <div key={d.title} style={{ border: '1px solid #1e1e1e', borderRadius: '10px', padding: '14px 16px', background: '#0b0b0b' }}>
          <div style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600, marginBottom: '4px' }}>{d.title}</div>
          <div style={{ fontSize: '0.86rem', color: '#a8a8a8', lineHeight: 1.7 }}>{d.text}</div>
        </div>
      ))}
    </div>
  );
}

function MetricsTable({ metrics }) {
  return (
    <div>
      <div style={{ overflowX: 'auto', border: '1px solid #1e1e1e', borderRadius: '10px' }}>
        <table className="cs-metrics">
          <caption className="sr-only">{metrics.caption}</caption>
          <thead>
            <tr>{metrics.columns.map((c, i) => <th key={c} scope="col" style={{ textAlign: i < 2 ? 'left' : 'right' }}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {metrics.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => i === 0
                  ? <th key={i} scope="row" style={{ textAlign: 'left' }}>{cell}</th>
                  : <td key={i} style={{ textAlign: i < 2 ? 'left' : 'right' }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p aria-hidden="true" style={{ fontSize: '0.76rem', color: '#8a8a8a', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>{metrics.caption}</p>
    </div>
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
    const t = setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
      if (restoreFocusRef.current instanceof HTMLElement) restoreFocusRef.current.focus();
    };
  }, [project, onClose]);

  const cs = project?.caseStudy;

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
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 'clamp(16px, 4vh, 48px) clamp(12px, 3vw, 24px)',
            overflowY: 'auto',
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} detailed case study`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            className="cs-modal-box"
          >
            {/* Close Button */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close case study dialog"
              className="cs-close-btn"
            >
              <FiX size={18} />
            </button>

            {/* Preview image */}
            {previewOf(project) && (
              <div className="cs-hero-img">
                <img
                  src={previewOf(project)}
                  alt={`Screenshot of ${project.title}: ${project.subtitle}`}
                  loading="eager"
                  onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
                />
                <div className="cs-hero-overlay" />
              </div>
            )}

            <div className="cs-body-content">
              {/* Title Header */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                color: '#808080',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {project.context}
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                marginBottom: '6px',
                lineHeight: 1.15,
              }}>
                {project.title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#888888', marginBottom: '28px' }}>
                {project.subtitle}
              </p>
              {cs.team && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#a0a0a0', marginTop: '-18px', marginBottom: '28px' }}>
                  {cs.team}
                </p>
              )}

              {/* Problem / Approach / Outcome Blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Block label="The Problem">
                  <p style={{ fontSize: '0.9rem', color: '#a8a8a8', lineHeight: 1.8 }}>{cs.problem}</p>
                </Block>
                {cs.flow
                  ? <Block label="How It Works"><Steps items={cs.flow} /></Block>
                  : cs.approach && <Block label="What I Built"><Bullets items={cs.approach} /></Block>}
                {cs.decisions && <Block label="Decisions"><Decisions items={cs.decisions} /></Block>}
                {cs.metrics && <Block label="Model Results"><MetricsTable metrics={cs.metrics} /></Block>}
                <Block label="Results"><Bullets items={cs.result} /></Block>
                {cs.limits && <Block label="Known Limits"><Bullets items={cs.limits} /></Block>}

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '4px' }}>
                  {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                {/* Direct Action Links */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '8px' }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost"
                      style={{ padding: '10px 18px', fontSize: '0.82rem' }}
                    >
                      <FiGithub size={14} /> Source Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      style={{ padding: '10px 18px', fontSize: '0.82rem' }}
                    >
                      <FiExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <style>{`
            .cs-modal-box {
              width: 100%;
              max-width: 740px;
              background: #080808;
              border: 1px solid #202020;
              border-radius: 16px;
              box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.95);
              overflow: hidden;
              position: relative;
              margin: auto 0;
            }
            .cs-close-btn {
              position: absolute;
              top: 16px;
              right: 16px;
              z-index: 10;
              width: 38px;
              height: 38px;
              border-radius: 8px;
              border: 1px solid #282828;
              background: rgba(8, 8, 8, 0.7);
              backdrop-filter: blur(8px);
              color: #cccccc;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
            }
            .cs-close-btn:hover {
              border-color: #555555;
              color: #ffffff;
              background: #161616;
            }
            .cs-hero-img {
              position: relative;
              width: 100%;
              aspect-ratio: 16 / 9;
              background: #0a0a0a;
              border-bottom: 1px solid #1c1c1c;
              overflow: hidden;
            }
            .cs-hero-img img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: top;
              display: block;
              filter: grayscale(0.2) contrast(1.02);
              transition: filter 0.4s var(--ease-out);
            }
            .cs-hero-img:hover img {
              filter: grayscale(0) contrast(1);
            }
            .cs-hero-overlay {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(8,8,8,0.7) 100%);
            }
            .cs-metrics {
              width: 100%;
              min-width: 520px;
              border-collapse: collapse;
              font-family: var(--font-mono);
              font-size: 0.74rem;
              color: #b0b0b0;
            }
            .cs-metrics th, .cs-metrics td { padding: 9px 12px; border-bottom: 1px solid #1a1a1a; white-space: nowrap; }
            .cs-metrics thead th { color: #8a8a8a; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; font-size: 0.64rem; background: #0b0b0b; }
            .cs-metrics tbody th { color: #ffffff; font-weight: 600; }
            .cs-metrics tbody tr:last-child th, .cs-metrics tbody tr:last-child td { border-bottom: none; }
            .cs-body-content {
              padding: clamp(20px, 3.5vw, 36px);
            }
            @media (max-width: 480px) {
              .cs-modal-box {
                border-radius: 12px;
              }
              .cs-hero-img {
                aspect-ratio: 4 / 3;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

