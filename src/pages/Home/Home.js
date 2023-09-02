import React, { useState, useEffect, useRef } from 'react';
import HeroSection from './HeroSection';
import Cards from './Cards.js';
import Footer from './Footer'; 
import '../../App.css';
import LanguageSwitcher from '../../components/LanguageSwitcher';

function Home() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const cardsRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsMapVisible(entry.isIntersecting));
    });

    observer.observe(cardsRef.current);

    // clean up on unmounting
    return () => cardsRef.current && observer.unobserve(cardsRef.current);
  }, []);

  return (
    <div className="site-background">
            <LanguageSwitcher />

      <HeroSection />
      <div ref={cardsRef}>
        <Cards isMapVisible={isMapVisible} />
      </div>
      <Footer />
    </div>
   
  
  );
}

export default Home;
