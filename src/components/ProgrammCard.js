import React from 'react';
import './ProgrammCard.css'; 

function ProgrammCard() {
    return (
        <div className="programm-card">
            <h2>Opening Hours</h2>
            <ul>
                <li>Monday: Closed</li>
                <li>Tuesday: 9:00 - 17:30</li>
                <li>Wednesday: 9:00 - 17:30</li>
                <li>Thursday:  9:00 - 17:30</li>
                <li>Friday:  9:00 - 17:30</li>
                <li>Saturday: 9:00 - 20:00</li>
                <li>Sunday: 9:00 - 20:00</li>
            </ul>
        </div>
    );
}

export default ProgrammCard;
