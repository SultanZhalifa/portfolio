import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink, FiLink, FiCheck } from 'react-icons/fi';
import { previewOf } from '../lib/preview';
import { caseHref, caseProjects, leaveCase, replaceWith, shareUrl } from '../lib/route';

function Bullets({ items }) {
  return (
    <ul className="cs-list">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function Steps({ items }) {
  return (
    <ol className="cs-steps">
      {items.map((item, i) => (
        <li key={i}>
          <span aria-hidden="true" className="cs-step-num">{i + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Decisions({ items }) {
  return (
    <div className="cs-decisions">
      {items.map((d) => (
        <div key={d.title} className="cs-decision">
          <h3>{d.title}</h3>
          <p>{d.text}</p>
        </div>
      ))}
    </div>
  );
}

function MetricsTable({ metrics }) {
  return (
    <div>
      <div className="cs-table-wrap">
        <table className="cs-metrics">
          <caption className="sr-only">{metrics.caption}</caption>
          <thead>
            <tr>{metrics.columns.map((c, i) => <th key={c} scope="col" style={{ textAlign: i < 2 ? 'left' : 'right' }}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {metrics.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => i === 0
                  ? <th key={i} scope="row" style={{ textAlign: 'left' }}>{cell}</th>
                  : <td key={i} style={{ textAlign: i < 2 ? 'left' : 'right' }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p aria-hidden="true" className="cs-caption">{metrics.caption}</p>
    </div>
  );
}

// Only the blocks a project actually has are shown, so shorter case studies stay short.
function outlineOf(cs) {
  const list = [{ id: 'problem', label: 'The Problem' }];
  if (cs.flow) list.push({ id: 'how-it-works', label: 'How It Works' });
  else if (cs.approach) list.push({ id: 'what-i-built', label: 'What I Built' });
  if (cs.decisions) list.push({ id: 'decisions', label: 'Decisions' });
  if (cs.metrics) list.push({ id: 'model-results', label: 'Model Results' });
  list.push({ id: 'results', label: 'Results' });
  if (cs.limits) list.push({ id: 'known-limits', label: 'Known Limits' });
  return list;
}

function Fact({ label, children }) {
  if (!children) return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function CaseStudyPage({ project }) {
  const cs = project.caseStudy;
  const headingRef = useRef(null);
  const items = useMemo(() => outlineOf(cs), [cs]);
  const [active, setActive] = useState(items[0].id);
  const [imageOk, setImageOk] = useState(true);
  const [copy, setCopy] = useState(null); // null, 'done' or 'failed'
  const copyTimer = useRef(null);
  const src = previewOf(project);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  // The address bar shows the #/work/ form, which link previews can't read, so offer the /work/ one.
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl(project));
      setCopy('done');
    } catch {
      setCopy('failed');
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopy(null), 2400);
  };

  const index = caseProjects.findIndex((p) => p.id === project.id);
  const neighbours = caseProjects.length > 2
    ? [
        { label: 'Previous', project: caseProjects[(index - 1 + caseProjects.length) % caseProjects.length] },
        { label: 'Next', project: caseProjects[(index + 1) % caseProjects.length] },
      ]
    : [];

  // A new case study starts at the top, with focus on its title for screen readers.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    headingRef.current?.focus({ preventScroll: true });
  }, [project.id]);

  useEffect(() => {
    const els = items.map(({ id }) => document.getElementById(`cs-${id}`)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id.slice(3)); }),
      { rootMargin: '-15% 0px -70% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const jumpTo = (id) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(`cs-${id}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const body = {
    'problem': <p className="cs-text">{cs.problem}</p>,
    'how-it-works': cs.flow && <Steps items={cs.flow} />,
    'what-i-built': cs.approach && <Bullets items={cs.approach} />,
    'decisions': cs.decisions && <Decisions items={cs.decisions} />,
    'model-results': cs.metrics && <MetricsTable metrics={cs.metrics} />,
    'results': <Bullets items={cs.result} />,
    'known-limits': cs.limits && <Bullets items={cs.limits} />,
  };

  return (
    <article className="cs-page" aria-labelledby="cs-title">
      <div className="container">
        <button type="button" className="cs-back" onClick={leaveCase}>
          <FiArrowLeft size={14} aria-hidden="true" /> All projects
        </button>

        <header>
          <p className="cs-eyebrow">{project.context}</p>
          <h1 id="cs-title" ref={headingRef} tabIndex={-1} className="cs-title">{project.title}</h1>
          <p className="cs-subtitle">{project.subtitle}</p>

          <dl className="cs-facts">
            <Fact label="Role">{project.role}</Fact>
            <Fact label="Team">{cs.team}</Fact>
            <Fact label="Period">{project.period}</Fact>
          </dl>

          <div className="cs-tags">
            {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <div className="cs-actions">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                <FiExternalLink size={14} /> Live demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <FiGithub size={14} /> Source code
              </a>
            )}
            <button type="button" onClick={copyLink} className="btn btn-ghost" aria-live="polite">
              {copy === 'done' ? <FiCheck size={14} /> : <FiLink size={14} />}
              {copy === 'done' ? 'Link copied' : copy === 'failed' ? "Couldn't copy" : 'Copy link'}
            </button>
          </div>
        </header>

        {src && imageOk && (
          <figure className="cs-figure">
            <img
              src={src}
              alt={`Screenshot of ${project.title}: ${project.subtitle}`}
              width="1000"
              height="625"
              onError={() => setImageOk(false)}
            />
          </figure>
        )}

        <div className="cs-layout">
          <nav className="cs-toc" aria-label="On this page">
            <p className="cs-toc-title">On this page</p>
            <ol>
              {items.map(({ id, label }) => (
                <li key={id}>
                  <button type="button" onClick={() => jumpTo(id)} aria-current={active === id ? 'true' : undefined}>
                    {label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            {items.map(({ id, label }, i) => (
              <section key={id} id={`cs-${id}`} aria-labelledby={`cs-h-${id}`} className="cs-section">
                <div className="cs-section-head">
                  <span aria-hidden="true" className="cs-index">{String(i + 1).padStart(2, '0')}</span>
                  <h2 id={`cs-h-${id}`}>{label}</h2>
                </div>
                {body[id]}
              </section>
            ))}

            {neighbours.length > 0 && (
              <nav className="cs-more" aria-label="More case studies">
                {neighbours.map(({ label, project: p }) => (
                  <a key={label} href={caseHref(p)} onClick={replaceWith(caseHref(p))}>
                    <span className="cs-more-label">
                      {label === 'Previous' && <FiArrowLeft size={12} aria-hidden="true" />}
                      {label}
                      {label === 'Next' && <FiArrowRight size={12} aria-hidden="true" />}
                    </span>
                    <span className="cs-more-title">{p.title}</span>
                    <span className="cs-more-sub">{p.subtitle}</span>
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cs-page { padding: clamp(92px, 13vh, 124px) 0 clamp(56px, 8vw, 96px); position: relative; z-index: 1; }

        .cs-back {
          display: inline-flex; align-items: center; gap: 8px;
          background: none; border: 0; padding: 6px 0; cursor: pointer;
          color: #a0a0a0; font: 500 0.78rem var(--font-mono); letter-spacing: 0.04em;
          margin-bottom: clamp(24px, 4vw, 40px);
          transition: color 0.2s ease;
        }
        .cs-back:hover { color: #ededed; }
        .cs-back:focus-visible, .cs-toc button:focus-visible { outline: 2px solid #ededed; outline-offset: 4px; border-radius: 4px; }

        .cs-eyebrow {
          font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: #808080; margin-bottom: 16px;
        }
        .cs-title {
          font-family: var(--font-display); font-size: clamp(2.2rem, 6vw, 4rem); font-weight: 800;
          letter-spacing: -0.035em; line-height: 1.04; color: #ededed; margin-bottom: 14px;
        }
        .cs-title:focus { outline: none; }
        .cs-subtitle { color: #9a9a9a; font-size: clamp(1rem, 1.8vw, 1.15rem); line-height: 1.6; max-width: 600px; margin-bottom: 28px; }

        .cs-facts { display: flex; flex-wrap: wrap; gap: 14px 40px; margin: 0 0 24px; }
        .cs-facts dt {
          font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #808080; margin-bottom: 4px;
        }
        .cs-facts dd { margin: 0; color: #e6e6e6; font-size: 0.92rem; }

        .cs-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; }
        .cs-actions { display: flex; flex-wrap: wrap; gap: 12px; }

        .cs-figure {
          margin: clamp(32px, 5vw, 56px) 0 0; border: 1px solid #252525;
          border-radius: 12px; overflow: hidden; background: #131313;
        }
        .cs-figure img { display: block; width: 100%; height: auto; }

        .cs-layout { display: grid; grid-template-columns: minmax(0, 1fr); margin-top: clamp(40px, 6vw, 72px); }
        .cs-toc { display: none; }
        .cs-toc-title {
          font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #808080; margin-bottom: 14px;
        }
        .cs-toc ol { list-style: none; margin: 0; padding: 0; }
        .cs-toc button {
          display: block; width: 100%; text-align: left; background: none; border: 0;
          border-left: 1px solid #252525; padding: 7px 0 7px 14px; cursor: pointer;
          color: #8a8a8a; font: 400 0.8rem var(--font-main); transition: color 0.2s ease, border-color 0.2s ease;
        }
        .cs-toc button:hover { color: #ededed; }
        .cs-toc button[aria-current="true"] { color: #ededed; border-left-color: #ededed; }
        @media (min-width: 1024px) {
          .cs-layout { grid-template-columns: 190px minmax(0, 720px); gap: 64px; }
          .cs-toc { display: block; position: sticky; top: 96px; align-self: start; }
        }

        .cs-section { padding-top: 28px; margin-bottom: clamp(36px, 5vw, 56px); border-top: 1px solid #212121; scroll-margin-top: 88px; }
        .cs-section-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 18px; }
        .cs-index { font-family: var(--font-mono); font-size: 0.72rem; color: #808080; }
        .cs-section h2 { font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em; color: #ededed; }

        .cs-text { font-size: 0.98rem; line-height: 1.85; color: #b4b4b4; max-width: 68ch; }

        .cs-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
        .cs-list li { position: relative; padding-left: 22px; font-size: 0.95rem; line-height: 1.75; color: #b0b0b0; max-width: 68ch; }
        .cs-list li::before { content: ''; position: absolute; left: 2px; top: 0.72em; width: 5px; height: 5px; background: #707070; }

        .cs-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
        .cs-steps li { display: flex; gap: 16px; font-size: 0.95rem; line-height: 1.75; color: #b4b4b4; max-width: 68ch; }
        .cs-step-num {
          flex-shrink: 0; width: 24px; height: 24px; margin-top: 2px; border-radius: 6px; border: 1px solid #323232;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: var(--font-mono); font-size: 0.72rem; color: #c4c4c4;
        }

        .cs-decisions { display: grid; gap: 12px; }
        .cs-decision { border: 1px solid #272727; border-radius: 10px; padding: 16px 18px; background: #141414; }
        .cs-decision h3 { font-size: 0.95rem; color: #ededed; font-weight: 600; margin-bottom: 6px; }
        .cs-decision p { font-size: 0.95rem; color: #a8a8a8; line-height: 1.75; }

        .cs-table-wrap { overflow-x: auto; border: 1px solid #272727; border-radius: 10px; }
        .cs-metrics { width: 100%; min-width: 520px; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.78rem; color: #b0b0b0; }
        .cs-metrics th, .cs-metrics td { padding: 10px 14px; border-bottom: 1px solid #232323; white-space: nowrap; }
        .cs-metrics thead th { color: #8a8a8a; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; font-size: 0.72rem; background: #141414; }
        .cs-metrics tbody th { color: #ededed; font-weight: 600; }
        .cs-metrics tbody tr:last-child th, .cs-metrics tbody tr:last-child td { border-bottom: none; }
        .cs-caption { font-size: 0.76rem; color: #8a8a8a; margin-top: 10px; font-family: var(--font-mono); }

        .cs-more { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: clamp(40px, 6vw, 64px); }
        .cs-more a {
          display: flex; flex-direction: column; gap: 4px; padding: 18px 20px; text-decoration: none;
          border: 1px solid #272727; border-radius: 12px; background: #141414; transition: border-color 0.2s ease;
        }
        .cs-more a:hover { border-color: #505050; }
        .cs-more a:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
        .cs-more a:last-child { text-align: right; align-items: flex-end; }
        .cs-more-label {
          display: inline-flex; align-items: center; gap: 6px; margin-bottom: 6px;
          font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #808080;
        }
        .cs-more-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: #ededed; }
        .cs-more-sub { font-size: 0.85rem; color: #8a8a8a; }
        @media (max-width: 640px) {
          .cs-more { grid-template-columns: 1fr; }
          .cs-more a:last-child { text-align: left; align-items: flex-start; }
        }
        @media (max-width: 480px) {
          .cs-actions .btn { flex: 1 1 100%; }
        }
      `}</style>
    </article>
  );
}
