import React, { useContext, useState, useEffect } from 'react';
import { db } from '../../firebase'; // Ensure this is the path to your firebase.js
import { collection, addDoc, getDocs } from 'firebase/firestore';
import NewsCard from './NewsCard';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AuthContext } from '../../AuthContext';
import './News.css';

function News() {
    const [modalInfo, setModalInfo] = useState({ isOpen: false, currentNews: null, modalType: 'view' });
    const { isAuthenticated } = useContext(AuthContext);

    const [newsCards, setNewsCards] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newDetails, setNewDetails] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const newsCollection = collection(db, 'news');
            const newsSnapshot = await getDocs(newsCollection);
            const newsList = newsSnapshot.docs.map(doc => doc.data());
            setNewsCards(newsList);
        };

        fetchData();
    }, []);

    const handleAddNews = async (e) => {
        e.preventDefault();
        const newsCollection = collection(db, 'news');
        await addDoc(newsCollection, {
            title: newTitle,
            description: newDescription,
            image: newImage,
            details: newDetails.replace(/\n/g, '<br/>')
        });
        setNewsCards([...newsCards, { title: newTitle, description: newDescription, image: newImage, details: newDetails }]);
        setNewTitle('');
        setNewDescription('');
        setNewImage('');
        setNewDetails('');
        handleModalClose();
    };

    const handleModalOpen = (modalType) => {
        setModalInfo({ isOpen: true, currentNews: null, modalType });
    };

    const handleModalClose = () => {
        setModalInfo({ isOpen: false, currentNews: null, modalType: 'view' });
    };

    const AddNewsModalBody = (
        <Box 
            sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                border: '2px solid #000',
                boxShadow: 24, 
                p: 4 
            }}
        >
            <form onSubmit={handleAddNews}>
                <label>
                    Title:
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                </label>
                <label>
                    Image URL:
                    <input value={newImage} onChange={(e) => setNewImage(e.target.value)} />
                </label>
                <label>
                    Details:
                    <textarea value={newDetails} onChange={(e) => setNewDetails(e.target.value)} />
                </label>
                <button type="submit">Add</button>
            </form>
        </Box>
    );

    const ViewNewsModalBody = (
        <Box 
            sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                border: '2px solid #000',
                boxShadow: 24, 
                p: 4 
            }}
        >
            <h2>{modalInfo.currentNews?.title}</h2>
            <img src={modalInfo.currentNews?.image} alt={modalInfo.currentNews?.title} style={{width: '100%'}} />
            <p>{modalInfo.currentNews?.description}</p>
            <p dangerouslySetInnerHTML={{ __html: modalInfo.currentNews?.details }}></p>
            <button onClick={handleModalClose}>Close</button>
        </Box>
    );

    return (
        <div className='body'>
            {isAuthenticated && (
                <button onClick={() => handleModalOpen('add')}>Add news</button>
            )}
            <div className="newsgrid">
                {newsCards.map((news, index) => (
                    <NewsCard 
                        key={index} 
                        title={news.title} 
                        description={news.description}
                        openModal={() => setModalInfo({ isOpen: true, currentNews: news, modalType: 'view' })}
                    />
                ))}
            </div>
            <Modal open={modalInfo.isOpen} onClose={handleModalClose}>
                {modalInfo.modalType === 'add' ? AddNewsModalBody : ViewNewsModalBody}
            </Modal>
        </div>
    );
}

export default News;
