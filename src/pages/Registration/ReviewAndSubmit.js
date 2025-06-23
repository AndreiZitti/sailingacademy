import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./ReviewAndSubmit.css";

const ReviewAndSubmit = ({ formData, onPrev }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Load reCAPTCHA script if not already loaded
  const loadRecaptcha = () => {
    return new Promise((resolve) => {
      if (window.grecaptcha) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY_HERE";
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  // Execute reCAPTCHA v3
  const executeRecaptcha = async () => {
    await loadRecaptcha();
    return new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute("YOUR_SITE_KEY_HERE", { action: "registration_submit" })
          .then((token) => {
            resolve(token);
          });
      });
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA v3 (invisible to user)
      const recaptchaToken = await executeRecaptcha();

      // Get email for verification (parent email for trial/junior, member email for others)
      const emailForVerification =
        formData.type === "trial" || formData.memberTier === "junior"
          ? formData.parentInfo?.email
          : formData.memberInfo?.email;

      // Send registration data with reCAPTCHA token
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptcha_token: recaptchaToken,
          verification_email: emailForVerification,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setIsSubmitted(true);
        setEmailSent(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);

      if (error.message.includes("recaptcha")) {
        alert(t("Security verification failed. Please try again."));
      } else {
        alert(
          t(
            "There was an error submitting your registration. Please try again."
          )
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const emailAddress =
      formData.type === "trial" || formData.memberTier === "junior"
        ? formData.parentInfo?.email
        : formData.memberInfo?.email;

    return (
      <div className="success-container">
        <div className="success-icon verification">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <div className="success-content">
          <h2 className="success-title">
            {t("Registration Submitted Successfully!")}
          </h2>
          <p className="success-description">
            {t("We've sent a verification email to")}{" "}
            <strong>{emailAddress}</strong>
          </p>
          <p className="verification-note">
            {t(
              "Please check your email and click the verification link to complete your registration."
            )}
          </p>
        </div>
        <div className="next-steps">
          <h3 className="next-steps-title">{t("Next Steps:")}</h3>
          <ul className="next-steps-list">
            <li className="verification-step">
              📧 {t("Check your email inbox (and spam folder)")}
            </li>
            <li className="verification-step">
              🔗 {t("Click the verification link in the email")}
            </li>
            <li className="verification-step">
              ⏰{" "}
              {t(
                "We will contact you within 2-3 business days after verification"
              )}
            </li>
            <li className="verification-step">
              💳{" "}
              {formData.type === "trial"
                ? t("Trial course details will be provided upon approval")
                : t("Payment instructions will be provided upon approval")}
            </li>
          </ul>
        </div>
        <div className="help-section">
          <p className="help-text">
            {t("Didn't receive the email?")}
            <button
              className="resend-btn"
              onClick={() => window.location.reload()}
            >
              {t("Try submitting again")}
            </button>
          </p>
          <p className="contact-info">
            {t("Need help? Contact us at")}
            <a href="mailto:info@sailingacademy.com">info@sailingacademy.com</a>
          </p>
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
                : t("1-Month Intro Course (for kids)")}
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
