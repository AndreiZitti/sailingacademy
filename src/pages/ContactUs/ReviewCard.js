import React from 'react';

const Star = ({ filled }) => {
  return <span className={`star ${filled ? '' : 'empty'}`}>{filled ? '★' : '☆'}</span>;
};

const ReviewCard = ({ name, rating, text, src, reviewUrl }) => {
  return (
    <div className="reviewCard">
      <div>
        <img src={src} alt={name} className="profilePic" />
      </div>
      <div className="rating">
        {[...Array(5)].map((star, index) => <Star key={index} filled={index < rating} />)}
      </div>
      <p className="reviewText">{text}</p>
      <a href={reviewUrl} className="reviewLink">Review this business on Google</a>
    </div>
  );
};

export default ReviewCard;
