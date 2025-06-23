import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./ConsentForm.css";

const ConsentForm = ({ formData, updateFormData, onNext, onPrev }) => {
  const { t } = useTranslation();
  const [consents, setConsents] = useState({
    internalRules: formData.consents.internalRules,
    photo: formData.consents.photo,
    covid: formData.consents.covid,
    gdpr: formData.consents.gdpr,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!consents.internalRules)
      newErrors.internalRules = t("You must accept the Internal Club Rules");
    if (!consents.photo)
      newErrors.photo = t("You must agree to Photo/Video usage");
    if (!consents.covid)
      newErrors.covid = t("You must accept the Covid-19 safety rules");
    if (!consents.gdpr)
      newErrors.gdpr = t("You must consent to GDPR data handling");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setConsents((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // Clear error when user checks
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    updateFormData({
      consents: {
        ...formData.consents,
        internalRules: consents.internalRules,
        photo: consents.photo,
        covid: consents.covid,
        gdpr: consents.gdpr,
      },
    });
    onNext();
  };

  const consentItems = [
    {
      name: "internalRules",
      label: t("I accept the Internal Club Rules"),
      description: t(
        "By checking this box, I acknowledge that I have read and agree to abide by all internal club rules and regulations."
      ),
    },
    {
      name: "photo",
      label: t("I agree to Photo/Video usage"),
      description: t(
        "I consent to the use of photographs and videos taken during club activities for promotional and educational purposes."
      ),
    },
    {
      name: "covid",
      label: t("I understand and accept the Covid-19 safety rules"),
      description: t(
        "I agree to follow all health and safety protocols related to Covid-19 while participating in club activities."
      ),
    },
    {
      name: "gdpr",
      label: t("I consent to GDPR (Reg. 679/2016) data handling"),
      description: t(
        "I understand and consent to the collection, processing, and storage of my personal data in accordance with GDPR regulations."
      ),
    },
  ];

  return (
    <div className="consent-form">
      <div className="form-header">
        <h2 className="form-title">{t("Required Consents")}</h2>
        <p className="form-description">
          {t(
            "Please read and accept all required consents to continue with your registration"
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="consent-form-content">
        <div className="consent-items">
          {consentItems.map((item) => (
            <div key={item.name} className="consent-item">
              <div className="consent-content">
                <label className="consent-label">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={consents[item.name]}
                    onChange={handleConsentChange}
                    className="consent-checkbox"
                  />
                  <span className="consent-title">{item.label}</span>
                </label>
                <p className="consent-description">{item.description}</p>
              </div>
              {errors[item.name] && (
                <div className="form-error">{errors[item.name]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="info-box">
          <div className="info-icon">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="info-content">
            <h3 className="info-title">{t("Important Information")}</h3>
            <p className="info-text">
              {t(
                "All consents are required to proceed with your membership registration. You can review our full terms and conditions on our website or contact us for more information."
              )}
            </p>
          </div>
        </div>

        <div className="btn-group">
          <button type="button" onClick={onPrev} className="btn btn-secondary">
            {t("Previous")}
          </button>
          <button type="submit" className="btn btn-primary">
            {t("Continue to Review")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsentForm;
