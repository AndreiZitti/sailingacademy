import React from 'react';
import CardItem from './CardItem';
import { useTranslation } from 'react-i18next';


function Rent() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('For a quick stroll on the lake')}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <div className='cards__items'>
            <CardItem
              src='images/canoe.jpeg'
              text={t('Rent a Kayak for 50 lei/hour ...')}
              label='Kayak'
            />
            <CardItem
              src='images/SUPstock.jpeg'
              text={t('... or better rent a Stand Up Paddle for 50 lei/hour')}
              label='SUP'
            />
            <CardItem
              src='images/profil3.jpg'
              text={t('We also offer sailing boats for total beginners and professionals for 50-100lei/hour')}
              label={t('Sailing Boats')}
            />
          </div>
          </div>
      </div>
    </div>
  );
}

export default Rent;
