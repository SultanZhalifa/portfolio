import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown } from 'react-icons/fi';
import { data } from '../data';

function ProjectRow({ project, index, inView }) {
  const [open, setOpen] = useState(false);
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
          color: '#242424', letterSpacing: '0.06em', flexShrink: 0,
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
                  <ProjectRow key={project.id} project={project} index={i} inView={inView} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}
        >
          <a
            href={data.github}
            target="_blank"
            rel="noreferrer"
            id="view-all-github-btn"
            className="btn btn-ghost"
          >
            <FiGithub size={13} /> View All on GitHub
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .project-context { display: block !important; }
          .project-subtitle { display: block !important; }
        }
        @media (max-width: 640px) {
          button[id^="project-card"] { padding: 18px 0; transition: padding-left 0.2s; }
          .project-expanded { padding-left: 20px !important; }
        }
      `}</style>
    </section>
  );
}
