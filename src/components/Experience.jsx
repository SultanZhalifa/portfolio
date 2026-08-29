import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiBook, FiUsers } from 'react-icons/fi';
import { data } from '../data';

function TimelineItem({ item, index, inView, type, isLast }) {
  const Icon = type === 'work' ? FiBriefcase : FiBook;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{ display: 'flex', gap: '18px' }}
    >
      {/* Timeline indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          border: '1px solid #202020',
          background: '#080808',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888888',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
        }}>
          <Icon size={13} />
        </div>
        {!isLast && (
          <div style={{ width: '1px', flex: 1, background: '#181818', marginTop: '6px', minHeight: '24px' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? '0' : '36px', flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '6px',
        }}>
          <div style={{ flex: '1 1 200px', minWidth: 0 }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.98rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '2px',
              letterSpacing: '-0.01em',
              overflowWrap: 'break-word',
            }}>
              {type === 'work' ? item.role : item.degree}
            </h3>
            <div style={{ fontSize: '0.84rem', color: '#909090', fontWeight: 500, overflowWrap: 'break-word' }}>
              {type === 'work' ? item.company : item.school}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: '#707070',
              letterSpacing: '0.04em',
              marginBottom: '2px',
            }}>
              {item.period}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: '#555555',
              letterSpacing: '0.02em',
            }}>
              {item.location}
            </div>
          </div>
        </div>

        <ul style={{
          marginTop: '12px',
          paddingLeft: '0',
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {(item.points || []).map((pt, pi) => (
            <li key={pi} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: '#9a9a9a', lineHeight: 1.75 }}>
              <span style={{ color: '#555555', flexShrink: 0, marginTop: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>—</span>
              <span className="text-break">{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="experience"
      aria-label="Experience and Education Background"
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
          <p className="section-sub">My professional roles, academic foundation, and community leadership behind how I build production-grade systems.</p>
        </motion.div>

        <div className="exp-grid">
          {/* Work Experience */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <FiBriefcase size={14} style={{ color: '#888888' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#a0a0a0',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                Work Experience
              </span>
              <div style={{ flex: 1, height: '1px', background: '#181818' }} />
            </div>
            {data.experience.map((exp, i) => (
              <TimelineItem
                key={i}
                item={exp}
                index={i}
                inView={inView}
                type="work"
                isLast={i === data.experience.length - 1}
              />
            ))}
          </div>

          {/* Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <FiBook size={14} style={{ color: '#888888' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#a0a0a0',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                Education
              </span>
              <div style={{ flex: 1, height: '1px', background: '#181818' }} />
            </div>
            {data.education.map((edu, i) => (
              <TimelineItem
                key={i}
                item={edu}
                index={i}
                inView={inView}
                type="edu"
                isLast={i === data.education.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Organizations & Activities */}
        {data.activities && data.activities.length > 0 && (
          <div style={{ marginTop: 'clamp(48px, 7vw, 64px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <FiUsers size={14} style={{ color: '#888888' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#a0a0a0',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                Organizations & Activities
              </span>
              <div style={{ flex: 1, height: '1px', background: '#181818' }} />
            </div>
            {data.activities.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{ display: 'flex', gap: '18px' }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid #202020',
                    background: '#080808',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888888',
                    flexShrink: 0,
                  }}>
                    <FiUsers size={13} />
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '4px',
                  }}>
                    <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '2px',
                        letterSpacing: '-0.01em',
                        overflowWrap: 'break-word',
                      }}>
                        {act.title}
                      </h3>
                      <div style={{ fontSize: '0.84rem', color: '#909090', fontWeight: 500 }}>
                        {act.role}{act.org ? ` — ${act.org}` : ''}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: '#707070',
                        letterSpacing: '0.04em',
                      }}>
                        {act.date}
                      </div>
                    </div>
                  </div>
                  <ul style={{
                    marginTop: '12px',
                    paddingLeft: '0',
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}>
                    {(act.points || []).map((pt, pi) => (
                      <li key={pi} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: '#9a9a9a', lineHeight: 1.75 }}>
                        <span style={{ color: '#555555', flexShrink: 0, marginTop: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>—</span>
                        <span className="text-break">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: clamp(36px, 5vw, 64px);
        }
        @media (max-width: 640px) {
          .exp-grid { gap: 36px; }
        }
      `}</style>
    </section>
  );
}

