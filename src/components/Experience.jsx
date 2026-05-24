import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiBook } from 'react-icons/fi';
import { data } from '../data';

function TimelineItem({ item, index, inView, type, isLast }) {
  const Icon = type === 'work' ? FiBriefcase : FiBook;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      style={{ display: 'flex', gap: '20px' }}
    >
      {/* Timeline indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '6px',
          border: '1px solid #1c1c1c', background: '#080808',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#333', position: 'relative', zIndex: 1, flexShrink: 0,
        }}>
          <Icon size={12} />
        </div>
        {!isLast && (
          <div style={{ width: '1px', flex: 1, background: '#141414', marginTop: '8px', minHeight: '20px' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? '0' : '40px', flex: 1 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '4px',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'Space Grotesk', fontSize: '0.95rem',
              fontWeight: 700, color: '#ddd', marginBottom: '3px',
              letterSpacing: '-0.01em',
            }}>
              {type === 'work' ? item.role : item.degree}
            </h3>
            <div style={{ fontSize: '0.82rem', color: '#555', fontWeight: 500 }}>
              {type === 'work' ? item.company : item.school}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
              color: '#333', letterSpacing: '0.04em', marginBottom: '2px',
            }}>
              {item.period}
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
              color: '#252525', letterSpacing: '0.02em',
            }}>
              {item.location}
            </div>
          </div>
        </div>

        <ul style={{
          marginTop: '14px', paddingLeft: '0', listStyle: 'none',
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          {(item.points || []).map((pt, pi) => (
            <li key={pi} style={{ display: 'flex', gap: '12px', fontSize: '0.83rem', color: '#484848', lineHeight: 1.75 }}>
              <span style={{ color: '#222', flexShrink: 0, marginTop: '3px', fontFamily: 'JetBrains Mono', fontSize: '0.65rem' }}>—</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111', background: '#030303', zIndex: 1, position: 'relative' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">
            <span className="section-number">04</span>
            <span className="section-label">Background</span>
          </div>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-sub">Academic path and industry background that shaped my discipline, attention to detail, and systematic approach to engineering.</p>
        </motion.div>

        <div className="exp-grid">
          {/* Work */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
              <FiBriefcase size={12} style={{ color: '#333' }} />
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
                color: '#2a2a2a', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                Work Experience
              </span>
              <div style={{ flex: 1, height: '1px', background: '#141414' }} />
            </div>
            {data.experience.map((exp, i) => (
              <TimelineItem
                key={i} item={exp} index={i} inView={inView}
                type="work" isLast={i === data.experience.length - 1}
              />
            ))}
          </div>

          {/* Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
              <FiBook size={12} style={{ color: '#333' }} />
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
                color: '#2a2a2a', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                Education
              </span>
              <div style={{ flex: 1, height: '1px', background: '#141414' }} />
            </div>
            {data.education.map((edu, i) => (
              <TimelineItem
                key={i} item={edu} index={i} inView={inView}
                type="edu" isLast={i === data.education.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
          gap: 64px;
        }
        @media (max-width: 640px) {
          .exp-grid { gap: 48px; }
        }
      `}</style>
    </section>
  );
}
