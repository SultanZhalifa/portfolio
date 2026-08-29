import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { data } from '../data';

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="certifications"
      aria-label="Verified Credentials and Certifications"
      className="section"
      ref={ref}
      style={{
        borderTop: '1px solid #181818',
        borderBottom: '1px solid #181818',
        background: '#040404',
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
            <span className="section-number">05</span>
            <span className="section-label">Credentials</span>
          </div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-sub">Verified credentials from industry-recognized platforms and academic programs.</p>
        </motion.div>

        {/* Credentials Table / List */}
        <div style={{ borderTop: '1px solid #181818' }}>
          {data.certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="cert-row"
            >
              {/* Issuer + Date Column */}
              <div className="cert-left">
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  marginBottom: '4px',
                }}>
                  {cert.issuer}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.64rem',
                  color: '#707070',
                  letterSpacing: '0.06em',
                }}>
                  {cert.date}
                </div>
              </div>

              {/* Items List Column */}
              <div className="cert-right">
                {cert.items.map((item, j) => (
                  <div key={j} style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '10px',
                    paddingBottom: j < cert.items.length - 1 ? '8px' : '0',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: '#555555',
                      flexShrink: 0,
                    }}>
                      —
                    </span>
                    <span style={{ fontSize: '0.86rem', color: '#9a9a9a', lineHeight: 1.6 }}>
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
          gap: clamp(24px, 4vw, 40px);
          padding: clamp(18px, 2.5vw, 26px) 0;
          border-bottom: 1px solid #141414;
          transition: background 0.2s ease;
        }
        .cert-row:hover {
          background: rgba(255, 255, 255, 0.015);
        }
        .cert-left {
          min-width: 220px;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .cert-right {
          flex: 1;
          min-width: 0;
        }
        @media (max-width: 680px) {
          .cert-row {
            flex-direction: column;
            gap: 12px;
            padding: 18px 0;
          }
          .cert-left {
            min-width: unset;
          }
        }
        @media (max-width: 360px) {
          .cert-row {
            padding: 14px 0;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}

