import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown, FiLayers, FiSearch, FiX } from 'react-icons/fi';
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
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ borderBottom: '1px solid #141414' }}
    >
      {/* Main Accordion Trigger Row */}
      <button
        id={`project-card-${project.id}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`project-content-${project.id}`}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px, 3vw, 24px)',
          padding: 'clamp(16px, 2.5vw, 24px) 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'padding-left 0.2s ease, background-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
        onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
      >
        {/* Number index */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#6e6e6e',
          letterSpacing: '0.06em',
          flexShrink: 0,
          minWidth: '24px',
        }}>
          {num}
        </span>

        {/* Project Context Badge */}
        <span
          className="project-context"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: '#8a8a8a',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            flexShrink: 0,
            minWidth: '130px',
            display: 'none',
          }}
        >
          {project.context.split(',')[0]}
        </span>

        {/* Project Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.05rem, 2.4vw, 1.35rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: open ? '#ffffff' : '#a0a0a0',
          transition: 'color 0.2s',
          flex: 1,
        }}>
          {project.title}
        </h3>

        {/* Subtitle preview (Tablet/Desktop) */}
        <span
          className="project-subtitle"
          style={{
            fontSize: '0.82rem',
            color: '#707070',
            flex: 1,
            maxWidth: '300px',
            display: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.subtitle}
        </span>

        {/* Expand / Collapse Chevron */}
        <FiChevronDown
          size={16}
          style={{
            color: open ? '#ffffff' : '#555555',
            transition: 'transform 0.25s var(--ease-out), color 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Expanded Accordion Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`project-content-${project.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="project-expanded-body">
              {/* Preview image */}
              {imgOk && (
                <button
                  type="button"
                  onClick={() => project.caseStudy && onOpenCase(project)}
                  className="project-preview-frame"
                  style={{ cursor: project.caseStudy ? 'pointer' : 'default' }}
                  aria-label={project.caseStudy ? `Open ${project.title} case study modal` : `${project.title} preview`}
                  tabIndex={project.caseStudy ? 0 : -1}
                >
                  <img
                    src={`/previews/${slugOf(project)}.webp`}
                    alt={`${project.title} screenshot preview`}
                    loading="lazy"
                    className="project-preview-img"
                    onError={() => setImgOk(false)}
                  />
                  {project.caseStudy && (
                    <span className="project-preview-badge">
                      <FiLayers size={12} /> View Detailed Case Study
                    </span>
                  )}
                </button>
              )}

              {/* Context + Description */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  color: '#808080',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  {project.context} · {project.subtitle}
                </div>
                <p style={{
                  color: '#9a9a9a',
                  fontSize: '0.88rem',
                  lineHeight: 1.8,
                  maxWidth: '680px',
                }}>
                  {project.description}
                </p>
              </div>

              {/* Tech stack badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              {/* Action buttons */}
              <div className="project-action-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  id={`project-${project.id}-github`}
                  className="btn btn-ghost"
                  style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                >
                  <FiGithub size={13} /> Source Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                  >
                    <FiExternalLink size={13} /> Live Demo
                  </a>
                )}
                {project.caseStudy && (
                  <button
                    type="button"
                    onClick={() => onOpenCase(project)}
                    id={`project-${project.id}-casestudy`}
                    className="btn btn-ghost"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.78rem',
                      gap: '6px',
                      borderColor: '#303030',
                      color: '#ffffff',
                    }}
                  >
                    <FiLayers size={13} /> Case Study →
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

const CATEGORIES = [
  { id: 'All', label: 'All', match: () => true },
  { id: 'AI & Vision', label: 'AI & Vision', match: (p) => p.tech.some(t => /AI|YOLO|Claude|Gemini|Vision|OpenCV/i.test(t)) || /AI|Vision|Hoax/i.test(p.title) },
  { id: 'Web & Full-Stack', label: 'Web & Full-Stack', match: (p) => p.tech.some(t => /Next\.js|React|Node\.js|Express|FastAPI|HTML5|Vite/i.test(t)) },
  { id: 'Mobile', label: 'Mobile Apps', match: (p) => p.tech.some(t => /Kotlin|Flutter|Android|Dart/i.test(t)) },
  { id: 'TypeScript', label: 'TypeScript', match: (p) => p.tech.some(t => /TypeScript/i.test(t)) },
  { id: 'Python', label: 'Python', match: (p) => p.tech.some(t => /Python/i.test(t)) },
];

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCase, setActiveCase] = useState(null);

  const activeCategory = CATEGORIES.find(c => c.id === filter) || CATEGORIES[0];
  const query = searchQuery.trim().toLowerCase();

  const filtered = data.projects.filter(p => {
    const matchesCategory = activeCategory.match(p);
    if (!query) return matchesCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.subtitle.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query)) ||
      p.context.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" aria-label="Selected Projects Portfolio" className="section" ref={ref} style={{ zIndex: 1, position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
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
          <p className="section-sub">End-to-end engineering across AI, computer vision, fintech, real-time distributed systems, and mobile.</p>
        </motion.div>

        {/* Controls: Filter Pills & Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="projects-toolbar"
        >
          {/* Category Pills Track */}
          <div className="projects-filter-track">
            {CATEGORIES.map(({ id, label, match }) => {
              const count = data.projects.filter(match).length;
              const isSelected = filter === id;

              return (
                <button
                  key={id}
                  onClick={() => setFilter(id)}
                  className="projects-filter-btn"
                  style={{
                    borderColor: isSelected ? '#555555' : '#1e1e1e',
                    background: isSelected ? '#161616' : 'transparent',
                    color: isSelected ? '#ffffff' : '#787878',
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#333333';
                      e.currentTarget.style.color = '#cccccc';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#1e1e1e';
                      e.currentTarget.style.color = '#787878';
                    }
                  }}
                >
                  <span>{label}</span>
                  <span style={{
                    fontSize: '0.62rem',
                    opacity: isSelected ? 1 : 0.6,
                    color: isSelected ? '#ffffff' : '#666666',
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="projects-search-box">
            <FiSearch size={13} style={{ color: '#666666', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search tech, title, or keywords…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="projects-search-input"
              aria-label="Search projects by technology, keyword, or title"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="projects-search-clear-btn"
                aria-label="Clear search input"
              >
                <FiX size={12} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Project List */}
        <div style={{ borderTop: '1px solid #181818' }}>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '48px 0', textAlign: 'center' }}
              >
                <p style={{ color: '#888888', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '12px' }}>
                  No projects found matching your criteria.
                </p>
                <button
                  type="button"
                  onClick={() => { setFilter('All'); setSearchQuery(''); }}
                  className="btn btn-ghost"
                  style={{ padding: '6px 14px', fontSize: '0.74rem' }}
                >
                  Reset filters & search
                </button>
              </motion.div>
            ) : (
              <motion.div key={`${filter}-${searchQuery}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {filtered.map((project, i) => (
                  <ProjectRow key={project.id} project={project} index={i} inView={inView} onOpenCase={setActiveCase} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live GitHub activity component */}
        <GitHubActivity />
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={activeCase} onClose={() => setActiveCase(null)} />

      <style>{`
        .projects-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .projects-filter-track {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 2px;
          -webkit-overflow-scrolling: touch;
        }

        .projects-filter-btn {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          padding: 6px 14px;
          border-radius: 6px;
          border: 1px solid;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .projects-search-box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #090909;
          border: 1px solid #1e1e1e;
          border-radius: 6px;
          padding: 6px 12px;
          min-width: 240px;
          transition: border-color 0.2s;
        }
        .projects-search-box:focus-within {
          border-color: #444444;
          background: #0d0d0d;
        }

        .projects-search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          width: 100%;
        }
        .projects-search-input::placeholder {
          color: #606060;
        }

        .projects-search-clear-btn {
          background: transparent;
          border: none;
          color: #777777;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s;
        }
        .projects-search-clear-btn:hover {
          color: #ffffff;
        }

        .project-expanded-body {
          padding-bottom: 32px;
          padding-left: clamp(16px, 4vw, 48px);
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .project-preview-frame {
          position: relative;
          display: block;
          width: 100%;
          max-width: 620px;
          aspect-ratio: 16 / 10;
          padding: 0;
          border: 1px solid #202020;
          border-radius: 12px;
          overflow: hidden;
          background: #080808;
          box-shadow: 0 16px 40px -20px rgba(0,0,0,0.9);
        }
        .project-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
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
          left: 12px;
          bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.72);
          border: 1px solid #333333;
          backdrop-filter: blur(8px);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          color: #ffffff;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
        }
        .project-preview-frame:hover .project-preview-badge,
        .project-preview-frame:focus-visible .project-preview-badge {
          opacity: 1;
          transform: translateY(0);
        }

        .project-action-links {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          padding-top: 4px;
        }

        @media (pointer: coarse) {
          .project-preview-badge {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (min-width: 768px) {
          .project-context { display: block !important; }
          .project-subtitle { display: block !important; }
        }
        @media (max-width: 768px) {
          .projects-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .projects-search-box {
            width: 100%;
            min-width: 100%;
          }
        }
        @media (max-width: 640px) {
          .project-expanded-body { padding-left: 12px !important; }
          .project-action-links .btn { flex: 1 1 calc(50% - 6px); }
        }
        @media (max-width: 360px) {
          .project-action-links .btn { flex: 1 1 100%; }
        }
      `}</style>
    </section>
  );
}

