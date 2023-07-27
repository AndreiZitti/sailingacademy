import React from 'react';
import './AboutUsCard.css';

const AboutUsCard = ({ className, image, title, description }) => {
    return (
        <div className={`about-us-card ${className}`}>
           <div className="image-container">
        <img src={image} alt={title} />
      </div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default AboutUsCard;
