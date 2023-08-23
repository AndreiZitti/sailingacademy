import React, { Component } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // add this line to avoid the console warning

class NewsModal extends Component {
    render() {
        const { isOpen, closeModal, title, image, description, details } = this.props;
        console.log(isOpen);
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                contentLabel="News Details"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60%',
                        height: '70%',
                    },
                }}
            >
                <h2>{title}</h2>
                {image && <img src={image} alt={title} />}
                <p>{description}</p>
                <p>{details}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        );
    }
}

export default NewsModal;
