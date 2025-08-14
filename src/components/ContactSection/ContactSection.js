import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ContactSection.css";

function ContactSection() {
  const { t } = useTranslation();
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
  const [weather, setWeather] = useState({
    temp: 24,
    condition: 'Clear',
    wind: 5,
    waveHeight: 'Calm'
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
      const [closeHour, closeMin] = todayHours.hours.close.split(":").map(Number);
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
            nextChange = `${t("Opens")} ${translatedDay} ${t("at")} ${nextDayHours.hours.open}`;
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
          nextChange = `${t("Opens")} ${translatedDay} ${t("at")} ${nextDayHours.hours.open}`;
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
      {/* Header */}
      <div className="section-header">
        <h2>{t("Find Your Adventure")}</h2>
        <p>{t("We're the only pier on Lake Herăstrău - you can't miss us!")}</p>
      </div>

      {/* Three Column Grid */}
      <div className="contact-grid">
        
        {/* Column 1: Compact Map */}
        <div className="map-card">
          <h3>📍 {t("Location")}</h3>
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11390.776778268777!2d26.0834405!3d44.4825637!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201f24158a8c9%3A0x12345678!2sF3JM%2BW5%20Bucharest%2C%20Romania!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sailing Academy - Herastrau, Șoseaua Nordului 7-9, București 014101"
            />
            <button className="map-overlay-btn" onClick={handleDirectionsClick}>
              🗺️ {t("Get Directions")}
            </button>
          </div>
          <div className="map-footer">
            <p>Șoseaua Nordului 7-9</p>
            <p>{t("Free parking available")}</p>
          </div>
        </div>

        {/* Column 2: Landmark Photo */}
        <div className="landmark-card">
          <h3>🎯 {t("Find This Pier")}</h3>
          <div className="pier-photo">
            <img src="/images/entrance.jpg" alt={t("Our distinctive pier")} />
            <div className="photo-caption">
              {t("The only pier on the lake - your adventure starts here!")}
            </div>
          </div>
          <div className="getting-here">
            <p><strong>{t("By Car")}:</strong> {t("Free parking")}</p>
            <p><strong>{t("By Bus")}:</strong> {t("Lines 131, 335")}</p>
            <p><strong>{t("By Foot")}:</strong> {t("10min from Metro")}</p>
          </div>
        </div>

        {/* Column 3: Info Hub */}
        <div className="info-hub">
          {/* Weather Widget */}
          <div className="weather-widget">
            <h3>🌤️ {t("Lake Conditions")}</h3>
            <div className="weather-display">
              <div className="weather-main">
                <span className="temp">{weather.temp}°C</span>
                <span className="condition">{t("Perfect")}</span>
              </div>
              <div className="weather-details">
                <span>💨 {t("Wind")}: {weather.wind} km/h</span>
                <span>🌊 {t("Waves")}: {t(weather.waveHeight)}</span>
              </div>
            </div>
          </div>

          {/* Status & Hours */}
          <div className="status-card">
            <div className="open-status">
              <span className={`status-badge ${currentStatus.isOpen ? 'open' : 'closed'}`}>
                {currentStatus.isOpen ? '🟢 ' + t("OPEN NOW") : '🔴 ' + t("CLOSED")}
              </span>
              <span className="hours">{currentStatus.nextChange}</span>
            </div>
            <button className="hours-toggle" onClick={toggleHours}>
              {t("View all hours")} {isHoursExpanded ? '▲' : '▼'}
            </button>
            {isHoursExpanded && (
              <div className="hours-details">
                {Object.entries(openingHours).map(([day, hours]) => (
                  <div
                    key={day}
                    className={`hour-item ${
                      day === getDayName(new Date().getDay()) ? "today" : ""
                    }`}
                  >
                    <span className="day-name">
                      {getTranslatedDayName(day)}
                    </span>
                    <span className={`time ${!hours.isOpen ? "closed" : ""}`}>
                      {hours.isOpen
                        ? `${hours.hours.open} - ${hours.hours.close}`
                        : t("Closed")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Contact */}
          <div className="quick-contact">
            <a href="tel:+40730333755" className="contact-btn">
              📞 {t("Call Us")}
            </a>
            <a href="#" className="contact-btn whatsapp" onClick={handleWhatsAppClick}>
              💬 WhatsApp
            </a>
          </div>

          {/* Social */}
          <div className="social-compact">
            <span>{t("Follow")}:</span>
            <a href="https://www.facebook.com/sailingacademy.ro/" target="_blank" rel="noopener noreferrer">FB</a>
            <a href="https://www.instagram.com/sailing_academy_ro/" target="_blank" rel="noopener noreferrer">IG</a>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="info-bar">
        <span>✓ {t("No booking needed for rentals")}</span>
        <span>✓ {t("Equipment provided")}</span>
        <span>✓ {t("All ages welcome")}</span>
      </div>
    </section>
  );
}

export default ContactSection;