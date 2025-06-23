import React from "react";
import ProgrammCard from "./ProgrammCard";
import Footer from "../Home/Footer";
import Map from "../Home/Map";
import "./ContactUs.css";
import "../../global.css";
import Reviews from "./Reviews";
import { useTranslation } from "react-i18next";

function ContactUs() {
  const { t } = useTranslation();

  const handleCallClick = () => {
    window.location.href = "tel:+40730333755";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:contact@sailingacademy.ro";
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>{t("Get in Touch")}</h1>
          <p>
            {t("Ready to start your sailing adventure? We're here to help!")}
          </p>
        </div>
      </div>

      <div className="contact-content">
        {/* Quick Contact Actions */}
        <div className="quick-contact">
          <button onClick={handleCallClick} className="quick-contact-btn call">
            📞 {t("Call Now")}
          </button>
          <button
            onClick={handleEmailClick}
            className="quick-contact-btn email"
          >
            ✉️ {t("Send Email")}
          </button>
        </div>

        {/* Opening Hours & Social */}
        <div className="contact-container">
          <div className="contact-card">
            <h2>{t("Stay Connected")}</h2>
            <p className="contact-intro">
              {t(
                "Follow us for sailing tips, updates, and beautiful water adventures!"
              )}
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/sailingacademy.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn facebook"
              >
                📘 Facebook
              </a>
              <a
                href="https://www.instagram.com/sailing_academy_ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram"
              >
                📷 Instagram
              </a>
            </div>
          </div>
          <ProgrammCard />
        </div>

        {/* Map Section */}
        <div className="contact-map-section">
          <h2>{t("Find Us on the Map")}</h2>
          <Map />
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>{t("What Our Customers Say")}</h2>
          <Reviews />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
