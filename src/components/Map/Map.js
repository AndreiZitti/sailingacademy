import React from "react";
import { useTranslation } from "react-i18next";
import "./Map.css";

function Map({ fullWidth = false, showContactPanel = true, className = "" }) {
  const { t } = useTranslation();

  const handleDirectionsClick = () => {
    const address = "F3JM+W5 Bucharest";
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      "_blank"
    );
  };

  const handleCallClick = () => {
    window.location.href = "tel:+40730333755";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:contact@sailingacademy.ro";
  };

  return (
    <div
      className={`map-section ${fullWidth ? "full-width" : ""} ${className}`}
    >
      <div className="map-container">
        <div
          className={`map-content ${
            showContactPanel ? "with-panel" : "no-panel"
          }`}
        >
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11390.776778268777!2d26.0834405!3d44.4825637!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201f24158a8c9%3A0x12345678!2sF3JM%2BW5%20Bucharest%2C%20Romania!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sailing Academy - Herastrau, Șoseaua Nordului 7-9, București 014101"
            ></iframe>
          </div>

          {showContactPanel && (
            <div className="contact-info-panel">
              <div className="contact-header">
                <h3>{t("Visit Us")}</h3>
                <p>{t("Come sail with us at Lake Herastrau!")}</p>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div className="contact-text">
                    <strong>{t("Address")}</strong>
                    <p>Herastrau, Șoseaua Nordului 7-9</p>
                    <p>București 014101, Romania</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div className="contact-text">
                    <strong>{t("Phone")}</strong>
                    <p>+40 730 333 755</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div className="contact-text">
                    <strong>{t("Email")}</strong>
                    <p>contact@sailingacademy.ro</p>
                  </div>
                </div>
              </div>

              <div className="contact-actions">
                <button
                  onClick={handleCallClick}
                  className="contact-btn call-btn"
                >
                  📞 {t("Call Now")}
                </button>
                <button
                  onClick={handleEmailClick}
                  className="contact-btn email-btn"
                >
                  ✉️ {t("Send Email")}
                </button>
                <button
                  onClick={handleDirectionsClick}
                  className="contact-btn directions-btn"
                >
                  🗺️ {t("Get Directions")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
