import React, { useState, useEffect, useRef } from 'react';
import HeroSection from '../HeroSection';  // replace with your HeroSection's path
import Cards from '../Cards.js';
import '../Cards.css';
import Popup from '../Popup'; 
import Footer from '../Footer'; 
import LoginPage from  './LoginPage'
import '../../App.css';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const heroRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(!entry.isIntersecting));
    });

    observer.observe(heroRef.current);

    // clean up on unmounting
    return () => heroRef.current && observer.unobserve(heroRef.current);
  }, []);

  return (
    <div>
      <div>
      <div ref={heroRef}>
        <HeroSection />
      </div>
      
   
      <Cards />
      {isVisible && <button className="button-fixed" onClick={() => setIsPopupOpen(true)}>
  <img src='images/contact.png' alt="button image" className='button-image' />
  <div className='button-text'>Contact us!</div>
      </button>
}
     {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    
    </div>
    <div><Footer /></div>
    </div>
    
  );
}

export default Home;
