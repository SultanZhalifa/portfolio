import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown, FiLayers } from 'react-icons/fi';
import { data } from '../data';
import GitHubActivity from './GitHubActivity';
import CaseStudyModal from './CaseStudyModal';

const slugOf = (project) => project.github.split('/').pop().toLowerCase();

function ProjectRow({ project, index, inView, onOpenCase }) {
  const [open, setOpen] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.09 }}
      style={{ borderBottom: '1px solid #111' }}
    >
      {/* Main row — clickable */}
      <button
        id={`project-card-${project.id}`}
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '24px',
          padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.paddingLeft = '8px'}
        onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
      >
        {/* Number */}
        <span style={{
          fontFamily: 'JetBrains Mono', fontSize: '0.72rem',
          color: '#5e5e5e', letterSpacing: '0.06em', flexShrink: 0,
          minWidth: '28px',
        }}>
          {num}
        </span>

        {/* Context badge */}
        <span style={{
          fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
          color: '#6e6e6e', letterSpacing: '0.08em', textTransform: 'uppercase',
          flexShrink: 0, minWidth: '130px',
          display: 'none',
        }} className="project-context">
          {project.context.split(',')[0]}
        </span>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Space Grotesk', fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
          fontWeight: 700, letterSpacing: '-0.02em',
          color: open ? '#f5f5f5' : '#888',
          transition: 'color 0.2s', flex: 1,
        }}>
          {project.title}
        </h3>

        {/* Subtitle — hide on mobile */}
        <span style={{
          fontSize: '0.8rem', color: '#6a6a6a', flex: 1,
          maxWidth: '280px', display: 'none',
        }} className="project-subtitle">
          {project.subtitle}
        </span>

        {/* Arrow */}
        <FiChevronDown
          size={15}
          style={{
            color: '#333', transition: 'transform 0.25s, color 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="project-expanded" style={{
              paddingBottom: '28px',
              paddingLeft: '52px',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              {/* Preview image */}
              {imgOk && (
                <button
                  type="button"
                  onClick={() => project.caseStudy && onOpenCase(project)}
                  className="project-preview-frame"
                  style={{ cursor: project.caseStudy ? 'pointer' : 'default' }}
                  aria-label={project.caseStudy ? `Open ${project.title} case study` : `${project.title} preview`}
                  tabIndex={project.caseStudy ? 0 : -1}
                >
                  <img
                    src={`/previews/${slugOf(project)}.webp`}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="project-preview-img"
                    onError={() => setImgOk(false)}
                  />
                  {project.caseStudy && (
                    <span className="project-preview-badge">
                      <FiLayers size={11} /> View Case Study
                    </span>
                  )}
                </button>
              )}

              {/* Context + subtitle */}
              <div>
                <div style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
                  color: '#6e6e6e', letterSpacing: '0.1em', textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  {project.context}
                </div>
                <p style={{
                  color: '#7d7d7d', fontSize: '0.875rem', lineHeight: 1.8,
                  maxWidth: '580px',
                }}>
                  {project.description}
                </p>
              </div>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  id={`project-${project.id}-github`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: '#444', textDecoration: 'none', fontSize: '0.78rem',
                    fontFamily: 'JetBrains Mono', letterSpacing: '0.04em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f5f5f5'}
                  onMouseLeave={e => e.currentTarget.style.color = '#444'}
                >
                  <FiGithub size={12} /> Source Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      color: '#444', textDecoration: 'none', fontSize: '0.78rem',
                      fontFamily: 'JetBrains Mono', letterSpacing: '0.04em',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f5f5f5'}
                    onMouseLeave={e => e.currentTarget.style.color = '#444'}
                  >
                    <FiExternalLink size={12} /> Live Demo
                  </a>
                )}
                {project.caseStudy && (
                  <button
                    type="button"
                    onClick={() => onOpenCase(project)}
                    id={`project-${project.id}-casestudy`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      color: '#c4c4c4', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '0.78rem', fontFamily: 'JetBrains Mono', letterSpacing: '0.04em',
                      transition: 'color 0.2s', padding: 0,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f5f5f5'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c4c4c4'}
                  >
                    <FiLayers size={12} /> View Case Study →
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState('All');
  const [activeCase, setActiveCase] = useState(null);

  // Collect unique tech tags across all projects
  const allTags = ['All', ...Array.from(new Set(data.projects.flatMap(p => p.tech)))];
  const filtered = filter === 'All'
    ? data.projects
    : data.projects.filter(p => p.tech.includes(filter));

  return (
    <section id="projects" className="section" ref={ref} style={{ zIndex: 1, position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">
            <span className="section-number">03</span>
            <span className="section-label">Portfolio</span>
          </div>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-sub">Work across web, mobile, AI integration, and competition entries.</p>
        </motion.div>

        {/* Tech filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}
        >
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.68rem',
                letterSpacing: '0.04em', padding: '4px 12px',
                borderRadius: '4px', border: '1px solid',
                borderColor: filter === tag ? '#555' : '#1e1e1e',
                background: filter === tag ? '#111' : 'transparent',
                color: filter === tag ? '#f5f5f5' : '#3a3a3a',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (filter !== tag) { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888'; } }}
              onMouseLeave={e => { if (filter !== tag) { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#3a3a3a'; } }}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Project list */}
        <div style={{ borderTop: '1px solid #111' }}>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '32px 0', color: '#6a6a6a', fontFamily: 'JetBrains Mono', fontSize: '0.75rem' }}
              >
                No projects with {filter} yet.
              </motion.p>
            ) : (
              <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {filtered.map((project, i) => (
                  <ProjectRow key={project.id} project={project} index={i} inView={inView} onOpenCase={setActiveCase} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live GitHub activity (replaces the old static CTA) */}
        <GitHubActivity />
      </div>

      {/* Case-study modal */}
      <CaseStudyModal project={activeCase} onClose={() => setActiveCase(null)} />

      <style>{`
        .project-preview-frame {
          position: relative;
          display: block;
          width: 100%;
          max-width: 580px;
          aspect-ratio: 16 / 10;
          padding: 0;
          border: 1px solid #1a1a1a;
          border-radius: 10px;
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 18px 44px -24px rgba(0,0,0,0.85);
        }
        .project-preview-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          display: block;
          filter: grayscale(100%) contrast(1.02);
          transition: filter 0.5s var(--ease-out), transform 0.6s var(--ease-out);
        }
        .project-preview-frame:hover .project-preview-img {
          filter: grayscale(0%) contrast(1);
          transform: scale(1.025);
        }
        .project-preview-badge {
          position: absolute;
          left: 12px; bottom: 12px;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 11px;
          border-radius: 5px;
          background: rgba(0,0,0,0.62);
          border: 1px solid #2a2a2a;
          backdrop-filter: blur(6px);
          font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.04em;
          color: #e4e4e4;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
        }
        .project-preview-frame:hover .project-preview-badge,
        .project-preview-frame:focus-visible .project-preview-badge {
          opacity: 1; transform: translateY(0);
        }
        @media (pointer: coarse) {
          .project-preview-badge { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 768px) {
          .project-context { display: block !important; }
          .project-subtitle { display: block !important; }
        }
        @media (max-width: 640px) {
          button[id^="project-card"] { padding: 18px 0; transition: padding-left 0.2s; }
          .project-expanded { padding-left: 20px !important; }
        }
        @media (max-width: 360px) {
          button[id^="project-card"] { padding: 14px 0; gap: 12px !important; }
          .project-expanded { padding-left: 12px !important; padding-bottom: 20px !important; }
        }
      `}</style>
    </section>
  );
}
