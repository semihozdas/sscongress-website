import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Projects />
      <Gallery />
    </>
  );
};

export default Home;
