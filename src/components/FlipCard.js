import React, { useState } from 'react';
import './FlipCard.css'; 

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
                <div className="backtext-section">
                    <h3>Requirements</h3>
                    <ul>
                        {backText.requirements.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="backtext-section">
                    <h3>Benefits</h3>
                    <ul>
                        {backText.benefits.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FlipCard;
