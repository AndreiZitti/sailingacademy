import React from "react";
import RentCards from "../RentCards";
import CoursesCards from "../CoursesCards";
import MembershipCard from "../MembershipCard";
import Map from "../../../components/Map";
import { useTranslation } from "react-i18next";
import "./HomeCards.css";
import "../Cards.css";

function HomeCards() {
  const { t } = useTranslation();

  return (
    <div className="home-cards">
      <section id="Rent" className="section-spacing">
        <RentCards />
      </section>

      <section id="Courses" className="section-spacing">
        <CoursesCards />
      </section>

      <section
        id="Membership"
        className="section-spacing"
        style={{ display: "none" }}
      >
        <MembershipCard />
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
