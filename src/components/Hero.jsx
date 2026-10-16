import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiFileText } from 'react-icons/fi';
import { data } from '../data';

// Computed from the data so they can't drift from the project and certificate lists.
const stats = [
  { value: 'Dec 2027', label: 'Graduation (expected)' },
  { value: data.projects.length, label: 'Projects Built' },
  { value: data.projects.filter(p => p.ai).length, label: 'AI-Integrated Apps' },
  { value: data.certifications.reduce((n, c) => n + c.items.length, 0), label: 'Certifications' },
];

// Plain numbers: they're facts to read, not something to watch count up.
function StatItem({ value, label }) {
  const isNum = typeof value === 'number';
  return (
    <div className="hero-stat-cell">
      <div
        translate="no"
        style={{
          fontFamily: 'Space Grotesk',
          fontSize: isNum ? 'clamp(1.75rem, 3.2vw, 2.5rem)' : 'clamp(1.35rem, 2.6vw, 2rem)',
          fontWeight: 800,
          color: '#ededed',
          letterSpacing: '-0.035em',
          lineHeight: isNum ? 1 : 1.25,
        }}
      >
        {value}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono',
        fontSize: '0.72rem',
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
      {/* Main Container */}
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(84px, 12vh, 130px)', paddingBottom: 'clamp(32px, 5vh, 56px)' }}>
        <div className="hero-main-grid">
          {/* Main Text Column */}
          <div className="hero-text-col">
            {/* Top Status & Mobile Avatar Row */}
            <div className="hero-top-row">
              {/* Status badge */}
              <div className="hero-rise" style={{ display: 'inline-flex', alignItems: 'center', '--rise': '8px' }}>
                <span className="hero-status-pill">
                  <span className="hero-status-dot" />
                  {data.availability}
                </span>
              </div>

              {/* Mobile-Only Avatar */}
              <div className="hero-mobile-avatar-wrap">
                <img
                  src="/sultan-avatar.webp"
                  alt="Sultan Zhalifunnas"
                  className="hero-mobile-avatar-img"
                  width="60"
                  height="60"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Main Name Heading */}
            <h1
              className="hero-name hero-rise"
              translate="no"
              aria-label="Sultan Zhalifunnas Musyaffa"
              style={{
                '--d': '0.05s',
                '--rise': '18px',
                fontFamily: 'Space Grotesk',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.96,
                marginTop: 'clamp(16px, 2.5vw, 24px)',
                marginBottom: 'clamp(18px, 3vw, 28px)',
              }}
            >
              <span style={{ display: 'block', color: '#ededed' }}>Sultan</span>
              <span style={{ display: 'block', color: '#ededed' }}>Zhalifunnas</span>
              <span style={{
                display: 'block',
                color: '#8a8a8a',
              }}>
                Musyaffa
              </span>
            </h1>

            {/* Role & Bio Overview */}
            <div className="hero-role-row hero-rise" style={{ '--d': '0.12s', '--rise': '14px' }}>
              <div className="hero-role-badge">
                <div style={{
                  fontSize: '0.72rem', fontFamily: 'JetBrains Mono',
                  color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px',
                }}>
                  Role
                </div>
                <div style={{ fontSize: '0.92rem', color: '#ededed', fontWeight: 600 }}>
                  {data.subtitle}
                </div>
              </div>
              <div className="hero-role-desc">
                <div style={{
                  fontSize: '0.72rem', fontFamily: 'JetBrains Mono',
                  color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px',
                }}>
                  About
                </div>
                <p style={{ color: '#9a9a9a', fontSize: 'clamp(0.95rem, 1.2vw, 1rem)', lineHeight: 1.75 }}>
                  {data.summary}
                </p>
              </div>
            </div>

            {/* Action Buttons & Social Links */}
            <div className="hero-actions hero-rise" style={{ '--d': '0.2s', '--rise': '12px' }}>
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
            </div>
          </div>

          {/* Desktop Right Portrait Column */}
          <div className="hero-photo-col">
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
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Strip */}
      <div
        style={{
          borderTop: '1px solid #212121',
          borderBottom: '1px solid #212121',
          background: '#0d0d0d',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="container">
          <div className="hero-stats-grid">
            {stats.map(({ value, label }) => (
              <StatItem key={label} value={value} label={label} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Entrance moves text into place but never hides it, so the first paint already has the content. */
        @keyframes hero-rise {
          from { transform: translateY(var(--rise, 12px)); }
          to { transform: none; }
        }
        .hero-rise {
          animation: hero-rise 0.5s var(--ease-out) both;
          animation-delay: var(--d, 0s);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise { animation: none; }
        }

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
          background: #121212;
          border: 1px solid #292929;
          color: #a0a0a0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ededed;
          display: inline-block;
        }

        .hero-mobile-avatar-wrap {
          display: none;
        }
        .hero-mobile-avatar-img {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          border: 1px solid #303030;
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
          border: 1px solid #292929;
          border-radius: 16px;
          overflow: hidden;
          background: #111111;
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
          background: #292929;
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
          border-right: 1px solid #1d1d1d;
          text-align: left;
        }
        .hero-stats-grid .hero-stat-cell:last-child {
          border-right: none;
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
            border-bottom: 1px solid #1d1d1d;
          }
        }

        @media (max-width: 540px) {
          .hero-social-divider { display: none; }
          .hero-actions { gap: 10px; width: 100%; }
          .hero-actions .btn { flex: 1 1 calc(50% - 6px); }
          .hero-social-group { width: 100%; justify-content: flex-start; margin-top: 6px; }
          .hero-role-row { gap: 16px; margin-bottom: 24px; }
          .hero-role-badge { flex: 1 1 100%; min-width: 0; }
          .hero-role-desc { min-width: 100%; }
        }

        @media (max-width: 380px) {
          .hero-actions .btn { flex: 1 1 100%; }
        }
      `}</style>
    </section>
  );
}


