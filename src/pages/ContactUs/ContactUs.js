import React from 'react';
import Reviews from './Reviews.tsx';
import ProgrammCard from './ProgrammCard';
import './ContactUs.css';

function ContactUs() {
    return (
        <div className="contact-us">
            <h1>Contact Us</h1>
            <div className="contact-info">
                <p>Phone Number: +1 234 567 890</p>
                <p>Email: info@sailingacademy.com</p>
                <p>Address: 123 Ocean Drive, Miami, FL</p>
                <div className="social-links">
                    <a href="https://www.facebook.com/yourfacebookpage" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com/yourinstagramhandle" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
            <ProgrammCard />
            <Reviews />
        </div>
    );
}

export default ContactUs;
