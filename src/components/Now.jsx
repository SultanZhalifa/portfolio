import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { data } from '../data';

/**
 * Slim "Currently Building" status band — sits between Hero and Skills.
 * No section id, so it stays out of the SideNav (which tracks fixed section ids).
 */
export default function Now() {
  const items = data.now || [];
  if (items.length === 0) return null;

  return (
    <motion.section
      aria-label="Currently building"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      style={{
        borderBottom: '1px solid #111',
        background: '#060606',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container">
        <div className="now-band">
          {/* Label */}
          <div className="now-label">
            <span className="now-dot" />
            <span>Now</span>
          </div>

          {/* Focus items */}
          <ul className="now-items">
            {items.map((item, i) => (
              <li key={i} className="now-item">
                <span className="now-bullet">—</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Link */}
          <a
            href="https://founderiq.vercel.app"
            target="_blank"
            rel="noreferrer"
            id="now-founderiq-link"
            className="now-link"
          >
            Visit FounderIQ <FiArrowUpRight size={12} />
          </a>
        </div>
      </div>

      <style>{`
        .now-band {
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 18px 0;
        }
        .now-label {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #cfcfcf;
        }
        .now-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fff;
          display: inline-block;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.06);
          animation: pulse-dot 2.4s ease-in-out infinite;
        }
        .now-items {
          flex: 1;
          min-width: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 28px;
          margin: 0; padding: 0;
        }
        .now-item {
          display: flex;
          gap: 10px;
          font-size: 0.8rem;
          color: #9a9a9a;
          line-height: 1.5;
        }
        .now-bullet {
          color: #444;
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          margin-top: 2px;
        }
        .now-link {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          color: #7d7d7d;
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .now-link:hover { color: #f5f5f5; }

        @media (max-width: 860px) {
          .now-band { flex-wrap: wrap; gap: 14px 20px; padding: 16px 0; }
          .now-items { flex: 1 1 100%; order: 3; }
          .now-link { order: 2; margin-left: auto; }
        }
        @media (max-width: 480px) {
          .now-item { font-size: 0.76rem; }
        }
      `}</style>
    </motion.section>
  );
}
