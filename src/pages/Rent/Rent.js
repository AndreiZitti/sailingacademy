import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { animate, stagger } from "animejs";
import "./Rent.css";

function Rent() {
  const { t } = useTranslation();

  useEffect(() => {
    // Page entrance animations
    animate({
      targets: ".services-header h1",
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutBack",
    });

    animate({
      targets: ".services-header p",
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 300,
      easing: "easeOutExpo",
    });

    // Service categories staggered entrance
    animate({
      targets: ".service-category",
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(400, { start: 600 }),
      easing: "easeOutExpo",
    });

    // Service cards animation with intersection observer
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate({
            targets: entry.target.querySelectorAll(".service-card"),
            scale: [0.8, 1],
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: stagger(150),
            easing: "easeOutElastic(1, .8)",
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll(".service-category").forEach((el) => {
      observer.observe(el);
    });

    // Floating effect for service cards
    animate({
      targets: ".service-card",
      translateY: [-3, 3, -3],
      duration: 3000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
      delay: stagger(500),
    });

    // CTA button pulse
    animate({
      targets: ".cta-btn.primary",
      scale: [1, 1.02, 1],
      duration: 2000,
      loop: true,
      easing: "easeInOutSine",
    });

    // Enhanced hover animations
    const setupHoverAnimations = () => {
      document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          animate({
            targets: card,
            scale: 1.05,
            translateY: -8,
            boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
            duration: 300,
            easing: "easeOutBack",
          });
        });

        card.addEventListener("mouseleave", () => {
          animate({
            targets: card,
            scale: 1,
            translateY: 0,
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            duration: 300,
            easing: "easeOutQuad",
          });
        });
      });
    };

    // Delay hover setup to ensure elements are rendered
    setTimeout(setupHoverAnimations, 1000);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="services-page">
      {/* Background video */}
      <video autoPlay muted loop className="bg-video">
        <source src="/sailing-video.mp4" type="video/mp4" />
      </video>

      <div className="services-overlay"></div>

      <div className="services-container">
        <div className="services-header">
          <h1>{t("Our Services")}</h1>
          <p>{t("Choose your adventure on Lake Herastrau")}</p>
        </div>

        <div className="services-sections">
          {/* Quick Rentals Section */}
          <div className="service-category rentals-category">
            <div className="category-header">
              <div className="category-icon">🏖️</div>
              <h2>{t("Quick Rentals")}</h2>
              <p>{t("Ready to go? Visit us or call to rent equipment")}</p>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-emoji">🛶</div>
                <h3>{t("Kayaks")}</h3>
                <p className="price">50 lei/hour</p>
                <p className="description">
                  {t("Perfect for lake exploration")}
                </p>
                <div className="service-features">
                  <span className="feature">
                    • {t("All equipment included")}
                  </span>
                  <span className="feature">
                    • {t("Safety briefing provided")}
                  </span>
                </div>
              </div>

              <div className="service-card">
                <div className="service-emoji">🏄‍♂️</div>
                <h3>{t("Stand Up Paddle")}</h3>
                <p className="price">50 lei/hour</p>
                <p className="description">
                  {t("Great for beginners and fitness")}
                </p>
                <div className="service-features">
                  <span className="feature">• {t("Beginner friendly")}</span>
                  <span className="feature">• {t("Full body workout")}</span>
                </div>
              </div>

              <div className="service-card">
                <div className="service-emoji">⛵</div>
                <h3>{t("Sailing Boats")}</h3>
                <p className="price">50-100 lei/hour</p>
                <p className="description">
                  {t("Feel the wind in your sails")}
                </p>
                <div className="service-features">
                  <span className="feature">• {t("Various boat sizes")}</span>
                  <span className="feature">• {t("All skill levels")}</span>
                </div>
              </div>
            </div>

            <div className="booking-cta">
              <h4>{t("Ready to rent?")}</h4>
              <div className="booking-options">
                <a href="tel:+40730333755" className="cta-btn primary">
                  📞 {t("Call Now")}
                </a>
                <div className="or-divider">{t("or")}</div>
                <div className="visit-info">
                  <span className="location-icon">📍</span>
                  {t("Visit us at Lake Herastrau")}
                </div>
              </div>
            </div>
          </div>

          {/* Learning Section */}
          <div className="service-category learning-category">
            <div className="category-header">
              <div className="category-icon">🎓</div>
              <h2>{t("Learn to Sail")}</h2>
              <p>{t("Professional courses and private lessons")}</p>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-emoji">👨‍🏫</div>
                <h3>{t("Private Lessons")}</h3>
                <p className="price">50-100 lei/hour</p>
                <p className="description">
                  {t("One-on-one personalized instruction")}
                </p>
                <div className="service-features">
                  <span className="feature">
                    • {t("Certified instructors")}
                  </span>
                  <span className="feature">• {t("Flexible scheduling")}</span>
                </div>
              </div>

              <div className="service-card">
                <div className="service-emoji">👥</div>
                <h3>{t("Group Courses")}</h3>
                <p className="price">{t("Contact for pricing")}</p>
                <p className="description">
                  {t("Learn with others, make friends")}
                </p>
                <div className="service-features">
                  <span className="feature">
                    • {t("Small groups (4-6 people)")}
                  </span>
                  <span className="feature">
                    • {t("Structured curriculum")}
                  </span>
                </div>
              </div>

              <div className="service-card">
                <div className="service-emoji">🏆</div>
                <h3>{t("Skipper License")}</h3>
                <p className="price">{t("Full certification program")}</p>
                <p className="description">{t("Get officially certified")}</p>
                <div className="service-features">
                  <span className="feature">
                    • {t("Categories A, B, C, D, S")}
                  </span>
                  <span className="feature">• {t("Theory & practical")}</span>
                </div>
              </div>
            </div>

            <div className="booking-cta">
              <h4>{t("Interested in lessons?")}</h4>
              <p className="cta-description">
                {t(
                  "Send us an email with your questions and preferred schedule"
                )}
              </p>
              <a
                href="mailto:contact@sailingacademy.ro"
                className="cta-btn secondary"
              >
                ✉️ {t("Email Us for Details")}
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="additional-info">
          <div className="info-card">
            <h3>💡 {t("Good to Know")}</h3>
            <ul>
              <li>{t("All equipment provided")}</li>
              <li>{t("Safety briefing included")}</li>
              <li>{t("Weather dependent activities")}</li>
              <li>{t("Advance booking recommended")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rent;
