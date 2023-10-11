import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function AddOrEditNews({ editMode, newTitle, setNewTitle, newDescription, setNewDescription, newImage, setNewImage, newDetails, setNewDetails, handleSubmit }) {
    return (
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
                gap: 2 
            }}
        >
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {editMode ? "Edit News" : "Add News"}
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* ...Rest of the form inputs... */}
            </form>
        </Box>
    );
}

export default AddOrEditNews;
