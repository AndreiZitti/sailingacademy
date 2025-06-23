import React from "react";
import "./ProgrammCard.css";
import { useTranslation } from "react-i18next";

function ProgrammCard() {
  const { t } = useTranslation();

  return (
    <div className="programm-card">
      <h2>{t("Opening Hours")}</h2>
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

export default ProgrammCard;
