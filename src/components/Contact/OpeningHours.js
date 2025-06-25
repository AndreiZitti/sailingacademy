import React from "react";
import "./OpeningHours.css";
import { useTranslation } from "react-i18next";

function OpeningHours() {
  const { t } = useTranslation();

  return (
    <div className="opening-hours">
      <h3>{t("Opening Hours")}</h3>
      <div className="hours-list">
        <div className="hour-item">
          <span className="day">{t("Monday")}</span>
          <span className="time closed">{t("Closed")}</span>
        </div>
        <div className="hour-item">
          <span className="day">{t("Tuesday")}</span>
          <span className="time">9:00 - 20:00</span>
        </div>
        <div className="hour-item">
          <span className="day">{t("Wednesday")}</span>
          <span className="time">9:00 - 20:00</span>
        </div>
        <div className="hour-item">
          <span className="day">{t("Thursday")}</span>
          <span className="time">9:00 - 20:00</span>
        </div>
        <div className="hour-item">
          <span className="day">{t("Friday")}</span>
          <span className="time">9:00 - 20:00</span>
        </div>
        <div className="hour-item">
          <span className="day">{t("Saturday")}</span>
          <span className="time">9:00 - 20:00</span>
        </div>
        <div className="hour-item">
          <span className="day">{t("Sunday")}</span>
          <span className="time">9:00 - 20:00</span>
        </div>
      </div>
    </div>
  );
}

export default OpeningHours;
