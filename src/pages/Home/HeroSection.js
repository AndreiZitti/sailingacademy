import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";

function HeroSection() {
  const { t } = useTranslation();
  return (
    <div className="hero-wrapper">
      <LanguageSwitcher />
      <div className="hero-container">
        <video
          src="/videos/HeroVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="images/placeholderBoat.png"
        />
        <div className="hero-text">
          <h1>{t("ADVENTURE AWAITS")}</h1>
          <p>{t("What are you waiting for?")}</p>
        </div>
        <div className="service-cards">
          <Link to="/rent" className="service-card">
            <h3>{t("Quick Rentals")}</h3>
            <p>
              {t("Kayak, SUP, and sailboats. Book a quick session!")}
            </p>
          </Link>
          <Link to="/registration" className="service-card">
            <h3>{t("Learn to Sail")}</h3>
            <p>
              {t("Courses and memberships for all ages and levels.")}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
