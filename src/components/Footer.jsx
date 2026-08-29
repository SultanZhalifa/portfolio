import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { data } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      style={{
        borderTop: '1px solid #161616',
        background: '#000000',
        padding: 'clamp(36px, 6vw, 56px) 0 clamp(24px, 4vw, 36px)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container">
        {/* Large Signature Typography Watermark */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)',
          letterSpacing: '-0.04em',
          color: '#1a1a1a',
          marginBottom: 'clamp(20px, 3.5vw, 36px)',
          lineHeight: 1.05,
          userSelect: 'none',
        }}>
          Sultan Zhalifunnas Musyaffa
        </div>

        {/* Bottom Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '20px',
          borderTop: '1px solid #141414',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#707070',
            letterSpacing: '0.06em',
          }}>
            &copy; {year} Sultan Zhalifunnas Musyaffa · Built with React 19 + Framer Motion
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
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
                title={label}
                aria-label={`Visit Sultan's ${label}`}
                className="icon-box"
                style={{ textDecoration: 'none', width: '36px', height: '36px' }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

