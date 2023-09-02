import React from 'react';
 

function CardItem(props) {
  return (
    <div className='card-container'>
      <figure className='card-img'>
        <img alt='Sailing is cool' src={props.src} />
      </figure>
      <div className='card-title'>
        <h5>{props.label}</h5>
      </div>
      <div className='card-description'>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default CardItem;
