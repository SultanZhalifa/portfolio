import './index.css';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import Skills         from './components/Skills';
import Projects       from './components/Projects';
import Experience     from './components/Experience';
import Certifications from './components/Certifications';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import ProgressBar    from './components/ProgressBar';
import SideNav        from './components/SideNav';
import BackToTop      from './components/BackToTop';

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ProgressBar />
      <SideNav />
      <BackToTop />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
