import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { data } from '../data';

const categoryIcons = ['01', '02', '03', '04'];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111', zIndex: 1, position: 'relative' }}
    >
      <div className="container">
        {/* Header */}
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
          <p className="section-sub">Tools and technologies across development, AI, mobile, and security.</p>
        </motion.div>

        {/* Skill rows */}
        <div style={{ borderTop: '1px solid #111' }}>
          {data.skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.09 }}
              className="skill-row"
              onMouseEnter={e => e.currentTarget.style.background = '#060606'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              style={{ transition: 'background 0.2s' }}
            >
              {/* Left column: category */}
              <div className="skill-label-col">
                <span style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
                  color: '#808080', letterSpacing: '0.06em', marginRight: '12px',
                }}>
                  {categoryIcons[i]}
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.68rem',
                  color: '#9a9a9a', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontWeight: 500,
                }}>
                  {group.category}
                </span>
              </div>

              {/* Right column: items */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                {group.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Languages row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="skill-row"
            onMouseEnter={e => e.currentTarget.style.background = '#060606'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            style={{ transition: 'background 0.2s' }}
          >
            <div className="skill-label-col">
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
                color: '#808080', letterSpacing: '0.06em', marginRight: '12px',
              }}>
                05
              </span>
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.68rem',
                color: '#9a9a9a', letterSpacing: '0.1em', textTransform: 'uppercase',
                fontWeight: 500,
              }}>
                Languages
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
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
          gap: 24px;
          padding: 22px 0;
          border-bottom: 1px solid #111;
        }
        .skill-label-col {
          display: flex;
          align-items: center;
          min-width: 200px;
          flex-shrink: 0;
          padding-top: 2px;
        }
        @media (max-width: 640px) {
          .skill-row { flex-direction: column; gap: 12px; padding: 18px 0; }
          .skill-label-col { min-width: unset; }
        }
      `}</style>
    </section>
  );
}
