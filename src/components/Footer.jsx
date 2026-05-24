import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { data } from '../data';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #111', padding: '32px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', color: '#2a2a2a', letterSpacing: '-0.01em' }}>
          Sultan Zhalifunnas Musyaffa
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
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
              title={label}
              className="icon-box"
              style={{ textDecoration: 'none', width: '32px', height: '32px' }}
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
