import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiDownload } from 'react-icons/fi';
import { data } from '../data';

function useCountUp(target, inView, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const isNum = typeof target === 'number';
    if (!isNum) { setCount(target); return; }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

const allTech = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'YOLOv8', 'Gemini AI',
  'Kotlin', 'Android', 'GitHub Actions', 'JUnit 4', 'MockK', 'Turbine',
  'MVVM', 'REST API', 'Linux', 'Penetration Testing',
];

const marqueeItems = [...allTech, ...allTech];

const stats = [
  { value: 5,    suffix: 'th', label: 'Semester'       },
  { value: 3,    suffix: '+',  label: 'Projects Built'  },
  { value: 1,    suffix: 'yr', label: 'Industry Exp.'   },
  { value: 4,    suffix: '+',  label: 'Certifications'  },
];

export default function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 60%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1, paddingTop: '120px' }}>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 13px', borderRadius: '4px',
            fontSize: '0.68rem', fontFamily: 'JetBrains Mono', fontWeight: 500,
            background: '#0c0c0c', border: '1px solid #1c1c1c', color: '#555',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%', background: '#fff',
              display: 'inline-block',
              animation: 'pulse-dot 2.4s ease-in-out infinite',
            }} />
            Available for Internship
          </span>
        </motion.div>

        {/* Name — editorial large */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 800,
            fontSize: 'clamp(3.2rem, 7.5vw, 7rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            marginBottom: '32px',
          }}
        >
          <span style={{ display: 'block', color: '#f5f5f5' }}>Sultan</span>
          <span style={{ display: 'block', color: '#f5f5f5' }}>Zhalifunnas</span>
          <span style={{
            display: 'block',
            color: 'transparent',
            WebkitTextStroke: '1.5px #2a2a2a',
          }}>
            Musyaffa
          </span>
        </motion.h1>

        {/* Role + summary row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '48px', flexWrap: 'wrap', marginBottom: '52px' }}
        >
          <div style={{ flexShrink: 0 }}>
            <div style={{
              fontSize: '0.68rem', fontFamily: 'JetBrains Mono',
              color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px',
            }}>
              Role
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>
              {data.subtitle}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '240px', maxWidth: '480px' }}>
            <div style={{
              fontSize: '0.68rem', fontFamily: 'JetBrains Mono',
              color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px',
            }}>
              About
            </div>
            <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.85 }}>
              Informatics undergraduate at President University with hands-on experience in fullstack web, Android, and AI-integrated systems. Background in cybersecurity and manufacturing quality.
            </p>
          </div>
        </motion.div>

        {/* CTAs + Social */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}
        >
          <a href="#projects" className="btn btn-primary" id="hero-view-projects-btn">
            View Projects <FiArrowRight size={13} />
          </a>
          <a
            href="/Sultan_CV_General.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            id="hero-download-cv-btn"
          >
            <FiDownload size={13} /> Download CV
          </a>
          <a href="#contact" className="btn btn-ghost" id="hero-contact-btn">
            Get in Touch
          </a>
          <div style={{ width: '1px', height: '28px', background: '#1c1c1c', margin: '0 4px' }} />
          {[
            { Icon: FiGithub,   href: data.github,              label: 'GitHub'   },
            { Icon: FiLinkedin, href: data.linkedin,            label: 'LinkedIn' },
            { Icon: FiMail,     href: `mailto:${data.email}`,   label: 'Email'    },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noreferrer"
              id={`hero-${label.toLowerCase()}-link`}
              title={label}
              className="icon-box"
              style={{ textDecoration: 'none', width: '36px', height: '36px' }}
            >
              <Icon size={14} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        style={{
          borderTop: '1px solid #111', borderBottom: '1px solid #111',
          background: '#040404', position: 'relative', zIndex: 1,
        }}
      >
        <div className="container">
          <div className="hero-stats">
            {stats.map(({ value, suffix, label }, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const counted = useCountUp(value, statsInView);
              return (
                <div key={label} className="hero-stat-item">
                  {i > 0 && <div className="hero-stat-divider" />}
                  <div>
                    <div style={{
                      fontFamily: 'Space Grotesk', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                      fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}>
                      {statsInView ? counted : 0}{suffix}
                    </div>
                    <div style={{
                      fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
                      color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase',
                      marginTop: '6px',
                    }}>
                      {label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Marquee tech strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          overflow: 'hidden',
          borderBottom: '1px solid #111',
          background: '#000',
          padding: '14px 0',
          position: 'relative', zIndex: 1,
        }}
      >
        <div className="marquee-track">
          {marqueeItems.map((tech, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', paddingRight: '24px' }}>
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.68rem',
                color: '#2a2a2a', letterSpacing: '0.06em', whiteSpace: 'nowrap',
              }}>
                {tech}
              </span>
              <span style={{ color: '#1a1a1a', fontSize: '0.5rem' }}>+</span>
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        .hero-container { max-width: 1080px; }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
        }
        .hero-stat-item {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 28px 0;
        }
        .hero-stat-item > div:last-child {
          padding: 0 36px;
        }
        .hero-stat-divider {
          width: 1px;
          height: 40px;
          background: #181818;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .hero-stat-item:nth-child(2) .hero-stat-divider,
          .hero-stat-item:nth-child(4) .hero-stat-divider { display: none; }
          .hero-stat-item { padding: 22px 0; }
          .hero-stat-item > div:last-child { padding: 0 22px; }
        }
        @media (max-width: 480px) {
          .hero-stat-item > div:last-child { padding: 0 16px; }
          .hero-stat-item { padding: 18px 0; }
        }
      `}</style>
    </section>
  );
}
