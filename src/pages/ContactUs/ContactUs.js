import React from 'react';
import ProgrammCard from './ProgrammCard';
import Footer from '../Home/Footer';
import './ContactUs.css';
import '../../global.css';
import Reviews from './Reviews'

function ContactUs() {
    return (
        <div className="contact-page">
            <div className="contact-content">
                <div className="contact-container">
                    <div className="contact-card">
                        <h2>Contact Information</h2>
                        <p>Phone Number: <a href="tel:+40730333755">+40 730 333 755 </a></p>
                        <p>Email: <a href="mailto:contact@sailingacademy.ro">contact@sailingacademy.ro</a></p>
                        <p>Address: Sos. Nordului 7-9, Herastrau, Bucuresti</p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/sailingacademy.ro/" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://www.instagram.com/sailing_academy_ro/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    </div>
                    <ProgrammCard />
                </div>
                <Reviews />
            </div>
            <Footer />
        </div>
    );
}

export default ContactUs;
