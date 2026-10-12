import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { data } from '../data';

const groups = [...data.skills, { category: 'Languages', items: data.languages }];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="section"
      ref={ref}
      style={{ zIndex: 1, position: 'relative' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">
            <span className="section-label">Technical Skills</span>
          </div>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-sub">What I use for web, mobile, AI, and security work.</p>
        </motion.div>

        <div className="skills-grid">
          {groups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="skill-group"
            >
              <h3 className="skill-cat-name">{group.category}</h3>
              <div className="skill-tags">
                {group.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: clamp(24px, 4vw, 48px);
        }
        .skill-group {
          border-top: 1px solid #181818;
          padding: clamp(16px, 2vw, 20px) 0 clamp(18px, 2.4vw, 24px);
        }
        .skill-cat-name {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #c4c4c4;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </section>
  );
}
