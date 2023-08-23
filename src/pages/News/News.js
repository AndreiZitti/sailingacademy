import React, { useContext, useState } from 'react';
import NewsCard from './NewsCard';
import Modal from 'react-modal';
import { AuthContext } from '../../AuthContext'; // path to your AuthContext
import './News.css';

function News() {
    const [newsCards, setNewsCards] = useState([
        {
            title: 'O saptamana pe malul lacului!',
            image: 'images/1.jpeg',
            description: 'Petreceti vara la Sailing Academy!            ',
            details: "Petreceti vara impreuna cu noi la Sailing Academy. Alaturi de Sensei Nicolae Stoian, Sailing Academy va ofera un program distractiv in aer liber, o oportunitate perfecta pentru copiii de toate varstele sa isi faca prieteni noi intr-o atmosfera destinsa, cu jocurii si activitati sportive. Ne bucuram sa dam copiilor sansa de a petrece timp in natura, de a lua o pauza de la ecranele telefoanelor si a tabletelor. PROGRAM DE PREGĂTIRE FIZICĂ 10:30 - 12:00 Exerciții cu greutatea corpului Exerciții de mobilitate Învățarea dozării efortului Exerciții de respirație PAUZA DE MASĂ 12:00 - 13:00 Healty lunch box Mayday ACTIVITĂȚI RECREATIV SPORTIVE 13:00- 16:00 Cu Kaiak-ul / Stand Up Paddle-ul pe apă Noțiuni introductive în sailing Ping-Pong Badminton Jocuri creative Concursuri Plimbare cu barca Pentru mai multe informatii contactati-ne la 0730333755 sau contact@sailingacademy.ro"





            
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
            <div>
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
        </div>
    );
}

export default News;
