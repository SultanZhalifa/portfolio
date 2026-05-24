import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiBook } from 'react-icons/fi';
import { data } from '../data';

function TimelineItem({ item, index, inView, type }) {
  const Icon = type === 'work' ? FiBriefcase : FiBook;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      style={{ display: 'flex', gap: '20px' }}
    >
      {/* Timeline left */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px',
          border: '1px solid #1c1c1c', background: '#0a0a0a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#555', position: 'relative', zIndex: 1,
        }}>
          <Icon size={14} />
        </div>
        {index < (type === 'work' ? data.experience.length - 1 : data.education.length - 1) && (
          <div style={{ width: '1px', flex: 1, background: '#141414', marginTop: '8px', minHeight: '24px' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '36px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', fontWeight: 700, color: '#e0e0e0', marginBottom: '3px' }}>
              {type === 'work' ? item.role : item.degree}
            </h3>
            <div style={{ fontSize: '0.85rem', color: '#888', fontWeight: 500 }}>
              {type === 'work' ? item.company : item.school}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '0.75rem', color: '#444', marginBottom: '2px' }}>{item.period}</div>
            <div style={{ fontSize: '0.72rem', color: '#333' }}>{item.location}</div>
          </div>
        </div>
        <ul style={{ marginTop: '12px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(item.points || []).map((pt, pi) => (
            <li key={pi} style={{ display: 'flex', gap: '10px', fontSize: '0.86rem', color: '#555', lineHeight: 1.7 }}>
              <span style={{ color: '#2a2a2a', flexShrink: 0, marginTop: '2px' }}>—</span>
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
    <section id="experience" className="section" ref={ref}
      style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111', background: '#040404' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p className="section-label">Background</p>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-sub">Industry background and academic path.</p>
        </motion.div>

        <div className="exp-grid">
          {/* Work Experience */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
              <FiBriefcase size={13} style={{ color: '#555' }} />
              <span style={{ fontSize: '0.72rem', color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Work Experience</span>
              <div style={{ flex: 1, height: '1px', background: '#141414' }} />
            </div>
            {data.experience.map((exp, i) => (
              <TimelineItem key={i} item={exp} index={i} inView={inView} type="work" />
            ))}
          </div>

          {/* Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
              <FiBook size={13} style={{ color: '#555' }} />
              <span style={{ fontSize: '0.72rem', color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Education</span>
              <div style={{ flex: 1, height: '1px', background: '#141414' }} />
            </div>
            {data.education.map((edu, i) => (
              <TimelineItem key={i} item={edu} index={i} inView={inView} type="edu" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
          gap: 56px;
        }
        @media (max-width: 640px) {
          .exp-grid { gap: 40px; }
        }
      `}</style>
    </section>
  );
}
