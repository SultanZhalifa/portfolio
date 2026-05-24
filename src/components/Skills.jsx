import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiShield, FiCode, FiTool, FiUsers } from 'react-icons/fi';
import { data } from '../data';

const categoryIcons = [FiShield, FiCode, FiTool, FiUsers];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section" ref={ref}
      style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-sub">A broad skill set spanning security, development, and infrastructure.</p>
        </motion.div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: '#111', border: '1px solid #111', borderRadius: '12px', overflow: 'hidden' }}>
          {data.skills.map((group, i) => {
            const Icon = categoryIcons[i % categoryIcons.length];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ padding: '32px', background: '#080808', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
                onMouseLeave={e => e.currentTarget.style.background = '#080808'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{
                    width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid #1c1c1c', borderRadius: '6px', color: '#555'
                  }}>
                    <Icon size={14} />
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', fontWeight: 600, color: '#888', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                    {group.category}
                  </h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {group.items.map(item => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Languages row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.45 }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px', padding: '20px 24px', border: '1px solid #1c1c1c', borderRadius: '8px', background: '#080808' }}
        >
          <span style={{ fontSize: '0.72rem', color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, flexShrink: 0 }}>Languages</span>
          <div style={{ width: '1px', height: '16px', background: '#1c1c1c' }} />
          <span className="tag">Bahasa Indonesia — Native</span>
          <span className="tag">English — Professional Working Proficiency</span>
        </motion.div>
      </div>
    </section>
  );
}
