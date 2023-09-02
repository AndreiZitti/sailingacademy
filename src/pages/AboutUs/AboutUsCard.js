import React from 'react';
import './AboutUsCard.css';

const AboutUsCard = ({ className, title, description }) => {
    return (
        <div className={`about-us-card ${className}`}>
        
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default AboutUsCard;
