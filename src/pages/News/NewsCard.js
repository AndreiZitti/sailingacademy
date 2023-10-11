import { AuthContext } from '../../AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import './NewsCard.css'; // or wherever your CSS file is located

function NewsCard({ title, image, description, openModal, onDelete, onEdit }) {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="newscard" onClick={openModal}>
        
   
    <div className="newscard-content">
       
        <h2 className="newscard-title">{title}</h2>
        <img src={image} alt={title} className="newscard-image" />
        <p className="newscard-description">{description}</p>
    </div>
    {isAuthenticated && (
            <button className="delete-btn" onClick={(e) => {
                e.stopPropagation();
                onDelete();
            }}>Delete</button>
        )}  
       {isAuthenticated && (
    <button className="edit-btn" onClick={(e) => {
        e.stopPropagation();
        onEdit();
    }}>Edit</button>
)}
</div>

    );
}

export default NewsCard;
