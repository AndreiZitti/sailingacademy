import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import FlipCard from './FlipCard';
import Map from './Map';
import Rent from './RentCards';
import Courses from './CoursesCards';
import Membership from './MembershipCard';

function Cards({ topRef, bottomRef }) {
  return (
    <div className='cards' ref={topRef}>
      <div id='Rent'>
        <Rent />
      </div>

      <div id='Courses'>
        <Courses />
      </div>

      <div id='Membership'>
        <Membership />
      </div>
      <div id='Contact'>
      <h1>Come visit us !</h1>
    
      </div>
    </div>
  );
}

export default Cards;
