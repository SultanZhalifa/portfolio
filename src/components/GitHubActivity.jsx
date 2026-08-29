import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiArrowUpRight } from 'react-icons/fi';
import { data } from '../data';

const GH_USER = 'SultanZhalifa';
const CACHE_KEY = 'gh-activity-v1';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

// Language colors (subtle accents fitting monochrome dark aesthetic)
const LANG_COLORS = {
  TypeScript: '#7a9cc6', JavaScript: '#c6b86a', Python: '#6a93c6',
  Kotlin: '#b98ac6', Dart: '#6ac6bd', HTML: '#c68a6a', CSS: '#8a86c6',
  Java: '#c69a6a', 'Jupyter Notebook': '#c6916a', Shell: '#8ac68a',
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 86400000;
  if (diff < day) return 'today';
  const d = Math.floor(diff / day);
  if (d < 30) return `${d}d ago`;
  const m = Math.floor(d / 30);
  if (m < 12) return `${m}mo ago`;
  return `${Math.floor(m / 12)}y ago`;
}

async function fetchGitHub() {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GH_USER}`),
    fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');
  const user = await userRes.json();
  const repos = await reposRes.json();
  if (!Array.isArray(repos)) throw new Error('Unexpected repos payload');

  const owned = repos.filter(r => !r.fork);
  const totalStars = owned.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const recent = owned
    .slice()
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 6)
    .map(r => ({
      name: r.name,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count || 0,
      pushed_at: r.pushed_at,
    }));

  return {
    repos: user.public_repos || owned.length,
    followers: user.followers || 0,
    totalStars,
    recent,
  };
}

function StaticCTA() {
  return (
    <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
      <a
        href={data.github}
        target="_blank"
        rel="noreferrer"
        id="view-all-github-btn"
        className="btn btn-ghost"
      >
        <FiGithub size={14} /> View All on GitHub
      </a>
    </div>
  );
}

function readFreshCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Date.now() - cached.t < CACHE_TTL) return cached.d;
  } catch { /* ignore cache parse error */ }
  return null;
}

export default function GitHubActivity() {
  const [stats, setStats] = useState(readFreshCache);
  const [failed, setFailed] = useState(false);
  const [chartFailed, setChartFailed] = useState(false);

  useEffect(() => {
    if (readFreshCache()) return;

    let cancelled = false;

    fetchGitHub()
      .then(d => {
        if (cancelled) return;
        setStats(d);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d })); } catch { /* quota */ }
      })
      .catch(() => {
        if (cancelled) return;
        try {
          const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
          if (cached?.d) { setStats(cached.d); return; }
        } catch { /* ignore */ }
        setFailed(true);
      });

    return () => { cancelled = true; };
  }, []);

  if (failed && !stats) return <StaticCTA />;

  const numbers = stats
    ? [
        { label: 'Repositories', value: stats.repos },
        { label: 'Total Stars',  value: stats.totalStars },
        { label: 'Followers',    value: stats.followers },
      ]
    : [
        { label: 'Repositories', value: '—' },
        { label: 'Total Stars',  value: '—' },
        { label: 'Followers',    value: '—' },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: 'clamp(48px, 8vw, 72px)' }}
    >
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <FiGithub size={14} style={{ color: '#888888' }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: '#a0a0a0',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          Live from GitHub
        </span>
        <div style={{ flex: 1, height: '1px', background: '#181818' }} />
        <a
          href={data.github}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.04em',
            color: '#a0a0a0',
            textDecoration: 'none',
            transition: 'color 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={e => e.currentTarget.style.color = '#a0a0a0'}
        >
          @{GH_USER} <FiArrowUpRight size={12} />
        </a>
      </div>

      <div className="gh-grid">
        {/* Stat numbers */}
        <div className="gh-stats">
          {numbers.map(({ label, value }) => (
            <div key={label} className="gh-stat">
              <div translate="no" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: '#808080',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginTop: '8px',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Recently pushed repositories */}
        <div className="gh-repos">
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            color: '#707070',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Recently pushed
          </div>
          {stats?.recent?.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {stats.recent.map(repo => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="gh-repo-row"
                >
                  <span className="gh-repo-name">{repo.name}</span>
                  <span className="gh-repo-meta">
                    {repo.language && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: LANG_COLORS[repo.language] || '#666666',
                          flexShrink: 0,
                        }} />
                        <span>{repo.language}</span>
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <FiStar size={11} /> {repo.stars}
                      </span>
                    )}
                    <span style={{ color: '#666666' }}>{timeAgo(repo.pushed_at)}</span>
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666666' }}>
              {failed ? 'Could not load repositories.' : 'Loading GitHub activity…'}
            </div>
          )}
        </div>
      </div>

      {/* Contribution Activity Graph */}
      {!chartFailed && (
        <div className="gh-chart">
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: '#666666',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Annual Contribution Graph
          </div>
          <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
            <img
              src={`https://ghchart.rshah.org/444444/${GH_USER}`}
              alt={`${GH_USER} GitHub contribution graph`}
              loading="lazy"
              style={{
                width: '100%',
                minWidth: '640px',
                display: 'block',
                filter: 'grayscale(1) brightness(1.15) contrast(1.05)',
                opacity: 0.85,
                transition: 'filter 0.5s var(--ease-out), opacity 0.5s var(--ease-out)',
              }}
              onError={() => setChartFailed(true)}
            />
          </div>
        </div>
      )}

      <style>{`
        .gh-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: clamp(24px, 4vw, 40px);
          align-items: start;
        }
        .gh-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          background: #060606;
          padding: 24px 20px;
        }
        .gh-stat { text-align: left; }
        .gh-repo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 12px;
          margin: 0 -8px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .gh-repo-row:hover { background: #0e0e0e; }
        .gh-repo-name {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: #cccccc;
          letter-spacing: 0.01em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .gh-repo-row:hover .gh-repo-name { color: #ffffff; }
        .gh-repo-meta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #888888;
        }
        .gh-chart {
          margin-top: 32px;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          background: #060606;
          padding: 20px;
          overflow: hidden;
        }
        .gh-chart:hover img {
          filter: grayscale(0) brightness(1) !important;
          opacity: 1 !important;
        }

        @media (max-width: 820px) {
          .gh-grid { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 480px) {
          .gh-stats { padding: 18px 14px; gap: 10px; }
          .gh-repo-meta { gap: 8px; }
          .gh-repo-row { margin: 0 -4px; padding: 8px 8px; }
        }
      `}</style>
    </motion.div>
  );
}
