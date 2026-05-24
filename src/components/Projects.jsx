import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import { data } from '../data';

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const featured = data.projects.filter(p => p.featured);
  const others = data.projects.filter(p => !p.featured);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-sub">Selected work across web development, AI integration, and mobile.</p>
        </motion.div>

        {/* Featured grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '16px', marginBottom: '16px' }}>
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              className="card"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '0' }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {project.context}
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff' }}>
                    {project.title}
                  </h3>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  id={`project-${project.id}-github`}
                  style={{ color: '#444', textDecoration: 'none', transition: 'color 0.2s', flexShrink: 0 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#444'}
                >
                  <FiArrowUpRight size={18} />
                </a>
              </div>

              {/* Subtitle */}
              <p style={{ fontSize: '0.78rem', color: '#555', letterSpacing: '0.01em', marginBottom: '14px', fontStyle: 'italic' }}>
                {project.subtitle}
              </p>

              {/* Description */}
              <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '28px', flex: 1 }}>
                {project.description}
              </p>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              {/* Divider */}
              <div className="divider" style={{ marginBottom: '20px' }} />

              {/* Footer links */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#444', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#444'}
                >
                  <FiGithub size={13} /> Source Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}
                  >
                    <FiExternalLink size={13} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects */}
        {others.map((project, i) => (
          <motion.div
            key={project.id}
            id={`project-card-${project.id}`}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
            style={{ padding: '24px 28px', marginBottom: '8px' }}
            className="project-other-card"
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.7rem', color: '#444', marginBottom: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{project.context}</div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '0.95rem', fontWeight: 600, marginBottom: '6px', color: '#ddd' }}>{project.title}</h3>
              <p style={{ color: '#555', fontSize: '0.83rem', lineHeight: 1.6 }}>{project.description}</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end', maxWidth: '220px' }}>
              {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="icon-box"
              style={{ flexShrink: 0, textDecoration: 'none' }}
            >
              <FiGithub size={14} />
            </a>
          </motion.div>
        ))}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}
        >
          <a href={data.github} target="_blank" rel="noreferrer" className="btn btn-ghost" id="view-all-github-btn">
            <FiGithub size={14} /> View All on GitHub
          </a>
        </motion.div>
      </div>

      <style>{`
        .project-other-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .project-other-tags { display: flex; }
        @media (max-width: 640px) {
          .project-other-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .project-other-tags { display: none; }
        }
      `}</style>
    </section>
  );
}
