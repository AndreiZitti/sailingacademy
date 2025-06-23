import React from "react";
import { useTranslation } from "react-i18next";
import "./Rent.css";

function Rent() {
  const { t } = useTranslation();

  return (
    <div className="rent-page">
      <div className="rent-container">
        <div className="coming-soon-content">
          <h1>{t("Equipment Rental")}</h1>
          <div className="coming-soon-icon">🚧</div>
          <h2>{t("Coming Soon!")}</h2>
          <p>
            {t(
              "We are working on an amazing booking system for our equipment rental services."
            )}
          </p>

          <div className="equipment-preview">
            <h3>{t("What you will be able to rent:")}</h3>
            <div className="equipment-grid">
              <div className="equipment-item">
                <span className="equipment-emoji">🛶</span>
                <h4>{t("Kayaks")}</h4>
                <p>{t("50 lei/hour")}</p>
              </div>
              <div className="equipment-item">
                <span className="equipment-emoji">🏄‍♂️</span>
                <h4>{t("Stand Up Paddles")}</h4>
                <p>{t("50 lei/hour")}</p>
              </div>
              <div className="equipment-item">
                <span className="equipment-emoji">⛵</span>
                <h4>{t("Sailing Boats")}</h4>
                <p>{t("50-100 lei/hour")}</p>
              </div>
            </div>
          </div>

          <div className="contact-info">
            <p>
              {t("For now, please contact us directly to make a reservation:")}
            </p>
            <div className="contact-buttons">
              <a href="tel:+40730333755" className="contact-btn phone-btn">
                📞 +40 730 333 755
              </a>
              <a
                href="mailto:contact@sailingacademy.ro"
                className="contact-btn email-btn"
              >
                ✉️ contact@sailingacademy.ro
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rent;
