import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import KazanForum from './pages/KazanForum';
import Career from './pages/Career';
import Gallery from './components/Gallery';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export default function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/hizmetlerimiz" element={<Services />} />
          <Route path="/sss" element={<FAQ />} />
          <Route path="/projeler" element={<Projects />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/galeri" element={<Gallery />} />
          <Route path="/kariyer" element={<Career />} />
          <Route path="/proje/kazan-forum-2026" element={<KazanForum />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </LanguageProvider>
    </ThemeProvider>
  );
}
