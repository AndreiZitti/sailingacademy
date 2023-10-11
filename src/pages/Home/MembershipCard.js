import React from 'react';
import FlipCard from './FlipCard';
import { useTranslation } from 'react-i18next';

function Membership() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('To be the real deal, become a member!')}</h1>
      <div className="flip-card-grid">
        <FlipCard 
          frontImage="images/ClubPhoto.jpg" 
          backText={{
            requirements: [
              t('- You must have completed the Optimist or Laser initiation course at Sailing Academy.'), 
              t('- You must fully pay the annual fee of 1200 lei.')
            ],
            benefits: [
              t('- Access card for Sailing Academy club.'), 
              t('- 50% discount for renting Kayaks, Stand Up Paddles, and Sailboats.'), 
              t('- FRY sports ID card.')
            ]
          }} 
          title="JUNIORS" 
        />
        <FlipCard 
          frontImage="images/profil1.jpg" 
          backText={{
            requirements: [
              t('- You must have a previous year\'s FRY ID or have completed the adult sailing courses at Sailing Academy.'), 
              t('- You must fully pay the annual fee of 2400 lei.')
            ],
            benefits: [
              t('- Access card for Sailing Academy club.'), 
              t('- 25% discount for renting Kayaks, Stand Up Paddles, and Sailboats.'), 
              t('- FRY sports ID card.')
            ]
          }} 
          title="ADULTS" 
        />
        <FlipCard 
          frontImage="images/profil3.jpg" 
          imageClass = "simpatizanti-image"
          backText={{
            requirements: [
              t('- You must have been an active sailing athlete.'), 
              t('- You must fully pay the annual fee of 1800 lei.')
            ],
            benefits: [
              t('- Access card for Sailing Academy club.'), 
              t('- 25% discount for renting Kayaks, Stand Up Paddles, and Sailboats.'), 
              t('- FRY sports ID card.')
            ]
          }} 
          title="NOSTALGIC ( 50+ )" 
        />
        <FlipCard 
          frontImage="images/Simpatizanti.jpg" 
          imageClass = "simpatizanti-image"
          backText={{
            requirements: [
              t('- You must fully pay the annual fee of 2400 lei.')
            ],
            benefits: [
              t('- Access card for Sailing Academy club.'), 
              t('- 25% discount for renting Kayaks, Stand Up Paddles, and Sailboats.'), 
              t('- Right to store personal Kayak/Stand Up Paddle in the club\'s space.')
            ]
          }} 
          title="SIMPATIZANTI" 
        />
      </div>
    </>
  );
}

export default Membership;
