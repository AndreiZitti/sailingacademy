import React, { useState } from 'react';
import NewsModal from './NewsModal';

function NewsCard({ title, image, description, details, openModal }) {
    return (
        <div className="newscard" onClick={openModal}>
    <div className="newscard-content">
        <h2 className="newscard-title">{title}</h2>
        {image && <img className="newscard-image" src={image} alt={title} />}
        <p className="newscard-description">{description}</p>
    </div>
</div>

    );
}

export default NewsCard;
