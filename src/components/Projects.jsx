import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown, FiLayers, FiSearch, FiX } from 'react-icons/fi';
import { data } from '../data';
import GitHubActivity from './GitHubActivity';
import { previewOf } from '../lib/preview';
import { caseHref, rememberOrigin } from '../lib/route';

const MAX_CARD_TAGS = 5;

function ProjectLinks({ project, size = 'md' }) {
  const pad = size === 'sm' ? '7px 14px' : '8px 16px';
  return (
    <div className="project-action-links">
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: pad, fontSize: '0.78rem', gap: '6px' }}>
          <FiExternalLink size={13} /> Live demo
        </a>
      )}
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: pad, fontSize: '0.78rem', gap: '6px' }}>
          <FiGithub size={13} /> Source
        </a>
      )}
      {project.caseStudy && (
        <a href={caseHref(project)} onClick={rememberOrigin} className="btn btn-ghost" style={{ padding: pad, fontSize: '0.78rem', gap: '6px' }}>
          <FiLayers size={13} /> Case study
        </a>
      )}
    </div>
  );
}

function Preview({ project, className, allowHighlight = false }) {
  const [ok, setOk] = useState(true);
  const src = previewOf(project);
  if (!src || !ok) {
    if (!allowHighlight || !project.highlight) return null;
    return (
      <div className={`project-preview-frame project-highlight ${className || ''}`} aria-hidden="true">
        <span className="project-highlight-value">{project.highlight.value}</span>
        <span className="project-highlight-label">{project.highlight.label}</span>
        <span className="project-highlight-stack">{project.tech.slice(0, 4).join(' · ')}</span>
      </div>
    );
  }
  const img = (
    <img
      src={src}
      alt={`Screenshot of ${project.title}: ${project.subtitle}`}
      loading="lazy"
      width="1000"
      height="625"
      className="project-preview-img"
      onError={() => setOk(false)}
    />
  );
  // Clicking the screenshot opens the case study when there is one, otherwise the live demo.
  if (project.caseStudy) {
    return (
      <a href={caseHref(project)} onClick={rememberOrigin} className={`project-preview-frame ${className || ''}`} aria-label={`Open the ${project.title} case study`}>
        {img}
      </a>
    );
  }
  if (project.demo) {
    return (
      <a href={project.demo} target="_blank" rel="noreferrer" className={`project-preview-frame ${className || ''}`} aria-label={`Open the ${project.title} live demo`}>
        {img}
      </a>
    );
  }
  return <div className={`project-preview-frame ${className || ''}`}>{img}</div>;
}

