import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { data } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid #111',
      background: '#000',
      padding: '48px 0 36px',
      position: 'relative', zIndex: 1,
    }}>
      <div className="container">
        {/* Big name */}
        <div style={{
          fontFamily: 'Space Grotesk', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          letterSpacing: '-0.04em', color: '#111',
          marginBottom: '32px', lineHeight: 1,
        }}>
          Sultan Zhalifunnas Musyaffa
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '16px',
          paddingTop: '20px', borderTop: '1px solid #111',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
            color: '#222', letterSpacing: '0.06em',
          }}>
            &copy; {year} — Built with React + Vite
          </span>

          <div style={{ display: 'flex', gap: '6px' }}>
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
                className="icon-box"
                style={{ textDecoration: 'none', width: '32px', height: '32px' }}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
