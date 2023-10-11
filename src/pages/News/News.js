import React, { useContext, useState, useEffect } from 'react';
import { db } from '../../firebase'; // Ensure this is the path to your firebase.js
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import NewsCard from './NewsCard';
import Modal from '@mui/material/Modal';
import { AuthContext } from '../../AuthContext';
import DeleteConfirmation from '../News/DeleteConfirmation';
import './News.css';
import { Box, TextField, Button, Typography } from '@mui/material';


function News() {
    const [modalInfo, setModalInfo] = useState({ isOpen: false, currentNews: null, modalType: 'view' });
    const { isAuthenticated } = useContext(AuthContext);
    const [deleteModalInfo, setDeleteModalInfo] = useState({ isOpen: false, postToDelete: null });
    const [newsCards, setNewsCards] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [newDetails, setNewDetails] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);
    const [livePreviewImageUrl, setLivePreviewImageUrl] = useState("");


    useEffect(() => {
        console.log(isAuthenticated);
        const fetchData = async () => {
            const newsCollection = collection(db, 'news');
            const newsSnapshot = await getDocs(newsCollection);
            const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNewsCards(newsList);
        };

        fetchData();
    }, []);

    const deletePost = async (post) => {
        try{
        const newsCollection = collection(db, 'news');
        // Assume each post has a unique ID field for easy deletion
        const postDoc = doc(newsCollection, post.id);
        await deleteDoc(postDoc);
    
        // Also delete the image from Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, `newsImages/${post.image}`);
        await deleteObject(imageRef);
    
        setNewsCards(newsCards.filter(n => n.id !== post.id));
        setDeleteModalInfo({ isOpen: false, postToDelete: null });
        }catch(error) {
            console.error("Error deleting post: ", error);
        }
    };

    const handleEditNews = async (e) => {
        e.preventDefault();

        const newsCollection = collection(db, 'news');
        const postDoc = doc(newsCollection, modalInfo.currentNews.id);

        let imageUrl = modalInfo.currentNews.image;
        if (newImage) {
            const storage = getStorage();
            const imageRef = ref(storage, `newsImages/${newImage.name}`);
            
            await uploadBytes(imageRef, newImage);
            imageUrl = await getDownloadURL(imageRef);
        }

        const updatedData = {
            title: newTitle,
            description: newDescription,
            image: imageUrl,
            details: newDetails.replace(/\n/g, '<br/>')
        };

        await updateDoc(postDoc, updatedData);

        // Update local state
        setNewsCards(prev => prev.map(news => news.id === modalInfo.currentNews.id ? { ...news, ...updatedData } : news));
        handleModalClose();
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
        let imageUrl = ''; // This will store the download URL of the uploaded image

        if (newImage) { // Only proceed if there's a new image to be uploaded
            const storage = getStorage();
            const imageRef = ref(storage, `newsImages/${newImage.name}`);
            
            await uploadBytes(imageRef, newImage);
            imageUrl = await getDownloadURL(imageRef);
        }
    
        const newsCollection = collection(db, 'news');
        await addDoc(newsCollection, {
            title: newTitle,
            description: newDescription,
            image: imageUrl,  // <-- Use the imageUrl instead
            details: newDetails.replace(/\n/g, '<br/>')
        });
        
        setNewsCards([...newsCards, { title: newTitle, description: newDescription, image: imageUrl, details: newDetails }]);
        setNewTitle('');
        setNewDescription('');
        setNewImage(null);
        setNewDetails('');
        handleModalClose();
    };
    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    
        const reader = new FileReader();
        reader.onload = function(e) {
            setLivePreviewImageUrl(e.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleModalOpen = (modalType, news = null) => {
        setModalInfo({ isOpen: true, currentNews: news, modalType });
        if (modalType === 'edit' && news) {
            setNewTitle(news.title);
            setNewDescription(news.description);
            setNewImage(null);
            setNewDetails(news.details.replace(/<br\/?>/g, '\n'));
        }
    };

    const handleSubmit = editMode ? handleEditNews : handleAddNews;


    const handleModalClose = () => {
        setModalInfo({ isOpen: false, currentNews: null, modalType: 'view' });
        setLivePreviewImageUrl(""); // Clear the live preview image
    };
    
    const AddOrEditNewsModalBody = (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                border: '2px solid #000',
                boxShadow: 24, 
                p: 4,
                gap: 2 // gap between items
            }}
        >
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {editMode ? "Edit News" : "Add News"}
            </Typography>
            <form onSubmit={handleSubmit} onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.type !== 'textarea') e.preventDefault();
            }}>
                <TextField 
                    label="Title" 
                    variant="outlined" 
                    fullWidth 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <TextField 
                    label="Description" 
                    variant="outlined" 
                    fullWidth 
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <Button variant="contained" component="label">
                    Upload Image
                    <input type="file" hidden onChange={handleImageChange} />
                </Button>
                <TextField 
                    label="Details" 
                    variant="outlined" 
                    multiline 
                    rows={4}
                    fullWidth 
                    value={newDetails} 
                    onChange={(e) => setNewDetails(e.target.value)}
                />
    
                {/* Live Preview */}
                <Box mt={3} borderColor="grey.400" border={1} p={2}sx={{
        overflowY: 'auto', // Add this line
        maxHeight: '50vh'  // Optional: to ensure it doesn't get too tall
    }}>
    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        Live Preview
    </Typography>
    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
        {newTitle}
    </Typography>
    <Box 
        component="img"
        src={livePreviewImageUrl} 
        alt="Live Preview Image" 
        sx={{ 
            width: '100%', 
            borderRadius: 1,  
            overflow: 'hidden',
            display: livePreviewImageUrl ? 'block' : 'none' // Hide if no image
        }}
    />
    <Typography variant="body1" component="div" sx={{ mt: 1 }}>
        {newDescription}
    </Typography>
    <Typography variant="body2" component="div" sx={{ mt: 1 }}>
        <span dangerouslySetInnerHTML={{ __html: newDetails.replace(/\n/g, '<br/>') }} />
    </Typography>
