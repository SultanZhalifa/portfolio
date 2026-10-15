import { useSyncExternalStore } from 'react';
import { data } from '../data';

// Case studies live at #/work/<slug>, so a link can be pasted anywhere and the
// browser's back button works. A hash route needs no server rewrite rules.
const PREFIX = '#/work/';

export const slugOf = (project) =>
  project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const caseHref = (project) => `${PREFIX}${slugOf(project)}`;

export const caseProjects = data.projects.filter((p) => p.caseStudy);

const subscribe = (callback) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};

const readHash = () => window.location.hash;

// The project whose case study the URL points at, or null for the normal page.
export function useCaseStudy() {
  const hash = useSyncExternalStore(subscribe, readHash, () => '');
  if (!hash.startsWith(PREFIX)) return null;
  let slug = hash.slice(PREFIX.length).replace(/\/$/, '');
  try {
    slug = decodeURIComponent(slug);
  } catch {
    return null;
  }
  return caseProjects.find((p) => slugOf(p) === slug) || null;
}

// Where the visitor was when they opened a case study, so going back lands
// them on the same card instead of the top of the page.
let origin = null;

export const rememberOrigin = () => {
  origin = { hash: window.location.hash, y: window.scrollY };
};

export const savedOrigin = () => origin;

export function leaveCase() {
  if (origin) window.history.back();
  else window.location.hash = '#projects';
}

// Previous/next links replace the history entry, so "back" still goes to the page list.
export const replaceWith = (href) => (event) => {
  event.preventDefault();
  window.location.replace(href);
};
