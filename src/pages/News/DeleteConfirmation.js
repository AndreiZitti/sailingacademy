import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function DeleteConfirmation({ isOpen, onCancel, onConfirm }) {
    return (
        <Modal open={isOpen} onClose={onCancel}>
            <Box 
                sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 300, 
                    bgcolor: 'background.paper', 
                    border: '2px solid #000',
                    boxShadow: 24, 
                    p: 4, 
                    zIndex: 11,
                }}
            >
                <h4>Are you sure you want to delete this post?</h4>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </Box>
        </Modal>
    );
}

export default DeleteConfirmation;
