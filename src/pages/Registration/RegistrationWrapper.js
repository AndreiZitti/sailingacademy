import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import StepSelector from "./StepSelector";
import ConsentForm from "./ConsentForm";
import ReviewAndSubmit from "./ReviewAndSubmit";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import "./RegistrationWrapper.css";

const RegistrationWrapper = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "yearlong",
    consents: {
      internalRules: false,
      photo: false,
      covid: false,
      gdpr: false,
    },
    isTrial: false,
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const steps = [
    { number: 1, title: "Membership & Personal Info", icon: "🏆" },
    { number: 2, title: "Consents", icon: "📋" },
    { number: 3, title: "Review & Submit", icon: "✅" },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepSelector
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ConsentForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return <ReviewAndSubmit formData={formData} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="page-background">
      <LanguageSwitcher />
      <div className="page-content">
        <div className="registration-wrapper">
          <div className="registration-container">
            {/* Header Section */}
            <div className="registration-header">
              <div className="header-icon">
                <svg
                  width="32"
                  height="32"
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
              </div>
              <h1>{t("Join Our Sailing Academy")}</h1>
              <p>
                {t(
                  "Embark on your sailing journey with us. Choose your membership and get ready for amazing adventures on the water."
                )}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="progress-container">
              <div className="progress-line">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Step Items */}
              <div className="steps-container">
                {steps.map((step) => (
                  <div key={step.number} className="step-item">
                    <div
                      className={`step-circle ${
                        currentStep >= step.number ? "active" : ""
                      }`}
                    >
                      {currentStep > step.number ? "✓" : step.icon}
                    </div>
                    <div className="step-content">
                      <div
                        className={`step-label ${
                          currentStep >= step.number ? "active" : ""
                        }`}
                      >
                        Step {step.number}
                      </div>
                      <div
                        className={`step-title ${
                          currentStep >= step.number ? "active" : ""
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="form-container">
              <div className="form-content">{renderStep()}</div>
            </div>

            {/* Footer */}
            <div className="registration-footer">
              Need help? Contact us at{" "}
              <a href="mailto:info@sailingacademy.com">
                info@sailingacademy.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWrapper;
