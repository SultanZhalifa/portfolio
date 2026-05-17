import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { data } from '../data';

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="section" ref={ref}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Certifications</h2>
          <p className="section-sub">Verified credentials from industry-recognized programs.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
          {data.certifications.map((cert, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ padding: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid #1c1c1c', borderRadius: '6px', color: '#555',
                }}>
                  <FiAward size={14} />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '0.04em' }}>{cert.date}</span>
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#888', marginBottom: '10px', letterSpacing: '0.01em' }}>
                {cert.issuer}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {cert.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: '#555', lineHeight: 1.5 }}>
                    <span style={{ color: '#2a2a2a', flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
