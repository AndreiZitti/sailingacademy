import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
import "./Rent.css";

function Rent() {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState(null);

  const services = [
    {
      id: 1,
      name: t("Kayaks"),
      price: "50 lei/hr",
      icon: "🛶",
      description: t("Perfect for lake exploration"),
      importance: "secondary",
    },
    {
      id: 2,
      name: t("Stand Up Paddles"),
      price: "50 lei/hr",
      icon: "🏄‍♂️",
      description: t("Great for beginners"),
      importance: "secondary",
    },
    {
      id: 3,
      name: t("Sailing Boats"),
      price: "50-100 lei/hr",
      icon: "⛵",
      description: t("All skill levels welcome"),
      importance: "secondary",
    },
    {
      id: 4,
      name: t("Private Lessons"),
      price: "50-100 lei/hr",
      icon: "👨‍🏫",
      description: t("One-on-one instruction"),
      importance: "secondary",
    },
    {
      id: 5,
      name: t("Group Lessons"),
      price: t("Contact us"),
      icon: "👥",
      description: t("Learn with friends"),
      importance: "secondary",
    },
    {
      id: 6,
      name: t("License Course"),
      price: t("Full program"),
      icon: "📜",
      description: t("Official certification"),
      importance: "primary",
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
                <div className="services-grid">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`service-card service-card--${service.importance}`}
                    >
                      <div className="service-icon">{service.icon}</div>
                      <h3>{service.name}</h3>
                      <div className="service-price">{service.price}</div>
                      <p>{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
              <span className="scroll-indicator-text">
                {t("More Info Below")}
              </span>
              <div className="scroll-arrow">↓</div>
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
