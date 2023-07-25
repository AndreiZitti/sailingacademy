import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import FlipCard from './FlipCard';

function Cards({ topRef, bottomRef }) {
  return (
    <div className='cards'  ref={topRef}>
       
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
          </div>
          <div className='cards__items'>
            <CardItem
              src='images/LASER.jpg'
              text='We also offer sailing boats for total beginners and professionals for 100lei/hour'
              label='Laser'
            />
           
           
          </div>
        </div>
      </div>
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
        
          <div ref={bottomRef}></div>  {/* add this line at the end of your cards section */}

        </div>
      </div>
      <h1>To be the real deal, become a member!</h1>
      <div className="flip-card-grid">
      <FlipCard frontImage="images/Kayak.jpg" backText="Cerinte:
- Sa ai cursul de initiere Optimist sau Laser facut la Sailing Academy.

- Sa achiti integral taxa de 1200 lei / an

​

Beneficii:
- Card de acces club Sailing Academy
- Reducere de 50% pentru inchiriere Kaiac, Stand Up Paddle si Barci cu vele

- Legitimatie sportiv FRY." title="JUNIORS"/>
     <FlipCard frontImage="images/Kayak.jpg" backText="Cerinte:
- Sa ai cursul de initiere Optimist sau Laser facut la Sailing Academy.

- Sa achiti integral taxa de 1200 lei / an

​

Beneficii:
- Card de acces club Sailing Academy
- Reducere de 50% pentru inchiriere Kaiac, Stand Up Paddle si Barci cu vele

- Legitimatie sportiv FRY." title="ADULTS"/>
    <FlipCard frontImage="images/Kayak.jpg" backText="Cerinte:
- Sa ai cursul de initiere Optimist sau Laser facut la Sailing Academy.

- Sa achiti integral taxa de 1200 lei / an

​

Beneficii:
- Card de acces club Sailing Academy
- Reducere de 50% pentru inchiriere Kaiac, Stand Up Paddle si Barci cu vele

- Legitimatie sportiv FRY." title="NOSTALGIC"/>
    <FlipCard frontImage="images/Kayak.jpg" backText="Cerinte:
- Sa ai cursul de initiere Optimist sau Laser facut la Sailing Academy.

- Sa achiti integral taxa de 1200 lei / an

​

Beneficii:
- Card de acces club Sailing Academy
- Reducere de 50% pentru inchiriere Kaiac, Stand Up Paddle si Barci cu vele

- Legitimatie sportiv FRY." title="SIMPATIZANTI"/>
   </div>
    </div>
  );
}



export default Cards;