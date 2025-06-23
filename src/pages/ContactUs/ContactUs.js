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

        {/* Main Contact Info */}
        <div className="contact-container">
          <div className="contact-card">
            <h2>{t("Contact Information")}</h2>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <strong>{t("Phone")}</strong>
                <p>
                  <a href="tel:+40730333755">+40 730 333 755</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <strong>{t("Email")}</strong>
                <p>
                  <a href="mailto:contact@sailingacademy.ro">
                    contact@sailingacademy.ro
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>{t("Address")}</strong>
                <p>Herastrau, Șoseaua Nordului 7-9</p>
                <p>București 014101, Romania</p>
              </div>
            </div>
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