</Box>

    
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {editMode ? "Update" : "Add"}
                </Button>
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
                width: { xs: '90%', sm: '75%', md: '50%', lg: '40%' }, // Responsive width
                bgcolor: 'background.paper', 
                border: '2px solid #000',
                boxShadow: 24, 
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,  // Spacing between children
                overflowY: 'auto', // Add this line
                 // Add this line
                maxHeight: '90vh' ,
                height: 'auto',
           
            
            }}
        >
            <Typography variant="h3" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {modalInfo.currentNews?.title}
            </Typography>
            <Box 
                component="img"
                src={modalInfo.currentNews?.image} 
                alt={modalInfo.currentNews?.title} 
                sx={{ 
                    width: { xs: '110%', sm: '90%' }, // 100% width on xs screens, 90% on sm and above
                    height: { xs: '110%', sm: 'auto' },  // Adjust height if needed
                    borderRadius: 1,  
                   
                }}
            />
            <Typography variant="h5" sx={{ textAlign: 'center',fontWeight: 'bold' }}>
                {modalInfo.currentNews?.description}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                <span dangerouslySetInnerHTML={{ __html: modalInfo.currentNews?.details }} />
            </Typography>
            <Button variant="contained" color="primary" onClick={handleModalClose}>
                Close
            </Button>
        </Box>
    );
    
    
    const handleEdit = (news) => {
        handleModalOpen('edit', news);
        setEditMode(true);
    };
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
           image={news.image}
           description={news.description}
           openModal={() => setModalInfo({ isOpen: true, currentNews: news, modalType: 'view' })}
           onDelete={() => setDeleteModalInfo({ isOpen: true, postToDelete: news })}
           onEdit={() => handleEdit(news)}
           isAuthenticated={isAuthenticated}
       />
       
            ))}
        </div>
        <Modal open={modalInfo.isOpen} onClose={handleModalClose}>
            {modalInfo.modalType === 'add' || modalInfo.modalType === 'edit' ? AddOrEditNewsModalBody : ViewNewsModalBody}
        </Modal>
        <DeleteConfirmation 
            isOpen={deleteModalInfo.isOpen} 
            onCancel={() => setDeleteModalInfo({ isOpen: false, postToDelete: null })} 
            onConfirm={() => deletePost(deleteModalInfo.postToDelete)} 
        />
    </div>
    );
}

export default News;
