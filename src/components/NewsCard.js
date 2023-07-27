import React, { useState } from 'react';
import NewsModal from './NewsModal';

function NewsCard({ title, image, description, details }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        console.log("Attempting to close modal");
        setModalIsOpen(false);
    };

    return (
        <div className="newscard" onClick={openModal}>
    <div className="newscard-content">
        <h2 className="newscard-title">{title}</h2>
        {image && <img className="newscard-image" src={image} alt={title} />}
        <p className="newscard-description">{description}</p>
    </div>
    <NewsModal isOpen={modalIsOpen} closeModal={closeModal} title={title} image={image} description={description} details={details} />
</div>

    );
}

export default NewsCard;
