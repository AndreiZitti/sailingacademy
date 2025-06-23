import React from "react";
import { Link } from "react-router-dom";
import AboutUsCard from "./AboutUsCard";
import "./AboutUs.css";
import Footer from "../Home/Footer";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>{t("About Sailing Academy")}</h1>
          <p>
            {t(
              "Discover our passion for sailing and our mission to share it with everyone"
            )}
          </p>
        </div>
      </div>

      <div className="about-content">
        {/* Mission Section */}
        <div className="about-section">
          <AboutUsCard
            className="card-1"
            title={t("Who We Are")}
            description={t(
              "Sailing Academy is a yachting school with learning programs and recreational activities for children, youth and adults. Founded from passion for yachting and the desire to bring it to the attention of water sports enthusiasts, offering them the opportunity to practice in Bucharest, Romania or abroad. We have partnerships with clubs where some of the best coaches currently in Greece and worldwide have trained European and world champions over the years."
            )}
          />
          <div className="about-img">
            <img src="/images/imag12.jpg" alt={t("Sailing training")} />
          </div>
        </div>

        {/* Vision Section */}
        <div className="about-section reverse">
          <div className="about-img">
            <img src="/images/Concurs.jpg" alt={t("Sailing competition")} />
          </div>
          <AboutUsCard
            className="card-2"
            title={t("Our Mission")}
            description={t(
              "Our club aims to form the largest possible community of sailing enthusiasts - all those who love water, wind, closeness to nature, challenges, adventure into the unknown and, last but not least, the spirit of fair play. We want to contribute to a considerable increase in the number of young people who love this sport and help those who want to practice at a performance level to evolve."
            )}
          />
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2>{t("Our Values")}</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌊</div>
              <h3>{t("Passion for Water")}</h3>
              <p>
                {t(
                  "We live and breathe sailing, sharing our love for the water with every student"
                )}
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🏆</div>
              <h3>{t("Excellence")}</h3>
              <p>
                {t(
                  "Professional training with experienced coaches to achieve your sailing goals"
                )}
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>{t("Community")}</h3>
              <p>
                {t(
                  "Building a welcoming community of sailing enthusiasts of all ages and levels"
                )}
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>{t("Growth")}</h3>
              <p>
                {t(
                  "Supporting personal development through sailing challenges and adventures"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta">
          <h2>{t("Ready to Join Our Sailing Community?")}</h2>
          <p>
            {t(
              "Whether you're a beginner or looking to improve your skills, we have the perfect program for you."
            )}
          </p>
          <div className="cta-buttons">
            <Link to="/registration" className="cta-btn primary">
              {t("Start Your Journey")}
            </Link>
            <Link to="/contact-us" className="cta-btn secondary">
              {t("Contact Us")}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;
