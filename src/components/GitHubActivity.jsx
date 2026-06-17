import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiArrowUpRight } from 'react-icons/fi';
import { data } from '../data';

const GH_USER = 'SultanZhalifa';
const CACHE_KEY = 'gh-activity-v1';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

// Minimal language → accent dot color map (kept subtle to fit the monochrome theme)
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
    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
      <a
        href={data.github}
        target="_blank"
        rel="noreferrer"
        id="view-all-github-btn"
        className="btn btn-ghost"
      >
        <FiGithub size={13} /> View All on GitHub
      </a>
    </div>
  );
}

export default function GitHubActivity() {
  const [stats, setStats] = useState(null);
  const [failed, setFailed] = useState(false);
  const [chartFailed, setChartFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // 1. Try fresh cache
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.t < CACHE_TTL) {
        setStats(cached.d);
        return;
      }
    } catch { /* ignore corrupt cache */ }

    // 2. Fetch live
    fetchGitHub()
      .then(d => {
        if (cancelled) return;
        setStats(d);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d })); } catch { /* quota */ }
      })
      .catch(() => {
        if (cancelled) return;
        // Fall back to stale cache if present, else show static CTA
        try {
          const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
          if (cached?.d) { setStats(cached.d); return; }
        } catch { /* ignore */ }
        setFailed(true);
      });

    return () => { cancelled = true; };
  }, []);

  // Hard failure with no data → keep the original CTA behavior
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: '64px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <FiGithub size={13} style={{ color: '#7d7d7d' }} />
        <span style={{
          fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
          color: '#9a9a9a', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Live from GitHub
        </span>
        <div style={{ flex: 1, height: '1px', background: '#141414' }} />
        <a
          href={data.github}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontFamily: 'JetBrains Mono', fontSize: '0.66rem', letterSpacing: '0.04em',
            color: '#7d7d7d', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.color = '#7d7d7d'}
        >
          @{GH_USER} <FiArrowUpRight size={11} />
        </a>
      </div>

      <div className="gh-grid">
        {/* Stat numbers */}
        <div className="gh-stats">
          {numbers.map(({ label, value }) => (
            <div key={label} className="gh-stat">
              <div translate="no" style={{
                fontFamily: 'Space Grotesk', fontSize: '1.7rem', fontWeight: 800,
                color: '#f5f5f5', letterSpacing: '-0.03em', lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono', fontSize: '0.58rem', color: '#7d7d7d',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '7px',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Recently pushed repos */}
        <div className="gh-repos">
          <div style={{
            fontFamily: 'JetBrains Mono', fontSize: '0.58rem', color: '#5e5e5e',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px',
          }}>
            Recently pushed
          </div>
          {stats?.recent?.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          background: LANG_COLORS[repo.language] || '#666', flexShrink: 0,
                        }} />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <FiStar size={10} /> {repo.stars}
                      </span>
                    )}
                    <span style={{ color: '#5e5e5e' }}>{timeAgo(repo.pushed_at)}</span>
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: '#5e5e5e' }}>
              {failed ? 'Could not load repos.' : 'Loading…'}
            </div>
          )}
        </div>
      </div>

      {/* Contribution chart */}
      {!chartFailed && (
        <div className="gh-chart">
          <img
            src={`https://ghchart.rshah.org/444444/${GH_USER}`}
            alt={`${GH_USER} GitHub contribution graph`}
            loading="lazy"
            onError={() => setChartFailed(true)}
          />
        </div>
      )}

      <style>{`
        .gh-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 40px;
          align-items: start;
        }
        .gh-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          border: 1px solid #131313;
          border-radius: 10px;
          background: #060606;
          padding: 24px 20px;
        }
        .gh-stat { text-align: left; }
        .gh-repo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 9px 12px;
          margin: 0 -12px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.18s;
        }
        .gh-repo-row:hover { background: #0c0c0c; }
        .gh-repo-name {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #c4c4c4;
          letter-spacing: 0.01em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .gh-repo-row:hover .gh-repo-name { color: #f5f5f5; }
        .gh-repo-meta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          color: #7d7d7d;
        }
        .gh-chart {
          margin-top: 36px;
          border: 1px solid #131313;
          border-radius: 10px;
          background: #060606;
          padding: 20px;
          overflow-x: auto;
        }
        .gh-chart img {
          width: 100%;
          min-width: 600px;
          display: block;
          filter: grayscale(1) brightness(1.15) contrast(1.05);
          opacity: 0.85;
          transition: filter 0.5s var(--ease-out), opacity 0.5s var(--ease-out);
        }
        .gh-chart:hover img { filter: grayscale(0) brightness(1); opacity: 1; }

        @media (max-width: 768px) {
          .gh-grid { grid-template-columns: 1fr; gap: 28px; }
        }
        @media (max-width: 480px) {
          .gh-stats { padding: 18px 14px; gap: 10px; }
          .gh-stat > div:first-child { font-size: 1.4rem !important; }
          .gh-repo-meta { gap: 10px; }
        }
      `}</style>
    </motion.div>
  );
}
