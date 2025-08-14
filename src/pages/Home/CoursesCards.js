import React from "react";
import CardItem from "../../components/Cards/CardItem";
import { useTranslation } from "react-i18next";
import "./Cards.css";

function Courses() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("For the more interested ones")}</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            <CardItem
              src="/images/profil2.jpg"
              text={t("Learn to sail! Courses for all ages and skill levels.")}
              label={t("Sailing Courses")}
              buttonText={t("Register Now")}
              buttonLink="/registration"
            />
            <CardItem
              src="/images/bigBoat.jpg"
              text={t(
                "Get your boat license! Categories A, B, C, D, S available."
              )}
              label={t("Skipper License")}
              buttonText={t("Register Now")}
              buttonLink="/registration"
            />
            <CardItem
              src="/images/ClubPhoto.jpg"
              text={t(
                "Join our sailing community! From 1200 lei/year with great perks."
              )}
              label={t("Club Membership")}
              buttonText={t("Learn More")}
              buttonLink="#Membership"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
