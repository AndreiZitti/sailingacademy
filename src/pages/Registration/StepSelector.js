import React from "react";
import { useTranslation } from "react-i18next";
import "./StepSelector.css";

const StepSelector = ({ formData, updateFormData, onNext }) => {
  const { t } = useTranslation();

  const handleSelection = (type) => {
    updateFormData({
      type,
      isTrial: type === "trial",
      // Reset fields when switching types
      memberTier: undefined,
      memberInfo: undefined,
      parentInfo: undefined,
      course: undefined,
      canSwim: undefined,
      notes: undefined,
      paymentMethod: undefined,
    });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="step-selector">
      <div className="selector-header">
        <h2 className="form-title">{t("Choose Your Adventure")}</h2>
        <p className="form-description">
          {t(
            "Select the membership option that best fits your sailing aspirations"
          )}
        </p>
      </div>

      <div className="membership-options">
        {/* Year-long Membership Card */}
        <div
          className={`membership-card ${
            formData.type === "yearlong" ? "selected" : ""
          }`}
          onClick={() => handleSelection("yearlong")}
        >
          <div className="card-content">
            <div className="card-header">
              <div
                className={`radio-circle ${
                  formData.type === "yearlong" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="membershipType"
                  value="yearlong"
                  checked={formData.type === "yearlong"}
                  onChange={() => handleSelection("yearlong")}
                  className="radio-input"
                />
                {formData.type === "yearlong" ? (
                  <svg
                    className="check-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="book-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                )}
              </div>

              <div className="card-title">
                <h3>{t("Year-long Membership")}</h3>
                <p>
                  {t(
                    "Full membership with access to all club facilities and activities. Choose from four membership tiers based on your age and involvement."
                  )}
                </p>
              </div>
            </div>

            <div className="card-features">
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>{t("Junior (under 18) - requires parent approval")}</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>{t("Adult (18+)")}</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>{t("Senior (50+)")}</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>{t("Supporter (non-sailing supporters)")}</span>
              </div>
            </div>

            <div className="card-footer">
              <span className="membership-tag">
                {t("Full access • Year-long")}
              </span>
            </div>
          </div>
        </div>

        {/* Trial Membership Card */}
        <div
          className={`membership-card ${
            formData.type === "trial" ? "selected trial" : ""
          }`}
          onClick={() => handleSelection("trial")}
        >
          <div className="card-content">
            <div className="card-header">
              <div
                className={`radio-circle ${
                  formData.type === "trial" ? "selected trial" : ""
                }`}
              >
                <input
                  type="radio"
                  name="membershipType"
                  value="trial"
                  checked={formData.type === "trial"}
                  onChange={() => handleSelection("trial")}
                  className="radio-input"
                />
                {formData.type === "trial" ? (
                  <svg
                    className="check-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="lightning-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                )}
              </div>

              <div className="card-title">
                <h3>{t("1-Month Trial Membership")}</h3>
                <p>
                  {t(
                    "Perfect for newcomers to sailing. One-time trial period to experience our courses and facilities before committing to full membership."
                  )}
                </p>
              </div>
            </div>

            <div className="card-features">
              <div className="feature-item">
                <span className="feature-dot trial"></span>
                <span>{t("1-month duration only")}</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot trial"></span>
                <span>{t("For newcomers to sailing")}</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot trial"></span>
                <span>{t("Not renewable")}</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot trial"></span>
                <span>{t("Swimming ability required")}</span>
              </div>
            </div>

            <div className="card-footer">
              <span className="membership-tag trial">
                {t("Trial access • 1 month")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="continue-section">
        <button onClick={handleNext} className="btn btn-primary btn-full">
          {t("Continue to Next Step")}
          <svg
            className="arrow-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StepSelector;
