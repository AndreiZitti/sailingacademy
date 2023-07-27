import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root') // add this line to avoid the console warning

function NewsCard({ title, image, description, details }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="newscard" onClick={openModal}>
            <h2 className="newscard-title">{title}</h2>
            {image && <img className="newscard-image" src={image} alt={title} />}
            <p className="newscard-description">{description}</p>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="News Details">
                <h2>{title}</h2>
                {image && <img src={image} alt={title} />}
                <p>{description}</p>
                <p>{details}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}

export default NewsCard;
