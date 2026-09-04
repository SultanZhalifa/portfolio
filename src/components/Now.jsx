import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiClock } from 'react-icons/fi';
import { data } from '../data';

/**
 * Slim "Currently Building" status band with live local time indicator.
 */
export default function Now() {
  const items = data.now || [];
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setTime(`${formatted} WIB`);
      } catch {
        setTime('');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (items.length === 0) return null;

  return (
    <motion.section
      aria-label="Currently building and focus"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45 }}
      style={{
        borderBottom: '1px solid #181818',
        background: '#040404',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container">
        <div className="now-band">
          {/* Label & Location Clock */}
          <div className="now-left-group">
            <div className="now-label">
              <span className="now-dot" />
              <span>Now</span>
            </div>

            {time && (
              <div className="now-time-pill" title="Current Local Time in Bekasi / Jakarta (UTC+7)">
                <FiClock size={11} style={{ color: '#777777' }} />
                <span>Bekasi, ID · {time}</span>
              </div>
            )}
          </div>

          {/* Focus items */}
          <ul className="now-items">
            {items.map((item, i) => (
              <li key={i} className="now-item">
                <span className="now-bullet">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Action Link */}
          <a
            href="#projects"
            id="now-projects-link"
            className="now-link"
          >
            <span>Explore Projects</span> <FiArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <style>{`
        .now-band {
          display: flex;
          align-items: center;
          gap: clamp(16px, 3vw, 28px);
          padding: 16px 0;
        }
        .now-left-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .now-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 4px;
          background: #0d0d0d;
          border: 1px solid #202020;
        }
        .now-time-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #888888;
          letter-spacing: 0.04em;
          background: #080808;
          border: 1px solid #1c1c1c;
          padding: 4px 9px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .now-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
          display: inline-block;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.7);
          animation: pulse-dot 2.4s ease-in-out infinite;
        }
        .now-items {
          flex: 1;
          min-width: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 6px clamp(16px, 2.5vw, 28px);
          margin: 0;
          padding: 0;
        }
        .now-item {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: clamp(0.8rem, 1.2vw, 0.86rem);
          color: #a0a0a0;
          line-height: 1.5;
        }
        .now-bullet {
          color: #555555;
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: 0.65rem;
        }
        .now-link {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          color: #a0a0a0;
          text-decoration: none;
          transition: color 0.2s, transform 0.2s;
          white-space: nowrap;
          padding: 6px 12px;
          border-radius: 6px;
          background: #090909;
          border: 1px solid #1e1e1e;
        }
        .now-link:hover {
          color: #ffffff;
          border-color: #333333;
          transform: translateY(-1px);
        }

        @media (max-width: 860px) {
          .now-band {
            flex-wrap: wrap;
            gap: 12px 16px;
            padding: 14px 0;
          }
          .now-items {
            flex: 1 1 100%;
            order: 3;
          }
          .now-link {
            order: 2;
            margin-left: auto;
          }
        }
      `}</style>
    </motion.section>
  );
}

