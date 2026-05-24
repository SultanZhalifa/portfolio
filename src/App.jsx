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
import Cursor         from './components/Cursor';
import SideNav        from './components/SideNav';
import BackToTop      from './components/BackToTop';

export default function App() {
  return (
    <>
      <ProgressBar />
      <Cursor />
      <SideNav />
      <BackToTop />
      <Navbar />
      <main>
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
