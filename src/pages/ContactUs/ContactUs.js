import React from 'react';
import Reviews from './Reviews';
import ProgrammCard from './ProgrammCard';
import './ContactUs.css';
import '../../global.css';


function ContactUs() {
    return (
        <div className='body'>
            <div className="contact-us">
                <h1>Contact Us</h1>
                <div className="contact-container">
                    <div className="contact-info"> 
                        <p>Phone Number: <a href="tel:+40730333755">+40 730 333 755 </a></p>
                        <p>Email: contact@sailingacademy.ro</p>
                        <p>Address: Sos. Nordului 7-9, Herastrau, Bucuresti
</p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/sailingacademy.ro/" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://www.instagram.com/sailing_academy_ro/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    </div>
                    <ProgrammCard />
                </div>

                {/* <div className='reviewsCarousel'>
                    <Reviews />
                </div> */}
            </div>
        </div>
    );
}


export default ContactUs;
