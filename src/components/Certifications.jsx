import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { data } from '../data';

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="section" ref={ref} style={{ zIndex: 1, position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">
            <span className="section-number">05</span>
            <span className="section-label">Credentials</span>
          </div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-sub">Verified credentials from industry-recognized programs.</p>
        </motion.div>

        {/* Table list */}
        <div style={{ borderTop: '1px solid #111' }}>
          {data.certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="cert-row"
              onMouseEnter={e => e.currentTarget.style.background = '#060606'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              style={{ transition: 'background 0.2s' }}
            >
              {/* Issuer + Date */}
              <div className="cert-left">
                <div style={{
                  fontFamily: 'Space Grotesk', fontSize: '0.88rem',
                  fontWeight: 700, color: '#aaa', letterSpacing: '-0.01em',
                  marginBottom: '3px',
                }}>
                  {cert.issuer}
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
                  color: '#2a2a2a', letterSpacing: '0.06em',
                }}>
                  {cert.date}
                </div>
              </div>

              {/* Cert items */}
              <div className="cert-right">
                {cert.items.map((item, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'baseline', gap: '10px',
                    paddingBottom: j < cert.items.length - 1 ? '8px' : '0',
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono', fontSize: '0.6rem',
                      color: '#222', flexShrink: 0,
                    }}>
                      —
                    </span>
                    <span style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.6 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .cert-row {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          padding: 24px 0;
          border-bottom: 1px solid #111;
        }
        .cert-left {
          min-width: 200px;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .cert-right {
          flex: 1;
        }
        @media (max-width: 640px) {
          .cert-row { flex-direction: column; gap: 12px; padding: 20px 0; }
          .cert-left { min-width: unset; }
          .cert-row { gap: 16px; }
        }
      `}</style>
    </section>
  );
}
