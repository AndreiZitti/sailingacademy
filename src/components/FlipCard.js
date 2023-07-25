import React, { useState } from 'react';
import './FlipCard.css'; // Import the CSS file

function FlipCard({frontImage, backText, title}) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="card__face card__face--front">
                <img src={frontImage} alt="front" />
                <div className="card__title">{title}</div>
                <div className="card__clickme">Click me!</div>
            </div>
            <div className="card__face card__face--back">
                <p>{backText}</p>
            </div>
        </div>
    );
}

export default FlipCard;
