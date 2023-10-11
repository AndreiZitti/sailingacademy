import React from 'react';
import CardItem from './CardItem';
import { useTranslation } from 'react-i18next';


function Courses() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('For the more interested ones')}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <div className='cards__items'>
            <CardItem
              src='images/profil2.jpg'
              text={t('We offer courses for kids/adults and for all levels. For more details contact us')}
              label={t('Sailing Courses')}
            />
            <CardItem
              src='images/bigBoat.jpg'
              text={t('Skipper courses for categories A, B, C, D, S for motor and/or sailboats. For more details contact us')}
              label={t('Courses for Boat Skipper')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
