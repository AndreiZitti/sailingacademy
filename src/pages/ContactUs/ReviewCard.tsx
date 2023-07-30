import React from 'react';

export type ReviewProps = {
  name: string;
  rating: number;
  text: string;
  src: string;
  reviewUrl: string; // Add a new prop for the review URL
};

const ReviewCard: React.FC<ReviewProps> = ({ name, rating, text, src, reviewUrl }) => (
  <div style={{
    border: '1px solid #e0e0e0', 
    borderRadius: '8px', 
    padding: '20px', 
    margin: '10px', 
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    zIndex: 1,
    
  }}>
    <img src={src} alt={name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
    <div style={{ margin: '10px 0', fontSize: '20px', fontWeight: 'bold' }}>{rating}</div>
    <p style={{ margin: '10px 0', textAlign: 'center' }}>{text}</p>
    <a href={reviewUrl} style={{ marginTop: 'auto', color: '#4285f4', textDecoration: 'none' }}>Review this business on Google</a>
  </div>
);

export default ReviewCard;
