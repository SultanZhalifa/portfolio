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
    .slice(0, 3)
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

  if (failed && !stats) {
    return (
      <div style={{ marginTop: 'clamp(40px, 6vw, 56px)' }}>
        <a href={data.github} target="_blank" rel="noreferrer" className="gh-plain-link">
          <FiGithub size={13} /> github.com/{GH_USER} <FiArrowUpRight size={11} />
        </a>
      </div>
    );
  }

  const summary = stats
    ? `${stats.repos} repos · ${stats.totalStars} stars · ${stats.followers} followers`
    : 'Loading…';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      style={{ marginTop: 'clamp(40px, 6vw, 56px)' }}
    >
      <div className="gh-compact-row">
        <a href={data.github} target="_blank" rel="noreferrer" className="gh-plain-link">
          <FiGithub size={13} /> @{GH_USER} <FiArrowUpRight size={11} />
        </a>
        <span className="gh-summary-text">{summary}</span>
      </div>

      {stats?.recent?.length > 0 && (
        <div className="gh-recent-list">
          {stats.recent.map(repo => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer" className="gh-repo-row">
              <span className="gh-repo-name">{repo.name}</span>
              <span className="gh-repo-meta">
                {repo.language && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: LANG_COLORS[repo.language] || '#666666',
                      flexShrink: 0,
                    }} />
                    <span>{repo.language}</span>
                  </span>
                )}
                {repo.stars > 0 && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <FiStar size={10} /> {repo.stars}
                  </span>
                )}
                <span style={{ color: '#666666' }}>{timeAgo(repo.pushed_at)}</span>
              </span>
            </a>
          ))}
        </div>
      )}

      <style>{`
        .gh-compact-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #141414;
        }
        .gh-plain-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          letter-spacing: 0.02em;
          color: #a0a0a0;
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .gh-plain-link:hover { color: #ffffff; }
        .gh-summary-text {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #666666;
          letter-spacing: 0.02em;
        }
        .gh-recent-list {
          display: flex;
          flex-direction: column;
        }
        .gh-repo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 0;
          border-bottom: 1px solid #141414;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .gh-recent-list .gh-repo-row:last-child { border-bottom: none; }
        .gh-repo-row:hover { opacity: 0.7; }
        .gh-repo-name {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #cccccc;
          letter-spacing: 0.01em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .gh-repo-meta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          color: #888888;
        }

        @media (max-width: 480px) {
          .gh-repo-meta { gap: 8px; }
        }
      `}</style>
    </motion.div>
  );
}
