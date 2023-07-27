import React, { useContext, useState } from 'react';
import NewsCard from '../NewsCard';
import Modal from 'react-modal';
import { AuthContext } from '../AuthContext'; // path to your AuthContext
import './News.css';

function News() {
    const [newsCards, setNewsCards] = useState([
        {
            title: 'News 1',
            image: '',
            description: 'This is the description for news 1.',
            details: 'These are some additional details for news 1.'
        },
        {
            title: 'News 2',
            image: '',
            description: 'This is the description for news 2.',
            details: 'These are some additional details for news 2.'
        },
        {
            title: 'News 3',
            description: 'This is the description for news 3, no image for this one.',
            details: 'These are some additional details for news 3.'
        }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const { isAuthenticated } = useContext(AuthContext);

    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewsCard(newTitle, newDescription);
        handleModalClose();
    };

    const addNewsCard = (title, description) => {
        const newCard = {title, description};
        setNewsCards([...newsCards, newCard]);
    };

    return (
        <div className='body'>
            {isAuthenticated && (
                <button onClick={handleModalOpen}>Add news</button>
            )}
            <Modal isOpen={showModal} onClose={handleModalClose}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    </label>
                    <label>
                        Description:
                        <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </Modal>
            <div className="newsgrid">
                {newsCards.map((news, index) => (
                    <NewsCard key={index} title={news.title} image={news.image} description={news.description} details={news.details} />
                ))}
            </div>
        </div>
    );
}

export default News;
