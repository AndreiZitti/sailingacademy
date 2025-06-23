import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./ReviewAndSubmit.css";

const ReviewAndSubmit = ({ formData, onPrev }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Here you would send the data to your backend
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert(
        t("There was an error submitting your registration. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-container">
        <div className="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <div className="success-content">
          <h2 className="success-title">
            {t("Registration Submitted Successfully!")}
          </h2>
          <p className="success-description">
            {t(
              "Thank you for registering with Sailing Academy. We will review your application and contact you soon."
            )}
          </p>
        </div>
        <div className="next-steps">
          <h3 className="next-steps-title">{t("Next Steps:")}</h3>
          <ul className="next-steps-list">
            <li>{t("Check your email for a confirmation message")}</li>
            <li>{t("We will contact you within 2-3 business days")}</li>
            <li>{t("Payment instructions will be provided upon approval")}</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="review-submit">
      <div className="form-header">
        <h2 className="form-title">{t("Review Your Registration")}</h2>
        <p className="form-description">
          {t(
            "Please review all information before submitting your registration"
          )}
        </p>
      </div>

      <div className="review-sections">
        {/* Membership Type */}
        <div className="review-section">
          <h3 className="review-section-title">{t("Membership Type")}</h3>
          <div className="review-content">
            <p className="membership-type">
              {formData.type === "yearlong"
                ? t("Year-long Membership")
                : t("1-Month Trial Membership")}
            </p>
            {formData.memberTier && (
              <p className="membership-tier">
                {t("Tier")}:{" "}
                {formData.memberTier.charAt(0).toUpperCase() +
                  formData.memberTier.slice(1)}
              </p>
            )}
          </div>
        </div>

        {/* Member Information */}
        {formData.memberInfo && (
          <div className="review-section">
            <h3 className="review-section-title">
              {formData.type === "trial"
                ? t("Child Information")
                : t("Member Information")}
            </h3>
            <div className="review-content">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">{t("Name")}:</span>
                  <span className="info-value">{formData.memberInfo.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t("Date of Birth")}:</span>
                  <span className="info-value">{formData.memberInfo.dob}</span>
                </div>
                {formData.memberInfo.email && (
                  <div className="info-item">
                    <span className="info-label">{t("Email")}:</span>
                    <span className="info-value">
                      {formData.memberInfo.email}
                    </span>
                  </div>
                )}
                {formData.memberInfo.phone && (
                  <div className="info-item">
                    <span className="info-label">{t("Phone")}:</span>
                    <span className="info-value">
                      {formData.memberInfo.phone}
                    </span>
                  </div>
                )}
              </div>
              {formData.memberInfo.address && (
                <div className="info-item full-width">
                  <span className="info-label">{t("Address")}:</span>
                  <span className="info-value">
                    {formData.memberInfo.address}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Parent Information */}
        {formData.parentInfo && (
          <div className="review-section">
            <h3 className="review-section-title">
              {t("Parent/Guardian Information")}
            </h3>
            <div className="review-content">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">{t("Name")}:</span>
                  <span className="info-value">{formData.parentInfo.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t("Email")}:</span>
                  <span className="info-value">
                    {formData.parentInfo.email}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t("Phone")}:</span>
                  <span className="info-value">
                    {formData.parentInfo.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trial-specific Information */}
        {formData.type === "trial" && (
          <div className="review-section">
            <h3 className="review-section-title">{t("Course Information")}</h3>
            <div className="review-content">
              <div className="info-item">
                <span className="info-label">{t("Course")}:</span>
                <span className="info-value">{formData.course}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t("Swimming Ability")}:</span>
                <span className="info-value">
                  {formData.canSwim ? t("Confirmed") : t("Not confirmed")}
                </span>
              </div>
              {formData.notes && (
                <div className="info-item full-width">
                  <span className="info-label">{t("Notes")}:</span>
                  <span className="info-value">{formData.notes}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Method */}
        {formData.paymentMethod && (
          <div className="review-section">
            <h3 className="review-section-title">{t("Payment Method")}</h3>
            <div className="review-content">
              <p className="payment-method">
                {formData.paymentMethod === "cash" && t("Cash Payment")}
                {formData.paymentMethod === "card" && t("Credit/Debit Card")}
                {formData.paymentMethod === "bank_transfer" &&
                  t("Bank Transfer")}
              </p>
            </div>
          </div>
        )}

        {/* Consents */}
        <div className="review-section">
          <h3 className="review-section-title">{t("Consents")}</h3>
          <div className="review-content">
            <div className="consent-list">
              <div className="consent-item">
                <span className="consent-check">✓</span>
                <span>{t("Internal Club Rules accepted")}</span>
              </div>
              <div className="consent-item">
                <span className="consent-check">✓</span>
                <span>{t("Photo/Video usage agreed")}</span>
              </div>
              <div className="consent-item">
                <span className="consent-check">✓</span>
                <span>{t("Covid-19 safety rules accepted")}</span>
              </div>
              <div className="consent-item">
                <span className="consent-check">✓</span>
                <span>{t("GDPR data handling consented")}</span>
              </div>
              {formData.consents?.parentApproval && (
                <div className="consent-item">
                  <span className="consent-check">✓</span>
                  <span>{t("Parent approval given")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="btn-group">
        <button
          onClick={onPrev}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          {t("Previous")}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? t("Submitting...") : t("Submit Registration")}
        </button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;
