import React from 'react';
import './HeroSection.css';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';


function HeroSection() {
  const { t } = useTranslation();
  return (
    <div className='hero-wrapper'>
    <LanguageSwitcher />
    <div className='hero-container'>
    <LanguageSwitcher />
      <video src='/videos/HeroVideo.mp4' autoPlay loop muted playsInline  poster='images/placeholderBoat.png'/>
      <h1>{t('ADVENTURE AWAITS')}</h1>
      <p>{t('What are you waiting for?')}</p>
    </div>
    </div>
  );
}

export default HeroSection;
