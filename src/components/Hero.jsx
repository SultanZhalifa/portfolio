import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiArrowRight, FiDownload } from 'react-icons/fi';
import { data } from '../data';

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '60%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">

          {/* Left content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '36px' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 14px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500,
                background: '#0f0f0f', border: '1px solid #1c1c1c', color: '#555',
                letterSpacing: '0.05em', textTransform: 'uppercase'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                Available for Internship
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: 'Space Grotesk', fontWeight: 800,
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                letterSpacing: '-0.03em', lineHeight: 1.05,
                marginBottom: '16px', color: '#fff',
              }}
            >
              Sultan<br />Zhalifunnas<br />
              <span style={{ color: '#2a2a2a', WebkitTextStroke: '1px #333' }}>Musyaffa</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
            >
              <div style={{ width: '28px', height: '1px', background: '#333' }} />
              <p style={{ color: '#555', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {data.subtitle}
              </p>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ color: '#666', fontSize: '0.95rem', maxWidth: '520px', lineHeight: 1.8, marginBottom: '16px' }}
            >
              {data.summary}
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#444', fontSize: '0.82rem', marginBottom: '44px' }}
            >
              <FiMapPin size={12} />
              {data.location}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '52px' }}
            >
              <a href="#projects" className="btn btn-primary" id="hero-view-projects-btn">
                View Projects <FiArrowRight size={14} />
              </a>
              <a href="#contact" className="btn btn-ghost" id="hero-contact-btn">
                Get in Touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              style={{ display: 'flex', gap: '10px' }}
            >
              {[
                { Icon: FiGithub, href: data.github, label: 'GitHub' },
                { Icon: FiLinkedin, href: data.linkedin, label: 'LinkedIn' },
                { Icon: FiMail, href: `mailto:${data.email}`, label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noreferrer"
                  id={`hero-${label.toLowerCase()}-link`}
                  title={label}
                  className="icon-box"
                  style={{ textDecoration: 'none', width: '38px', height: '38px' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — minimal stats column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: '180px' }}
            className="hero-stats"
          >
            {[
              { value: '5th', label: 'Semester' },
              { value: '3+', label: 'Projects Built' },
              { value: '1yr', label: 'Industry Experience' },
              { value: '4+', label: 'Certifications' },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  padding: '20px 24px',
                  border: '1px solid #1c1c1c',
                  borderRadius: '6px',
                  background: '#080808',
                  textAlign: 'center',
                  marginBottom: '8px',
                }}
              >
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#444', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '4px' }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom border line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: '#111' }} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-stats {
            flex-direction: row !important;
            flex-wrap: wrap;
            gap: 8px !important;
            min-width: unset !important;
            margin-top: 32px;
          }
          .hero-stats > div {
            flex: 1 1 calc(50% - 4px);
            min-width: 120px;
            margin-bottom: 0 !important;
            padding: 14px 16px !important;
          }
          .hero-stats > div > div:first-child {
            font-size: 1.4rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-stats > div {
            flex: 1 1 calc(50% - 4px);
            padding: 12px 10px !important;
          }
          .hero-stats > div > div:first-child {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
