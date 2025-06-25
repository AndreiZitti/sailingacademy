import React from "react";
import Footer from "../../components/Footer";
import Map from "../../components/Map";
import "./ContactUs.css";
import "../../global.css";
import Reviews from "../../components/Contact/Reviews";
import { useTranslation } from "react-i18next";

function ContactUs() {
  const { t } = useTranslation();

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <header className="contact-hero" role="banner">
        <div className="contact-hero-content">
          <h1>{t("Get in Touch")}</h1>
          <p>
            {t("Ready to start your sailing adventure? We're here to help!")}
          </p>
        </div>
      </header>

      <main className="contact-content" role="main">
        {/* Map Section */}
        <section
          className="map-section-wrapper"
          aria-label="Location and contact information"
        >
          <Map />
        </section>

        {/* Reviews Section */}
        <section className="reviews-section" aria-label="Customer reviews">
          <div className="section-container">
            <header className="section-header">
              <h2>
                <span className="section-icon" aria-hidden="true">
                  ⭐
                </span>
                {t("What Our Customers Say")}
              </h2>
              <p className="section-description">
                {t(
                  "See what our sailing community has to say about their experience"
                )}
              </p>
            </header>
            <div className="reviews-content">
              <Reviews />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ContactUs;
