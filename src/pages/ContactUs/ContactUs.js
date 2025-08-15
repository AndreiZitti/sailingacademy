import React from "react";
import Footer from "../../components/Footer";
import ContactSection from "../../components/ContactSection";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import "./ContactUs.css";
import "../../global.css";
import Reviews from "../../components/Contact/Reviews";
import { useTranslation } from "react-i18next";

function ContactUs() {
  const { t } = useTranslation();

  return (
    <div className="page-background">
      <LanguageSwitcher />
      <div className="page-content">
        <div className="contact-page">
          {/* Video Background */}
          <video
            className="background-video"
            src="/videos/HeroVideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/pierPreview.jpeg"
          />

          {/* Hero Section */}
          <header className="contact-hero" role="banner">
            <div className="contact-hero-content">
              <h1>{t("Find Your Adventure")}</h1>
              <p>
                {t(
                  "We're the only pier on Lake Herăstrău - you can't miss us!"
                )}
              </p>
            </div>
          </header>

          <main className="contact-content" role="main">
            {/* Map Section */}
            <section
              className="map-section-wrapper"
              aria-label="Location and contact information"
            >
              <ContactSection />
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
      </div>
    </div>
  );
}

export default ContactUs;
