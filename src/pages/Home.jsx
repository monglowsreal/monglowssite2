import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Projects from '../components/Projects';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Projects />
      <Philosophy />
      <Protocol />
      <Footer />
    </>
  );
}
