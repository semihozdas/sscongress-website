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

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminServices from './pages/admin/AdminServices';
import AdminProjects from './pages/admin/AdminProjects';
import AdminFAQ from './pages/admin/AdminFAQ';
import AdminGallery from './pages/admin/AdminGallery';
import AdminCareer from './pages/admin/AdminCareer';
import AdminContact from './pages/admin/AdminContact';
import AdminTranslations from './pages/admin/AdminTranslations';
import AdminSettings from './pages/admin/AdminSettings';

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
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="faq" element={<AdminFAQ />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="career" element={<AdminCareer />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="translations" element={<AdminTranslations />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={
          <>
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
          </>
        } />
      </Routes>
    </Router>
    </LanguageProvider>
    </ThemeProvider>
  );
}
