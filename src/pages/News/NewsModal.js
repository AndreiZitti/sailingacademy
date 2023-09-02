import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function NewsModal({ isOpen, closeModal, news }) {
  // If there's no news provided, just return null to avoid errors
  if (!news) return null;

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '[95%,80%]', 
          height: '[95%,80%]',
          overflow: 'auto',
          bgcolor: 'background.paper', 
          border: '2px solid #000',
          boxShadow: 24, 
          p: 4 
        }}
      >
        <h2>{news.title}</h2>
        {news.image && <img src={news.image} alt={news.title} style={{ maxWidth: '100%' }} />}
        <p>{news.description}</p>
        <p>{news.details}</p>
        <div style={{ marginTop: '20px' }}>
            <button onClick={closeModal}>Close</button>
        </div>
      </Box>
    </Modal>
  );
}

export default NewsModal;
