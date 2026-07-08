import { useState, useEffect } from 'react';

// Single source of truth for page sections — used by Navbar and SideNav.
export const sections = [
  { id: 'hero',           label: 'About'          },
  { id: 'skills',         label: 'Skills'         },
  { id: 'projects',       label: 'Projects'       },
  { id: 'experience',     label: 'Experience'     },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',        label: 'Contact'        },
];

export function useActiveSection(threshold = 0.3) {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [threshold]);

  return active;
}
