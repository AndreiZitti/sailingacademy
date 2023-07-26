import React from 'react';
import CardItem from './CardItem';

function Courses() {
  return (
    <div>
      <h1>For the more interested ones</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <div className='cards__items'>
            <CardItem
              src='images/Kayak.jpg'
              text='We offer courses for kids/adults and for all levels. For more details contact us'
              label='Sailing courses'
            />
            <CardItem
              src='images/SUP.jpg'
              text='Skipper courses for categories A, B, C, D for motor and/or sailboats. For more details contact us'
              label='Courses for boat skipper'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
