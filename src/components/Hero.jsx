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
  { value: 6,    suffix: 'th', label: 'Semester'           },
  { value: 12,   suffix: '+',  label: 'Projects Built'     },
  { value: 6,    suffix: '+',  label: 'AI-Integrated Apps' },
  { value: 15,   suffix: '+',  label: 'Certifications'     },
];

function StatItem({ value, suffix, label, inView }) {
  const counted = useCountUp(value, inView);
  return (
    <div className="hero-stat-cell">
      <div
        translate="no"
        style={{
          fontFamily: 'Space Grotesk',
          fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.035em',
          lineHeight: 1,
        }}
      >
        {inView ? counted : 0}{suffix}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono',
        fontSize: '0.66rem',
        color: '#888888',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginTop: '8px',
      }}>
        {label}
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
      aria-label="Introduction and Overview"
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
      {/* Background Subtle Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          right: '-8%',
          width: 'clamp(320px, 45vw, 650px)',
          height: 'clamp(320px, 45vw, 650px)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Main Container */}
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(84px, 12vh, 130px)', paddingBottom: 'clamp(32px, 5vh, 56px)' }}>
        <div className="hero-main-grid">
          {/* Main Text Column */}
          <div className="hero-text-col">
            {/* Top Status & Mobile Avatar Row */}
            <div className="hero-top-row">
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <span className="hero-status-pill">
                  <span className="hero-status-dot" />
                  Available for Internship
                </span>
              </motion.div>

              {/* Mobile-Only Avatar */}
              <motion.div
                className="hero-mobile-avatar-wrap"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.15 }}
              >
                <img
                  src="/sultan-portrait.jpg"
                  alt="Sultan Zhalifunnas"
                  className="hero-mobile-avatar-img"
                  width="60"
                  height="60"
                  loading="eager"
                />
              </motion.div>
            </div>

            {/* Main Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-name"
              translate="no"
              style={{
                fontFamily: 'Space Grotesk',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.96,
                marginTop: 'clamp(16px, 2.5vw, 24px)',
                marginBottom: 'clamp(18px, 3vw, 28px)',
              }}
            >
              <span style={{ display: 'block', color: '#ffffff' }}>Sultan</span>
              <span style={{ display: 'block', color: '#ffffff' }}>Zhalifunnas</span>
              <span style={{
                display: 'block',
                color: 'transparent',
                WebkitTextStroke: '1.5px #606060',
              }}>
                Musyaffa
              </span>
            </motion.h1>

            {/* Role & Bio Overview */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hero-role-row"
            >
              <div className="hero-role-badge">
                <div style={{
                  fontSize: '0.66rem', fontFamily: 'JetBrains Mono',
                  color: '#707070', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px',
                }}>
                  Role
                </div>
                <div style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 600 }}>
                  {data.subtitle}
                </div>
              </div>
              <div className="hero-role-desc">
                <div style={{
                  fontSize: '0.66rem', fontFamily: 'JetBrains Mono',
                  color: '#707070', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px',
                }}>
                  About
                </div>
                <p style={{ color: '#9a9a9a', fontSize: 'clamp(0.85rem, 1.2vw, 0.92rem)', lineHeight: 1.75 }}>
                  {data.summary}
                </p>
              </div>
            </motion.div>

            {/* Action Buttons & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="hero-actions"
            >
              <a href="#projects" className="btn btn-primary" id="hero-view-projects-btn">
                <span>View Projects</span> <FiArrowRight size={13} />
              </a>
              <a
                href="/Sultan_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                id="hero-download-cv-btn"
              >
                <FiFileText size={13} /> <span>Resume (CV)</span>
              </a>
              <a href="#contact" className="btn btn-ghost" id="hero-contact-btn">
                <span>Get in Touch</span>
              </a>

              <div className="hero-social-divider" />

              <div className="hero-social-group">
                {[
                  { Icon: FiGithub,   href: data.github,            label: 'GitHub'   },
                  { Icon: FiLinkedin, href: data.linkedin,          label: 'LinkedIn' },
                  { Icon: FiMail,     href: `mailto:${data.email}`, label: 'Email'    },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel="noreferrer"
                    id={`hero-${label.toLowerCase()}-link`}
                    title={label}
                    aria-label={`Visit Sultan's ${label}`}
                    className="icon-box"
                    style={{ textDecoration: 'none' }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Desktop Right Portrait Column */}
          <motion.div
            className="hero-photo-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
        </div>
      </div>

      {/* Stats Counter Strip */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        style={{
          borderTop: '1px solid #181818',
          borderBottom: '1px solid #181818',
          background: '#040404',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container">
          <div className="hero-stats-grid">
            {stats.map(({ value, suffix, label }) => (
              <StatItem
                key={label}
                value={value}
                suffix={suffix}
                label={label}
                inView={statsInView}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Marquee Tech Strip with Left/Right Gradient Masks */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="hero-marquee-wrapper"
      >
        <div className="marquee-track">
          {marqueeItems.map((tech, i) => (
            <span key={i} translate="no" style={{ display: 'inline-flex', alignItems: 'center', gap: '22px', paddingRight: '22px' }}>
              <span style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.72rem',
                color: '#848484',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}>
                {tech}
              </span>
              <span style={{ color: '#383838', fontSize: '0.55rem' }}>+</span>
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        .hero-name { font-size: clamp(2.6rem, 6vw, 5.8rem); }
        .hero-main-grid {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: clamp(28px, 4.5vw, 60px);
        }
        .hero-text-col { flex: 1; min-width: 0; }
        
        .hero-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .hero-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-family: var(--font-mono);
          font-weight: 500;
          background: #090909;
          border: 1px solid #202020;
          color: #a0a0a0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
          display: inline-block;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
          animation: pulse-dot 2.4s ease-in-out infinite;
        }

        .hero-mobile-avatar-wrap {
          display: none;
        }
        .hero-mobile-avatar-img {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          border: 1px solid #282828;
          object-fit: cover;
          object-position: center 20%;
          display: block;
          filter: grayscale(100%);
          transition: filter 0.3s ease;
        }
        .hero-mobile-avatar-img:hover {
          filter: grayscale(0%);
        }

        .hero-photo-col {
          flex-shrink: 0;
          width: clamp(200px, 22vw, 280px);
          margin-top: 4px;
        }
        .hero-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 5 / 7;
          border: 1px solid #202020;
          border-radius: 16px;
          overflow: hidden;
          background: #080808;
          box-shadow: 0 20px 50px -20px rgba(0,0,0,0.9);
        }
        .hero-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
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
          background: linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%);
        }

        .hero-role-row {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          margin-bottom: clamp(28px, 4vw, 44px);
          flex-wrap: wrap;
        }
        .hero-role-badge { flex-shrink: 0; }
        .hero-role-desc { flex: 1; min-width: 240px; max-width: 520px; }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .hero-social-divider {
          width: 1px;
          height: 28px;
          background: #202020;
          margin: 0 4px;
        }
        .hero-social-group {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* Stats Grid */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .hero-stat-cell {
          padding: clamp(20px, 3vw, 28px) clamp(16px, 2.5vw, 32px);
          border-right: 1px solid #151515;
          text-align: left;
        }
        .hero-stats-grid .hero-stat-cell:last-child {
          border-right: none;
        }

        /* Marquee Wrapper with Edge Masks */
        .hero-marquee-wrapper {
          overflow: hidden;
          border-bottom: 1px solid #181818;
          background: #020202;
          padding: 13px 0;
          position: relative;
          z-index: 1;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, transparent 100%);
        }

        @media (max-width: 860px) {
          .hero-photo-col {
            display: none !important;
          }
          .hero-mobile-avatar-wrap {
            display: block;
          }
          .hero-name {
            font-size: clamp(2.4rem, 9.5vw, 3.8rem);
          }
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-stats-grid .hero-stat-cell:nth-child(2n) {
            border-right: none;
          }
          .hero-stats-grid .hero-stat-cell:nth-child(1),
          .hero-stats-grid .hero-stat-cell:nth-child(2) {
            border-bottom: 1px solid #151515;
          }
        }

        @media (max-width: 540px) {
          .hero-social-divider { display: none; }
          .hero-actions { gap: 10px; width: 100%; }
          .hero-actions .btn { flex: 1 1 calc(50% - 6px); }
          .hero-social-group { width: 100%; justify-content: flex-start; margin-top: 6px; }
          .hero-role-row { gap: 16px; margin-bottom: 24px; }
          .hero-role-desc { min-width: 100%; }
        }

        @media (max-width: 380px) {
          .hero-actions .btn { flex: 1 1 100%; }
        }
      `}</style>
    </section>
  );
}


