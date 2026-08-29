import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { data } from '../data';

const categoryIcons = ['01', '02', '03', '04'];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="section"
      ref={ref}
      style={{
        borderTop: '1px solid #181818',
        borderBottom: '1px solid #181818',
        background: '#020202',
        zIndex: 1,
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">
            <span className="section-number">02</span>
            <span className="section-label">Technical Skills</span>
          </div>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-sub">Tools, frameworks, and technologies across web, mobile, AI systems, and security.</p>
        </motion.div>

        {/* Skill Rows */}
        <div style={{ borderTop: '1px solid #181818' }}>
          {data.skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="skill-row"
            >
              {/* Category Column */}
              <div className="skill-label-col">
                <span className="skill-num">
                  {categoryIcons[i]}
                </span>
                <span className="skill-cat-name">
                  {group.category}
                </span>
              </div>

              {/* Items List */}
              <div className="skill-tags-col">
                {group.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Spoken Languages row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.36 }}
            className="skill-row"
          >
            <div className="skill-label-col">
              <span className="skill-num">
                05
              </span>
              <span className="skill-cat-name">
                Languages
              </span>
            </div>
            <div className="skill-tags-col">
              <span className="tag">Bahasa Indonesia — Native</span>
              <span className="tag">English — Professional Working</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .skill-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(20px, 3.5vw, 36px);
          padding: clamp(18px, 2.5vw, 24px) 0;
          border-bottom: 1px solid #141414;
          transition: background 0.2s;
        }
        .skill-row:hover {
          background: rgba(255, 255, 255, 0.015);
        }
        .skill-label-col {
          display: flex;
          align-items: center;
          min-width: 220px;
          flex-shrink: 0;
          padding-top: 3px;
        }
        .skill-num {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #707070;
          letter-spacing: 0.08em;
          margin-right: 12px;
          padding: 2px 6px;
          border-radius: 3px;
          background: #090909;
          border: 1px solid #1c1c1c;
        }
        .skill-cat-name {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          color: #c4c4c4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .skill-tags-col {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          flex: 1;
        }

        @media (max-width: 720px) {
          .skill-row {
            flex-direction: column;
            gap: 12px;
            padding: 18px 0;
          }
          .skill-label-col {
            min-width: unset;
          }
        }
        @media (max-width: 360px) {
          .skill-row {
            padding: 14px 0;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}

