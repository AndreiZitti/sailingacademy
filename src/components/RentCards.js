import React from 'react';
import CardItem from './CardItem';

function Rent() {
  return (
    <div>
      <h1>For a quick stroll on the lake</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <div className='cards__items'>
            <CardItem
              src='images/Kayak.jpg'
              text='Rent a Kayak for 30 lei/hour ...'
              label='Kayak'
            />
            <CardItem
              src='images/SUP.jpg'
              text='... or better rent a Stand Up Paddle for 50 lei/hour'
              label='SUP'
            />
            <CardItem
              src='images/LASER.jpg'
              text='We also offer sailing boats for total beginners and professionals for 100lei/hour'
              label='Laser'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rent;
