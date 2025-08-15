import React from "react";
import CardItem from "../../../components/Cards/CardItem";
import ContactSection from "../../../components/ContactSection";
import { useTranslation } from "react-i18next";
import "./HomeCards.css";
import "../Cards.css";

function HomeCards() {
  const { t } = useTranslation();

  return (
    <div className="page-content">
      <div className="home-cards">
        {/* Primary actions moved into the hero section; keep scroll reveal minimal below */}

        <div id="Map" className="map-full-section">
          <div className="map-title-container">
            <h1 className="map-title">{t("Come visit us !")}</h1>
          </div>
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

export default HomeCards;
