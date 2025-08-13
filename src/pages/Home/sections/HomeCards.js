import React from "react";
import CardItem from "../../../components/Cards/CardItem";
import Map from "../../../components/Map";
import { useTranslation } from "react-i18next";
import "./HomeCards.css";
import "../Cards.css";

function HomeCards() {
  const { t } = useTranslation();

  return (
    <div className="home-cards">
      <section id="Categories" className="section-spacing">
        <div className="cards__container">
          <div className="cards__wrapper">
            <div className="cards__items">
              <CardItem
                src="images/canoe.jpeg"
                label={t("Quick Rentals")}
                text={t("Kayak, SUP, and sailboats. Book a quick session!")}
                buttonText={t("Explore Services")}
                buttonLink="/rent"
              />
              <CardItem
                src="images/ClubPhoto.jpg"
                label={t("Learn to Sail")}
                text={t("Courses and memberships for all ages and levels.")}
                buttonText={t("View Courses")}
                buttonLink="/registration"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="Map" className="map-full-section">
        <div className="map-title-container">
          <h1 className="map-title">{t("Come visit us !")}</h1>
        </div>
        <Map fullWidth={false} showContactPanel={true} />
      </section>
    </div>
  );
}

export default HomeCards;
