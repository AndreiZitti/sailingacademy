import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Map.css";

function Map({ fullWidth = false, showContactPanel = true, className = "" }) {
  const { t } = useTranslation();
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
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
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

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
        nextChange = `${t("Closes at")} ${todayHours.hours.close}`;
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

  useEffect(() => {
    calculateCurrentStatus();
    // Update every minute
    const interval = setInterval(calculateCurrentStatus, 60000);
    return () => clearInterval(interval);
  }, [t]);

  const handleDirectionsClick = () => {
    const address = "F3JM+W5 Bucharest";
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      "_blank"
    );
  };

  const handleCallClick = () => {
    window.location.href = "tel:+40730333755";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:contact@sailingacademy.ro";
  };

  // Social Media Icons Components
  const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );

  return (
    <div
      className={`map-section ${fullWidth ? "full-width" : ""} ${className}`}
    >
      <div className="map-container">
        <div
          className={`map-content ${
            showContactPanel ? "with-panel" : "no-panel"
          }`}
        >
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11390.776778268777!2d26.0834405!3d44.4825637!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201f24158a8c9%3A0x12345678!2sF3JM%2BW5%20Bucharest%2C%20Romania!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sailing Academy - Herastrau, Șoseaua Nordului 7-9, București 014101"
            ></iframe>
          </div>

          {showContactPanel && (
            <div className="contact-info-panel">
              <div className="contact-header">
                <h3>{t("Visit Us")}</h3>
                <p>{t("Come sail with us at Lake Herastrau!")}</p>
              </div>

              <div className="contact-details">
                <div
                  className="contact-item clickable"
                  onClick={handleDirectionsClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleDirectionsClick();
                    }
                  }}
                  aria-label={t("Get directions to our location")}
                >
                  <span className="contact-icon">📍</span>
                  <div className="contact-text">
                    <strong>{t("Address")}</strong>
                    <p>Herastrau, Șoseaua Nordului 7-9</p>
                    <p>București 014101, Romania</p>
                  </div>
                  <span className="click-indicator">🗺️</span>
                </div>

                <div
                  className="contact-item clickable"
                  onClick={handleCallClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCallClick();
                    }
                  }}
                  aria-label={t("Call us at +40730333755")}
                >
                  <span className="contact-icon">📞</span>
                  <div className="contact-text">
                    <strong>{t("Phone")}</strong>
                    <p>+40 730 333 755</p>
                  </div>
                  <span className="click-indicator">📞</span>
                </div>

                <div
                  className="contact-item clickable"
                  onClick={handleEmailClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleEmailClick();
                    }
                  }}
                  aria-label={t("Send email to contact@sailingacademy.ro")}
                >
                  <span className="contact-icon">✉️</span>
                  <div className="contact-text">
                    <strong>{t("Email")}</strong>
                    <p>contact@sailingacademy.ro</p>
                  </div>
                  <span className="click-indicator">✉️</span>
                </div>

                {/* Opening Hours Dropdown */}
                <div className="opening-hours-dropdown">
                  <div
                    className="hours-toggle"
                    onClick={() => setIsHoursExpanded(!isHoursExpanded)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsHoursExpanded(!isHoursExpanded);
                      }
                    }}
                    aria-label={t("Toggle opening hours")}
                  >
                    <span className="hours-icon">🕒</span>
                    <div className="hours-status">
                      <strong>{t("Opening Hours")}</strong>
                      <p
                        className={`status ${
                          currentStatus.isOpen ? "open" : "closed"
                        }`}
                      >
                        {currentStatus.isOpen ? (
                          <>
                            <span className="status-indicator open">🟢</span>
                            {t("Open now")}
                          </>
                        ) : (
                          <>
                            <span className="status-indicator closed">🔴</span>
                            {t("Closed")}
                          </>
                        )}
                      </p>
                      {currentStatus.nextChange && (
                        <p className="next-change">
                          {currentStatus.nextChange}
                        </p>
                      )}
                    </div>
                    <span
                      className={`dropdown-arrow ${
                        isHoursExpanded ? "expanded" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>

                  {isHoursExpanded && (
                    <div className="hours-details">
                      {Object.entries(openingHours).map(([day, hours]) => (
                        <div
                          key={day}
                          className={`hour-item ${
                            day === getDayName(new Date().getDay())
                              ? "today"
                              : ""
                          }`}
                        >
                          <span className="day-name">
                            {getTranslatedDayName(day)}
                          </span>
                          <span
                            className={`time ${!hours.isOpen ? "closed" : ""}`}
                          >
                            {hours.isOpen
                              ? `${hours.hours.open} - ${hours.hours.close}`
                              : t("Closed")}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="social-follow">
                <span className="follow-text">{t("Follow us:")}</span>
                <div className="social-links" role="list">
                  <a
                    href="https://www.facebook.com/sailingacademy.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn facebook"
                    aria-label={t("Follow us on Facebook")}
                    role="listitem"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://www.instagram.com/sailing_academy_ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn instagram"
                    aria-label={t("Follow us on Instagram")}
                    role="listitem"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
