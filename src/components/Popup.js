import React from 'react';
import './Popup.css';  // Add your styles in this file

function Popup({ onClose }) {
  return (
    <div className="popup">
      <div className="popup_inner">
        <h1>Working hours</h1>
        <h1>Contact</h1>
        <p> You can contact us via email at sailingacademy@yahoo.com or via phone at 0712123123 </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
