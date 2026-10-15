import { useLayoutEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import './index.css';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import Now            from './components/Now';
import Skills         from './components/Skills';
import Projects       from './components/Projects';
import Experience     from './components/Experience';
import Certifications from './components/Certifications';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import SideNav        from './components/SideNav';
import BackToTop      from './components/BackToTop';
import CaseStudyPage  from './components/CaseStudyPage';
import { useCaseStudy, savedOrigin } from './lib/route';

const siteTitle = document.title;

export default function App() {
  const project = useCaseStudy();

  useLayoutEffect(() => {
    document.title = project ? `${project.title} | Sultan Zhalifunnas Musyaffa` : siteTitle;
    if (project) return;
    // Back from a case study: return to the spot the visitor left, or to the section they asked for.
    const saved = savedOrigin();
    const hash = window.location.hash;
    if (saved && saved.hash === hash) {
      window.scrollTo({ top: saved.y, behavior: 'instant' });
    } else if (hash.length > 1) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    }
  }, [project]);

  return (
    // reducedMotion="user": skip transform/layout animations for people who ask the OS for less motion
    <MotionConfig reducedMotion="user">
      {/* Moves focus instead of changing the hash, which would leave an open case study. */}
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}
      >
        Skip to content
      </a>
      {!project && <SideNav />}
      <BackToTop />
      <Navbar />
      <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        {project && <CaseStudyPage key={project.id} project={project} />}
        {/* Stays mounted behind a case study so filters, search and scroll position survive the round trip. */}
        <div hidden={Boolean(project)}>
          <Hero />
          <Now />
          <Projects />
          <Experience />
          <Skills />
          <Certifications />
          <Contact />
        </div>
      </main>
      <Footer />
    </MotionConfig>
  );
}
