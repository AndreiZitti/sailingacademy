import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import StepSelector from "./StepSelector";
import ConsentForm from "./ConsentForm";
import ReviewAndSubmit from "./ReviewAndSubmit";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import "./MembershipWrapper.css";

const MembershipWrapper = () => {
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
        <div className="membership-wrapper">
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
          <div className="membership-container">
            {/* Header Section */}
            <div className="membership-header">
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
            <div className="membership-footer">
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

export default MembershipWrapper;
