import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
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
      availability: t("Available now"),
      status: "available",
      family: "quick-rentals",
      bgImage: "/images/canoe.jpeg",
      action: t("Walk in or call"),
    },
    {
      id: 2,
      name: t("Stand Up Paddles"),
      price: "50 lei/hr",
      icon: "🏄‍♂️",
      description: t("Great workout"),
      availability: t("5 boards ready"),
      status: "available",
      family: "quick-rentals",
      bgImage: "/images/SUPstock.jpeg",
      action: t("Walk in or call"),
    },
    {
      id: 3,
      name: t("Waterverse"),
      price: t("From 200 lei/hr"),
      icon: "🚤",
      description: t("Premium boats via app"),
      availability: t("Partner service"),
      status: "partner",
      family: "partner",
      bgImage: "/images/bigBoat.JPG",
      action: t("Download app"),
    },
    // Row 2: Core offerings
    {
      id: 4,
      name: t("Sailing Boats"),
      price: "50-100 lei/hr",
      icon: "⛵",
      description: t("All skill levels"),
      availability: t("Weather dependent"),
      status: "booking",
      family: "sailing-core",
      bgImage: "/images/VantTare.jpg",
      action: t("Book online"),
    },
    {
      id: 5,
      name: t("Sailing Lessons"),
      price: t("From 80 lei"),
      icon: "👨‍🏫",
      description: t("Professional instructors"),
      availability: t("Book ahead"),
      status: "booking",
      family: "sailing-core",
      bgImage: "/images/Curso1.webp",
      action: t("View schedule"),
    },
    // Row 3: Specialized
    {
      id: 6,
      name: t("Sailing Permit"),
      price: t("Full program"),
      icon: "📜",
      description: t("Official certification"),
      availability: t("Next course: Feb 15"),
      status: "certification",
      family: "programs",
      bgImage: "/images/Concurs.jpg",
      action: t("View schedule"),
    },
    {
      id: 7,
      name: t("Corporate Events"),
      price: t("Custom pricing"),
      icon: "🏢",
      description: t("Team building"),
      availability: t("Up to 30 people"),
      status: "booking",
      family: "programs",
      bgImage: "/images/ClubPhoto.jpg",
      action: t("Get quote"),
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
                      className={`service-card service-card--${service.family}`}
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    >
                      <div className="card-background-overlay"></div>
                      <div className="card-content">
                        <div className="service-status">
                          <span
                            className={`status-badge status-badge--${service.status}`}
                          >
                            {service.status === "available" && "🟢"}
                            {service.status === "partner" && "🤝"}
                            {service.status === "popular" && "🔥"}
                          </span>
                        </div>
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.name}</h3>
                        <div className="service-price">{service.price}</div>
                        <p className="service-description">
                          {service.description}
                        </p>
                        <div className="service-availability">
                          {service.availability}
                        </div>
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
                      className={`service-card service-card--${service.family}`}
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    >
                      <div className="card-background-overlay"></div>
                      <div className="card-content">
                        <div className="service-status">
                          <span
                            className={`status-badge status-badge--${service.status}`}
                          >
                            {service.status === "booking" && "📅"}
                          </span>
                        </div>
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.name}</h3>
                        <div className="service-price">{service.price}</div>
                        <p className="service-description">
                          {service.description}
                        </p>
                        <div className="service-availability">
                          {service.availability}
                        </div>
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
                      className={`service-card service-card--${service.family}`}
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    >
                      <div className="card-background-overlay"></div>
                      <div className="card-content">
                        <div className="service-status">
                          <span
                            className={`status-badge status-badge--${service.status}`}
                          >
                            {service.status === "certification" && "🎓"}
                            {service.status === "booking" && "📅"}
                          </span>
                        </div>
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.name}</h3>
                        <div className="service-price">{service.price}</div>
                        <p className="service-description">
                          {service.description}
                        </p>
                        <div className="service-availability">
                          {service.availability}
                        </div>
                        <div className="service-action">{service.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Answers Banner */}
            <div className="quick-answers-banner">
              <div className="quick-answers-content">
                <span className="quick-answers-title">
                  {t("Quick Answers")}:
                </span>
                <div className="quick-answers-buttons">
                  <button
                    className="quick-answer-btn"
                    onClick={() => toggleFAQ(0)}
                  >
                    {t("Do I need experience?")}
                  </button>
                  <button
                    className="quick-answer-btn"
                    onClick={() => toggleFAQ(5)}
                  >
                    {t("What's included?")}
                  </button>
                  <button
                    className="quick-answer-btn"
                    onClick={() => toggleFAQ(2)}
                  >
                    {t("How to book?")}
                  </button>
                </div>
              </div>
            </div>

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
