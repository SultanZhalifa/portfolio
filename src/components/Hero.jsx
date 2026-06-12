import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiFileText } from 'react-icons/fi';
import { data } from '../data';

function useCountUp(target, inView, duration = 1400) {
  const isNum = typeof target === 'number';
  const [count, setCount] = useState(isNum ? 0 : target);
  useEffect(() => {
    if (!inView || !isNum) return;
    let rafId;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, duration, isNum]);
  return count;
}

const allTech = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'YOLOv11', 'Gemini AI',
  'Kotlin', 'Android', 'Flutter', 'Dart', 'GitHub Actions', 'JUnit 4',
  'MockK', 'Turbine', 'MVVM', 'REST API', 'Linux', 'PWA',
];

const marqueeItems = [...allTech, ...allTech];

const stats = [
  { value: 5,    suffix: 'th', label: 'Semester'       },
  { value: 10,   suffix: '+',  label: 'Projects Built'  },
  { value: 1,    suffix: 'yr', label: 'Industry Exp.'   },
  { value: 10,   suffix: '+',  label: 'Certifications'  },
];

function StatItem({ value, suffix, label, inView, showDivider }) {
  const counted = useCountUp(value, inView);
  return (
    <div className="hero-stat-item">
      {showDivider && <div className="hero-stat-divider" />}
      <div>
        <div
          translate="no"
          style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: 800, color: '#f5f5f5', letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {inView ? counted : 0}{suffix}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
          color: '#7d7d7d', letterSpacing: '0.1em', textTransform: 'uppercase',
          marginTop: '6px',
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '0px', threshold: 0.1 });
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
       <div className="hero-main-grid">
        <div className="hero-text-col">

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
            background: '#0c0c0c', border: '1px solid #1c1c1c', color: '#7d7d7d',
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
          className="hero-name"
          translate="no"
          style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 800,
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
            WebkitTextStroke: '1.5px #555',
          }}>
            Musyaffa
          </span>
        </motion.h1>

        {/* Role + summary row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hero-role-row"
          style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '52px' }}
        >
          <div style={{ flexShrink: 0 }}>
            <div style={{
              fontSize: '0.68rem', fontFamily: 'JetBrains Mono',
              color: '#5e5e5e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px',
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
              color: '#5e5e5e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px',
            }}>
              About
            </div>
            <p style={{ color: '#7d7d7d', fontSize: '0.875rem', lineHeight: 1.85 }}>
              Informatics undergraduate at President University building fullstack web, Android, and AI-integrated systems end to end. Added perspective from cybersecurity and a manufacturing quality background.
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
            href="/Sultan_Zhalifunnas_Musyaffa_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            id="hero-download-cv-btn"
          >
            <FiFileText size={13} /> Resume
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

        </div>{/* end hero-text-col */}

        {/* Portrait */}
        <motion.div
          className="hero-photo-col"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-photo-frame">
            <picture>
              <source srcSet="/sultan-portrait.webp" type="image/webp" />
              <img
                src="/sultan-portrait.jpg"
                alt="Sultan Zhalifunnas Musyaffa"
                className="hero-photo-img"
                width="900"
                height="1260"
                loading="eager"
              />
            </picture>
            <div className="hero-photo-overlay" />
          </div>
        </motion.div>

       </div>{/* end hero-main-grid */}
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
            {stats.map(({ value, suffix, label }, i) => (
              <StatItem
                key={label}
                value={value}
                suffix={suffix}
                label={label}
                inView={statsInView}
                showDivider={i > 0}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Marquee tech strip — decorative; real tech list is in Skills */}
      <motion.div
        aria-hidden="true"
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
            <span key={i} translate="no" style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', paddingRight: '24px' }}>
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.68rem',
                color: '#767676', letterSpacing: '0.06em', whiteSpace: 'nowrap',
              }}>
                {tech}
              </span>
              <span style={{ color: '#444', fontSize: '0.5rem' }}>+</span>
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        .hero-container { max-width: 1080px; }
        .hero-name { font-size: clamp(3.2rem, 7.5vw, 7rem); }
        .hero-role-row { gap: 48px; }

        /* Hero layout: text + portrait */
        .hero-main-grid {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 56px;
        }
        .hero-text-col { flex: 1; min-width: 0; }
        .hero-photo-col {
          flex-shrink: 0;
          width: clamp(220px, 24vw, 300px);
          margin-top: 8px;
        }
        .hero-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 5 / 7;
          border: 1px solid #1c1c1c;
          border-radius: 12px;
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 24px 60px -24px rgba(0,0,0,0.8);
        }
        .hero-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(100%) contrast(1.02);
          transition: filter 0.5s var(--ease-out), transform 0.6s var(--ease-out);
        }
        .hero-photo-frame:hover .hero-photo-img {
          filter: grayscale(0%) contrast(1);
          transform: scale(1.03);
        }
        .hero-photo-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%);
        }
        @media (max-width: 860px) {
          .hero-main-grid { flex-direction: column-reverse; align-items: flex-start; gap: 36px; }
          .hero-photo-col {
            width: clamp(160px, 42vw, 220px);
            margin-top: 0;
          }
        }
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
          .hero-stat-item:nth-child(odd) .hero-stat-divider { display: none; }
          .hero-stat-item { padding: 22px 0; }
          .hero-stat-item > div:last-child { padding: 0 22px; }
          .hero-role-row { gap: 28px; }
        }
        @media (max-width: 480px) {
          .hero-name { font-size: clamp(2.6rem, 11vw, 3.2rem); }
          .hero-stat-item > div:last-child { padding: 0 16px; }
          .hero-stat-item { padding: 18px 0; }
          .hero-role-row { gap: 20px; flex-direction: column; }
        }
        @media (max-width: 360px) {
          .hero-name { font-size: clamp(2.2rem, 10vw, 2.6rem); }
          .hero-photo-col { width: clamp(120px, 38vw, 160px); }
          .hero-stat-item > div:last-child { padding: 0 12px; }
        }
      `}</style>
    </section>
  );
}

