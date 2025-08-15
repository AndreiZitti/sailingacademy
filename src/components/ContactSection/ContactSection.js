import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ContactSection.css";

function ContactSection() {
  const { t } = useTranslation();
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
  const [weather, setWeather] = useState({
    temp: 24,
    condition: "Clear",
    wind: 5,
    waveHeight: "Calm",
  });
  const [currentStatus, setCurrentStatus] = useState({
    isOpen: false,
    nextChange: "",
    currentDay: "",
  });

  // Opening hours data
  const openingHours = {
    monday: { isOpen: false, hours: null },
    tuesday: { isOpen: true, hours: { open: "09:00", close: "20:00" } },
    wednesday: { isOpen: true, hours: { open: "09:00", close: "20:00" } },
    thursday: { isOpen: true, hours: { open: "09:00", close: "20:00" } },
    friday: { isOpen: true, hours: { open: "09:00", close: "20:00" } },
    saturday: { isOpen: true, hours: { open: "09:00", close: "20:00" } },
    sunday: { isOpen: true, hours: { open: "09:00", close: "20:00" } },
  };

  const getDayName = (dayIndex) => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[dayIndex];
  };

  const getTranslatedDayName = (dayKey) => {
    const dayTranslations = {
      monday: t("Monday"),
      tuesday: t("Tuesday"),
      wednesday: t("Wednesday"),
      thursday: t("Thursday"),
      friday: t("Friday"),
      saturday: t("Saturday"),
      sunday: t("Sunday"),
    };
    return dayTranslations[dayKey] || dayKey;
  };

  const calculateCurrentStatus = () => {
    const now = new Date();
    const currentDay = getDayName(now.getDay());
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const todayHours = openingHours[currentDay];
    let isOpen = false;
    let nextChange = "";

    if (todayHours.isOpen && todayHours.hours) {
      const [openHour, openMin] = todayHours.hours.open.split(":").map(Number);
      const [closeHour, closeMin] = todayHours.hours.close
        .split(":")
        .map(Number);
      const openTime = openHour * 60 + openMin;
      const closeTime = closeHour * 60 + closeMin;

      isOpen = currentTime >= openTime && currentTime < closeTime;

      if (isOpen) {
        nextChange = `${t("Until")} ${todayHours.hours.close}`;
      } else if (currentTime < openTime) {
        nextChange = `${t("Opens at")} ${todayHours.hours.open}`;
      } else {
        // Find next opening day
        let nextDay = (now.getDay() + 1) % 7;
        let daysChecked = 0;
        while (daysChecked < 7) {
          const nextDayName = getDayName(nextDay);
          const nextDayHours = openingHours[nextDayName];
          if (nextDayHours.isOpen) {
            const translatedDay = getTranslatedDayName(nextDayName);
            nextChange = `${t("Opens")} ${translatedDay} ${t("at")} ${
              nextDayHours.hours.open
            }`;
            break;
          }
          nextDay = (nextDay + 1) % 7;
          daysChecked++;
        }
      }
    } else {
      // Find next opening day
      let nextDay = (now.getDay() + 1) % 7;
      let daysChecked = 0;
      while (daysChecked < 7) {
        const nextDayName = getDayName(nextDay);
        const nextDayHours = openingHours[nextDayName];
        if (nextDayHours.isOpen) {
          const translatedDay = getTranslatedDayName(nextDayName);
          nextChange = `${t("Opens")} ${translatedDay} ${t("at")} ${
            nextDayHours.hours.open
          }`;
          break;
        }
        nextDay = (nextDay + 1) % 7;
        daysChecked++;
      }
    }

    setCurrentStatus({
      isOpen,
      nextChange,
      currentDay: getTranslatedDayName(currentDay),
    });
  };

  // Weather fetching (mock data for now, can be connected to real API)
  useEffect(() => {
    calculateCurrentStatus();
    const interval = setInterval(calculateCurrentStatus, 60000);

    // Mock weather update - replace with real API call if needed
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.4826&lon=26.0834&appid=YOUR_API_KEY`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setWeather({
    //       temp: Math.round(data.main.temp - 273.15),
    //       condition: data.weather[0].main,
    //       wind: Math.round(data.wind.speed * 3.6),
    //       waveHeight: data.wind.speed < 5 ? 'Calm' : 'Moderate'
    //     });
    //   });

    return () => clearInterval(interval);
  }, [t]);

  const handleDirectionsClick = () => {
    const address = "Șoseaua Nordului 7-9, București";
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      "_blank"
    );
  };

  const handleCallClick = () => {
    window.location.href = "tel:+40730333755";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/40730333755", "_blank");
  };

  const toggleHours = () => {
    setIsHoursExpanded(!isHoursExpanded);
  };

  return (
    <section className="contact-section">
      {/* 2-Box Grid Layout */}
      <div className="contact-grid-redesign">
        {/* LEFT BOX: Find Us - Location Hub */}
        <div className="location-hub">
          <div className="box-header">
            <h3>📍 {t("Find Us")}</h3>
          </div>

          {/* Map Section (60% of box height) */}
          <div className="map-section">
            <div className="map-embed-compact">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11390.776778268777!2d26.0834405!3d44.4825637!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201f24158a8c9%3A0x12345678!2sF3JM%2BW5%20Bucharest%2C%20Romania!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sailing Academy Location"
              />
            </div>
            {/* Pier Photo Overlay */}
            <div
              className="pier-photo-overlay"
              title={t("Only pier on the lake!")}
            >
              <img src="/images/entrance.jpg" alt={t("Our pier")} />
            </div>
          </div>

          {/* Info Footer (40% of box) */}
          <div className="location-info">
            <div className="address">Șoseaua Nordului 7-9</div>
            <div className="benefits">✓ {t("Free Parking")}</div>
            <div className="transport">
              {t("Bus")}: 131, 335 • {t("10min from Metro")}
            </div>
            <button className="directions-btn" onClick={handleDirectionsClick}>
              {t("Get Directions")} →
            </button>
          </div>
        </div>

        {/* RIGHT BOX: Visit Info - Status Dashboard */}
        <div className="status-dashboard">
          <div className="box-header">
            <h3>{t("Plan Your Visit")}</h3>
          </div>

          {/* Status Section (top 50%) */}
          <div className="status-section">
            <div className="status-main">
              <div
                className={`status-indicator ${
                  currentStatus.isOpen ? "open" : "closed"
                }`}
              >
                {currentStatus.isOpen
                  ? "🟢 " + t("OPEN NOW")
                  : "🔴 " + t("CLOSED")}
              </div>
              <div className="status-time">{currentStatus.nextChange}</div>
            </div>
            <button className="view-week-btn" onClick={toggleHours}>
              {t("View week")} {isHoursExpanded ? "↑" : "↓"}
            </button>
            {isHoursExpanded && (
              <div className="week-schedule">
                {Object.entries(openingHours).map(([day, hours]) => (
                  <div
                    key={day}
                    className={`schedule-day ${
                      day === getDayName(new Date().getDay()) ? "today" : ""
                    }`}
                  >
                    <span className="day">{getTranslatedDayName(day)}</span>
                    <span className="time">
                      {hours.isOpen
                        ? `${hours.hours.open} - ${hours.hours.close}`
                        : t("Closed")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conditions Section (bottom 50%) */}
          <div className="conditions-section">
            <div className="weather-compact">
              <div className="weather-line">
                ☀️ {weather.temp}°C | {t("Perfect conditions")}
              </div>
              <div className="weather-details">
                💨 {t("Wind")}: {weather.wind}km/h | 🌊 {t(weather.waveHeight)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: Connection - Unified Action Strip */}
      <div className="connection-bar">
        <div className="contact-actions">
          <a href="tel:+40730333755" className="action-btn">
            📞 {t("Call")}
          </a>
          <a
            href="#"
            className="action-btn whatsapp"
            onClick={handleWhatsAppClick}
          >
            💬 WhatsApp
          </a>
          <a href="mailto:info@sailingacademy.ro" className="action-btn">
            ✉️ {t("Email")}
          </a>
        </div>

        <div className="social-follow">
          <span className="follow-text">{t("Follow")}:</span>
          <div className="social-links">
            <a
              href="https://www.facebook.com/sailingacademy.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              FB
            </a>
            <a
              href="https://www.instagram.com/sailing_academy_ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              IG
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
