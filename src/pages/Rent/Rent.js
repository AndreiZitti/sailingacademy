import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import "./Rent.css";

function Rent() {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState(null);

  const services = [
    // Row 1: Top performers
    {
      id: 1,
      name: t("Kayaks"),
      price: "50 lei/hr",
      icon: "🛶",
      description: t("Perfect for beginners"),
      badges: ["rental"],
      family: "quick-rentals",
      bgImage: "/images/canoe.jpeg",
      action: t("Walk in or call"),
      gradientStrength: "light", // Darker photo - lighter gradients
    },
    {
      id: 2,
      name: t("Stand Up Paddles"),
      price: "50 lei/hr",
      icon: "🏄‍♂️",
      description: t("Great workout"),
      badges: ["rental"],
      family: "quick-rentals",
      bgImage: "/images/SUPstock.jpeg",
      action: t("Walk in or call"),
      gradientStrength: "strong", // Brighter photo - stronger gradients
    },
    {
      id: 3,
      name: t("Waterverse"),
      price: t("From 200 lei/hr"),
      icon: "🚤",
      description: t("Premium boats via app"),
      badges: ["partner", "rental"],
      family: "partner",
      bgImage: "/images/bigBoat.JPG",
      action: t("Download app"),
      gradientStrength: "medium",
    },
    // Row 2: Core offerings
    {
      id: 4,
      name: t("Sailing Boats"),
      price: "50-100 lei/hr",
      icon: "⛵",
      description: t("All skill levels"),
      badges: ["rental"],
      family: "sailing-core",
      bgImage: "/images/VantTare.jpg",
      action: t("Book now"),
      gradientStrength: "medium",
    },
    {
      id: 5,
      name: t("Sailing Lessons"),
      price: t("From 80 lei"),
      icon: "👨‍🏫",
      description: t("Professional instructors"),
      badges: ["lessons"],
      family: "sailing-core",
      bgImage: "/images/Curso1.webp",
      action: t("Contact us"),
      gradientStrength: "strong", // Brighter photo - stronger gradients
    },
    // Row 3: Specialized
    {
      id: 6,
      name: t("Sailing Permit"),
      price: t("Full program"),
      icon: "📜",
      description: t("Official certification"),
      badges: ["certification"],
      family: "programs",
      bgImage: "/images/Concurs.jpg",
      action: t("View schedule"),
      gradientStrength: "medium",
    },
    {
      id: 7,
      name: t("Corporate Events"),
      price: t("Custom pricing"),
      icon: "🏢",
      description: t("Team building"),
      badges: ["events"],
      family: "programs",
      bgImage: "/images/ClubPhoto.jpg",
      action: t("Get quote"),
      gradientStrength: "medium",
    },
  ];

  const faqs = [
    {
      question: t("Do I need experience?"),
      answer: t(
        "No experience needed! We provide instruction for beginners and have equipment suitable for all skill levels."
      ),
    },
    {
      question: t("What should I bring?"),
      answer: t(
        "Just bring comfortable clothes that can get wet, a towel, and sunscreen. We provide all equipment and safety gear."
      ),
    },
    {
      question: t("Can I book for groups?"),
      answer: t(
        "Yes! We offer special group rates and can accommodate parties, corporate events, and team building activities."
      ),
    },
    {
      question: t("What if weather is bad?"),
      answer: t(
        "Safety first! We'll reschedule or refund if conditions are unsafe. Light rain is usually fine for experienced sailors."
      ),
    },
    {
      question: t("Are there age restrictions?"),
      answer: t(
        "Children 8+ can participate with adult supervision. We have special programs for kids and family-friendly activities."
      ),
    },
    {
      question: t("Is equipment included?"),
      answer: t(
        "Yes! All boats, paddles, safety equipment, and life jackets are included in the rental price."
      ),
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="page-background">
      <LanguageSwitcher />
      <div className="page-content">
        <div className="services-page">
          {/* Video Background */}
          <video
            className="background-video"
            src="/videos/HeroVideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/pierPreview.jpeg"
          />

          {/* Hero Section */}
          <header className="services-hero" role="banner">
            <div className="services-hero-content">
              <h1>{t("Our Services")}</h1>
              <p>
                {t("Everything you need for your perfect day on the water")}
              </p>
            </div>
          </header>

          <main className="services-content" role="main">
            {/* Section 1: Services Grid */}
            <section className="services-section">
              <div className="container">
                {/* Section Divider: Instant Rentals */}
                <div className="section-divider">
                  <span>{t("Instant Rentals")}</span>
                </div>

                {/* Row 1: Top performers (3 cards) */}
                <div className="services-row services-row--top">
                  {services.slice(0, 3).map((service) => (
                    <div
                      key={service.id}
                      className={`service-card service-card--${service.family} service-card--${service.gradientStrength}`}
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    >
                      <div className="card-background-overlay"></div>
                      <div className="card-content">
                        <div className="service-badges">
                          {service.badges.map((badge, index) => (
                            <span
                              key={index}
                              className={`service-badge service-badge--${badge}`}
                            >
                              {badge === "rental" && "🛶"}
                              {badge === "partner" && "🤝"}
                              {badge === "lessons" && "👨‍🏫"}
                              {badge === "certification" && "🎓"}
                              {badge === "events" && "🏢"}
                            </span>
                          ))}
                        </div>
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.name}</h3>
                        <div className="service-price">{service.price}</div>
                        <p className="service-description">
                          {service.description}
                        </p>
                        <div className="service-action">{service.action}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section Divider: Sailing Experiences */}
                <div className="section-divider">
                  <span>{t("Sailing Experiences")}</span>
                </div>

                {/* Row 2: Core offerings (2 cards) */}
                <div className="services-row services-row--middle">
                  {services.slice(3, 5).map((service) => (
                    <div
                      key={service.id}
                      className={`service-card service-card--${service.family} service-card--${service.gradientStrength}`}
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    >
                      <div className="card-background-overlay"></div>
                      <div className="card-content">
                        <div className="service-badges">
                          {service.badges.map((badge, index) => (
                            <span
                              key={index}
                              className={`service-badge service-badge--${badge}`}
                            >
                              {badge === "rental" && "🛶"}
                              {badge === "partner" && "🤝"}
                              {badge === "lessons" && "👨‍🏫"}
                              {badge === "certification" && "🎓"}
                              {badge === "events" && "🏢"}
                            </span>
                          ))}
                        </div>
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.name}</h3>
                        <div className="service-price">{service.price}</div>
                        <p className="service-description">
                          {service.description}
                        </p>
                        <div className="service-action">{service.action}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section Divider: Programs & Events */}
                <div className="section-divider">
                  <span>{t("Programs & Events")}</span>
                </div>

                {/* Row 3: Specialized (2 cards) */}
                <div className="services-row services-row--bottom">
                  {services.slice(5, 7).map((service) => (
                    <div
                      key={service.id}
                      className={`service-card service-card--${service.family} service-card--${service.gradientStrength}`}
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    >
                      <div className="card-background-overlay"></div>
                      <div className="card-content">
                        <div className="service-badges">
                          {service.badges.map((badge, index) => (
                            <span
                              key={index}
                              className={`service-badge service-badge--${badge}`}
                            >
                              {badge === "rental" && "🛶"}
                              {badge === "partner" && "🤝"}
                              {badge === "lessons" && "👨‍🏫"}
                              {badge === "certification" && "🎓"}
                              {badge === "events" && "🏢"}
                            </span>
                          ))}
                        </div>
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.name}</h3>
                        <div className="service-price">{service.price}</div>
                        <p className="service-description">
                          {service.description}
                        </p>
                        <div className="service-action">{service.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 2: FAQ Accordion */}
            <section className="faq-section">
              <div className="container">
                <h2>{t("Frequently Asked Questions")}</h2>

                <div className="faq-accordion">
                  {faqs.map((faq, index) => (
                    <div key={index} className="faq-item">
                      <button
                        className="faq-question"
                        onClick={() => toggleFAQ(index)}
                        aria-expanded={openFAQ === index}
                      >
                        {faq.question}
                        <span className="faq-icon">
                          {openFAQ === index ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`faq-answer ${
                          openFAQ === index ? "open" : ""
                        }`}
                      >
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Rent;
