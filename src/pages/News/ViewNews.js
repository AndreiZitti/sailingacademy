import React from 'react';
import { Box } from '@mui/material';

function ViewNews({ news, handleModalClose }) {
    return (
        <Box 
            sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: '90%',
                height: '90%',
                overflowY: 'auto',
                bgcolor: 'background.paper', 
                border: '2px solid #000',
                boxShadow: 24, 
                p: 4 
            }}
        >
            <h2 style={{ fontSize: '2em', fontWeight: 'bold' }}>{news?.title}</h2>
            <img src={news?.image} alt={news?.title} style={{width: '100%'}} />
            <p style={{ fontSize: '1.2em' }}>{news?.description}</p>
            <p style={{ fontSize: '1.2em' }} dangerouslySetInnerHTML={{ __html: news?.details }}></p>
            <button onClick={handleModalClose}>Close</button>
        </Box>
    );
}

export default ViewNews;
