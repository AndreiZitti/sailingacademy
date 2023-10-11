import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import FlipCard from './FlipCard';
import Map from './Map';
import Rent from './RentCards';
import Courses from './CoursesCards';
import Membership from './MembershipCard';
import { useTranslation } from 'react-i18next';


function Cards({ isMapVisible }) {
  const { t } = useTranslation();
  return (
    <div className='cards'>
      
      <div id='Rent'>
        <Rent />
      </div>

      <div id='Courses'>
        <Courses />
      </div>

      <div id='Membership'>
        <Membership />
      </div>
      <h1>{t('Come visit us !')}</h1>
      <Map isVisible={isMapVisible} />
    </div>
  );
}

export default Cards;
