import React from 'react';
import './Popup.css';  // Add your styles in this file
import ProgrammCard from '../ContactUs/ProgrammCard';
function Popup({ onClose }) {
  return (
    <div className="popup">
      <div className="popup_inner">
        <ProgrammCard />
        <h1>Contact</h1>
        <p> You can contact us via email at contact@sailingacademy.ro or via phone at 0730333755 </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