function FeaturedCard({ project, index, lead }) {
  const extra = project.tech.length - MAX_CARD_TAGS;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
      className={`featured-card ${lead ? 'featured-card--lead' : ''}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      <Preview project={project} className="featured-preview" allowHighlight />

      <div className="featured-body">
        <div className="project-meta-line">
          <span>{project.context}</span>
          {project.period && <span className="project-period">{project.period}</span>}
        </div>

        <h3 id={`project-title-${project.id}`} className="featured-title">{project.title}</h3>
        <p className="featured-subtitle">
          {project.subtitle}
          {project.role && <span className="featured-role"> · {project.role}</span>}
        </p>

        <p className="project-summary">{project.summary}</p>
        {project.result && (
          <p className="project-result">
            <span className="project-result-label">Result</span>
            {project.result}
          </p>
        )}

        <div className="project-tags">
          {project.tech.slice(0, MAX_CARD_TAGS).map(t => <span key={t} className="tag">{t}</span>)}
          {extra > 0 && <span className="tag tag-more" title={project.tech.slice(MAX_CARD_TAGS).join(', ')}>+{extra}</span>}
        </div>

        <ProjectLinks project={project} size="sm" />
      </div>
    </motion.article>
  );
}

function ProjectRow({ project, index }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="project-row">
      <h3 className="project-row-heading">
      <button
        id={`project-card-${project.id}`}
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`project-content-${project.id}`}
        className="project-row-trigger"
      >
        <span className="project-row-num" aria-hidden="true">{num}</span>
        <span className="project-row-main">
          <span className="project-row-title" style={{ color: open ? '#ffffff' : '#c4c4c4' }}>{project.title}</span>
          <span className="project-row-subtitle">{project.subtitle}</span>
        </span>
        <span className="project-row-period">{project.period || ''}</span>
        <FiChevronDown
          size={16}
          aria-hidden="true"
          style={{
            color: open ? '#ffffff' : '#808080',
            transition: 'transform 0.25s var(--ease-out), color 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`project-content-${project.id}`}
            role="region"
            aria-labelledby={`project-card-${project.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="project-expanded-body">
              <Preview project={project} className="row-preview" />
              <div>
                <div className="project-meta-line">
                  <span>{[project.context, project.role].filter(Boolean).join(' · ')}</span>
                </div>
                <p className="project-summary">{project.summary}</p>
                {project.result && (
                  <p className="project-result">
                    <span className="project-result-label">Result</span>
                    {project.result}
                  </p>
                )}
              </div>
              <div className="project-tags">
                {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <ProjectLinks project={project} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CATEGORIES = [
  { id: 'All', label: 'All', match: () => true },
  { id: 'AI & Vision', label: 'AI & Vision', match: (p) => Boolean(p.ai) },
  { id: 'Web & Full-Stack', label: 'Web & Full-Stack', match: (p) => p.tech.some(t => /Next\.js|React|Node\.js|Express|FastAPI|HTML|Vite/i.test(t)) },
  { id: 'Mobile', label: 'Mobile Apps', match: (p) => p.tech.some(t => /Kotlin|Flutter|Android|Dart/i.test(t)) },
  { id: 'TypeScript', label: 'TypeScript', match: (p) => p.tech.some(t => /TypeScript/i.test(t)) },
  { id: 'Python', label: 'Python', match: (p) => p.tech.some(t => /Python/i.test(t)) },
];

const matchesQuery = (p, q) =>
  [p.title, p.subtitle, p.summary, p.result, p.role, p.context, ...p.tech]
    .filter(Boolean)
    .some(s => s.toLowerCase().includes(q));

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = CATEGORIES.find(c => c.id === filter) || CATEGORIES[0];
  const query = searchQuery.trim().toLowerCase();
  const visible = data.projects.filter(p => activeCategory.match(p) && (!query || matchesQuery(p, query)));
  const featured = visible.filter(p => p.featured);
  const others = visible.filter(p => !p.featured);
  const filtering = filter !== 'All' || query !== '';

  return (
    <section id="projects" aria-label="Projects" className="section" ref={ref} style={{ zIndex: 1, position: 'relative' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">
            <span className="section-label">Portfolio</span>
          </div>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-sub">AI, fintech, web, and mobile projects, from hackathons and competitions to personal builds.</p>
        </motion.div>

        {/* Filters + search apply to both the cards and the list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="projects-toolbar"
        >
          <div className="projects-filter-track" role="group" aria-label="Filter projects">
            {CATEGORIES.map(({ id, label, match }) => {
              const count = data.projects.filter(match).length;
              const isSelected = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  aria-pressed={isSelected}
                  className={`projects-filter-btn ${isSelected ? 'is-selected' : ''}`}
                >
                  <span>{label}</span>
                  <span className="projects-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="projects-search-box">
            <FiSearch size={13} style={{ color: '#808080', flexShrink: 0 }} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search tech, title, or keywords…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="projects-search-input"
              aria-label="Search projects by technology, keyword, or title"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="projects-search-clear-btn" aria-label="Clear search">
                <FiX size={12} />
              </button>
            )}
          </div>
        </motion.div>

        <p className="sr-only" aria-live="polite">
          {filtering ? `${visible.length} project${visible.length === 1 ? '' : 's'} shown` : ''}
        </p>

        {visible.length === 0 && (
          <div style={{ padding: '48px 0', textAlign: 'center', borderTop: '1px solid #181818' }}>
            <p style={{ color: '#a0a0a0', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '12px' }}>
              No projects match that filter.
            </p>
            <button type="button" onClick={() => { setFilter('All'); setSearchQuery(''); }} className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: '0.74rem' }}>
              Reset filters and search
            </button>
          </div>
        )}

        {featured.length > 0 && (
          <div className="featured-grid">
            {featured.map((project, i) => (
              <FeaturedCard
                key={project.id}
                project={project}
                index={i}
                lead={i === 0 && featured.length % 2 === 1}
              />
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div style={{ marginTop: featured.length > 0 ? 'clamp(40px, 6vw, 64px)' : 0 }}>
            {featured.length > 0 && (
              <div className="projects-subhead">
                <span>More projects</span>
                <span className="projects-subhead-line" />
              </div>
            )}
            <div style={{ borderTop: '1px solid #181818' }}>
              {others.map((project, i) => (
                <ProjectRow key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        <GitHubActivity />
      </div>

      <style>{`
        .projects-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .projects-filter-track {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .projects-filter-btn {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          padding: 6px 14px;
          border-radius: 6px;
          border: 1px solid #262626;
          background: transparent;
          color: #a0a0a0;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .projects-filter-btn:hover { border-color: #3a3a3a; color: #e0e0e0; }
        .projects-filter-btn.is-selected { border-color: #5a5a5a; background: #161616; color: #ffffff; }
        .projects-filter-count { font-size: 0.62rem; color: #808080; }
        .projects-filter-btn.is-selected .projects-filter-count { color: #ffffff; }

        .projects-search-box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #090909;
          border: 1px solid #262626;
          border-radius: 6px;
          padding: 6px 12px;
          min-width: 240px;
          transition: border-color 0.2s;
        }
        .projects-search-box:focus-within { border-color: #5a5a5a; background: #0d0d0d; }
        .projects-search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          width: 100%;
        }
        .projects-search-input::placeholder { color: #808080; }
        .projects-search-input::-webkit-search-cancel-button { display: none; }
        .projects-search-clear-btn {
          background: transparent;
          border: none;
          color: #a0a0a0;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
        }
        .projects-search-clear-btn:hover { color: #ffffff; }

        /* ── Featured cards ───────────────────────────── */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2.4vw, 24px);
        }
        .featured-card {
          display: flex;
          flex-direction: column;
          background: #070707;
          border: 1px solid #1c1c1c;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s var(--ease-out);
        }
        .featured-card:hover, .featured-card:focus-within { border-color: #333333; }
        .featured-card .project-preview-frame {
          border: none;
          border-bottom: 1px solid #1c1c1c;
          border-radius: 0;
          max-width: none;
          box-shadow: none;
        }
        .featured-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: clamp(18px, 2.4vw, 26px);
          flex: 1;
        }
        .featured-body .project-action-links { margin-top: auto; padding-top: 6px; }
        .featured-title {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2.2vw, 1.55rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          line-height: 1.15;
        }
        .featured-subtitle { font-size: 0.86rem; color: #a0a0a0; margin-top: -6px; }
        .featured-role { color: #808080; }

        /* Lead card: screenshot beside the text on wide screens */
        .featured-card--lead { grid-column: 1 / -1; }
        @media (min-width: 900px) {
          .featured-card--lead { flex-direction: row; }
          .featured-card--lead .project-preview-frame {
            flex: 0 0 56%;
            aspect-ratio: auto;
            min-height: 100%;
            border-bottom: none;
            border-right: 1px solid #1c1c1c;
          }
          .featured-card--lead .featured-title { font-size: clamp(1.5rem, 2.6vw, 1.9rem); }
        }

        /* ── Shared bits ─────────────────────────────── */
        .project-meta-line {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          color: #8a8a8a;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .project-period { color: #a0a0a0; white-space: nowrap; }
        .project-summary { color: #b0b0b0; font-size: 0.9rem; line-height: 1.7; max-width: 680px; }
        .project-result { color: #b0b0b0; font-size: 0.88rem; line-height: 1.7; max-width: 680px; }
        .project-result-label {
          font-family: var(--font-mono);
          font-size: 0.64rem;
          color: #8a8a8a;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-right: 10px;
        }
        .project-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag-more { color: #a0a0a0; }

        .project-preview-frame {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          padding: 0;
          border: 1px solid #202020;
          border-radius: 12px;
          overflow: hidden;
          background: #0b0b0b;
          cursor: pointer;
        }
        div.project-preview-frame { cursor: default; }
        .project-highlight {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: clamp(24px, 4vw, 40px);
          background:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px) 0 0 / 32px 32px,
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px) 0 0 / 32px 32px,
            #0b0b0b;
        }
        .project-highlight-value {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(3.5rem, 8vw, 5.5rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: #ffffff;
        }
        .project-highlight-label {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a0a0a0;
        }
        .project-highlight-stack {
          margin-top: 14px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #808080;
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
        .featured-card:hover .project-preview-img,
        .project-preview-frame:hover .project-preview-img,
        .project-preview-frame:focus-visible .project-preview-img {
          filter: grayscale(0%) contrast(1);
          transform: scale(1.02);
        }
        .project-preview-frame:focus-visible { outline: 2px solid #ffffff; outline-offset: -2px; }

        .project-action-links { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }

        /* ── Compact list ────────────────────────────── */
        .projects-subhead {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #a0a0a0;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .projects-subhead-line { flex: 1; height: 1px; background: #181818; }
        .project-row { border-bottom: 1px solid #141414; }
        .project-row-heading { font: inherit; margin: 0; }
        .project-row-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: clamp(12px, 3vw, 24px);
          padding: clamp(14px, 2vw, 20px) 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: inherit;
        }
        .project-row-trigger:hover .project-row-title { color: #ffffff !important; }
        .project-row-num {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #808080;
          letter-spacing: 0.06em;
          flex-shrink: 0;
          min-width: 24px;
        }
        .project-row-main {
          flex: 1;
          min-width: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: baseline;
          gap: 4px 24px;
        }
        .project-row-title {
          font-family: var(--font-display);
          font-size: clamp(1.02rem, 2vw, 1.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          transition: color 0.2s;
        }
        .project-row-subtitle { font-size: 0.84rem; color: #8a8a8a; }
        .project-row-period {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #8a8a8a;
          white-space: nowrap;
          flex: 0 0 9.5rem;
          text-align: right;
        }
        .project-expanded-body {
          padding: 4px 0 32px clamp(0px, 4vw, 48px);
          display: grid;
          gap: 18px;
        }
        .row-preview { max-width: 620px; }

        @media (max-width: 899px) {
          .featured-grid { grid-template-columns: minmax(0, 1fr); }
        }
        @media (max-width: 768px) {
          .projects-toolbar { flex-direction: column; align-items: stretch; gap: 12px; }
          .projects-search-box { width: 100%; min-width: 0; }
          .project-row-main { grid-template-columns: minmax(0, 1fr); }
          .project-row-period { display: none; }
        }
        @media (max-width: 640px) {
          .project-expanded-body { padding-left: 0; }
          .project-action-links .btn { flex: 1 1 calc(50% - 5px); }
        }
        @media (max-width: 360px) {
          .project-action-links .btn { flex: 1 1 100%; }
        }
      `}</style>
    </section>
  );
}
