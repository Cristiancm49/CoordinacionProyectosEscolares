import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans transition-colors duration-500 ease-in-out">
      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero />

      {/* Features */}
      <section
        className="py-20 px-6 md:px-20 bg-gray-100 transition-colors duration-500 ease-in-out"
        data-aos="fade-up"
      >
        <Features />
      </section>

      {/* Footer */}
      <footer className="transition-all duration-500 ease-in-out" data-aos="fade-up">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
