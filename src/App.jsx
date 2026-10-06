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

export default function App() {
  return (
    // reducedMotion="user": skip transform/layout animations for people who ask the OS for less motion
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SideNav />
      <BackToTop />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Now />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
