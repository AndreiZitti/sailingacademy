import React from "react";
import CardItem from "./CardItem";
import { useTranslation } from "react-i18next";

function Rent() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("For a quick stroll on the lake")}</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            <CardItem
              src="images/canoe.jpeg"
              text={t("Paddle your way around the lake! 50 lei/hour")}
              label="Kayak"
              buttonText={t("Book Now")}
              buttonLink="/rent"
            />
            <CardItem
              src="images/SUPstock.jpeg"
              text={t(
                "Stand up and explore! Perfect for beginners. 50 lei/hour"
              )}
              label="SUP"
              buttonText={t("Book Now")}
              buttonLink="/rent"
            />
            <CardItem
              src="images/profil3.jpg"
              text={t(
                "Feel the wind in your sails! For all skill levels. 50-100 lei/hour"
              )}
              label={t("Sailing Boats")}
              buttonText={t("Book Now")}
              buttonLink="/rent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rent;
