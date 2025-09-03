import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./StepSelector.css";

const StepSelector = ({ formData, updateFormData, onNext }) => {
  const { t } = useTranslation();
  const [showMembershipTiers, setShowMembershipTiers] = useState(
    formData.type === "yearlong"
  );
  const [showPersonalInfo, setShowPersonalInfo] = useState(
    (formData.type === "yearlong" && formData.memberTier) ||
      formData.type === "trial"
  );
  const [personalData, setPersonalData] = useState({
    // Year-long form defaults
    name: formData.memberInfo?.name || "",
    dob: formData.memberInfo?.dob || "",
    email: formData.memberInfo?.email || "",
    phone: formData.memberInfo?.phone || "",
    address: formData.memberInfo?.address || "",
    paymentMethod: formData.paymentMethod || "",
    parentName: formData.parentInfo?.name || "",
    parentEmail: formData.parentInfo?.email || "",
    parentPhone: formData.parentInfo?.phone || "",
    parentConsent: false,
    // Trial form defaults
    childName: formData.memberInfo?.name || "",
    childDob: formData.memberInfo?.dob || "",
    course: formData.course || "",
    canSwim: formData.canSwim || false,
    notes: formData.notes || "",
  });

  const membershipTiers = [
    {
      value: "junior",
      label: "Junior (under 18)",
      desc: "For members under 18 years old",
      price: "100 lei/month",
      details:
        "Includes access to youth programs, requires parent approval, and special coaching for young sailors.",
    },
    {
      value: "adult",
      label: "Adult (18-49)",
      desc: "For members aged 18-49",
      price: "150 lei/month",
      details:
        "Full access to all club facilities, racing events, and adult training programs.",
    },
    {
      value: "senior",
      label: "Senior (50+)",
      desc: "For members aged 50 and above",
      price: "100 lei/month",
      details:
        "Includes all adult benefits plus special senior events and priority booking for courses.",
    },
    {
      value: "supporter",
      label: "Supporter",
      desc: "Non-sailing supporters",
      price: "150 lei/month",
      details:
        "Perfect for those who want to support the club without actively sailing. Includes social events and club access.",
    },
  ];

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

    setShowMembershipTiers(type === "yearlong");
    setShowPersonalInfo(type === "trial");

    // Reset personal data when switching types
    setPersonalData({
      name: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      parentConsent: false,
      childName: "",
      childDob: "",
      course: "",
      canSwim: false,
      notes: "",
    });
  };

  const handleMemberTierSelection = (tier) => {
    updateFormData({
      memberTier: tier,
    });
    setShowPersonalInfo(true);
  };

  // Helper function to determine if we should use child-first form
  const shouldUseChildForm = () => {
    return formData.type === "trial" || formData.memberTier === "junior";
  };

  const handleInputChange = (field, value) => {
    setPersonalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.type === "yearlong") {
      // Validation for year-long membership
      if (!formData.memberTier) {
        alert("Please select a membership tier for your year-long membership.");
        return;
      }

      if (
        !personalData.name ||
        !personalData.dob ||
        !personalData.email ||
        !personalData.phone ||
        !personalData.address ||
        !personalData.paymentMethod
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const age = calculateAge(personalData.dob);

      // Validate age against selected tier
      if (formData.memberTier === "junior" && age >= 18) {
        alert("Junior membership is only for those under 18 years old");
        return;
      }
      if (formData.memberTier === "adult" && (age < 18 || age >= 50)) {
        alert("Adult membership is for ages 18-49");
        return;
      }
      if (formData.memberTier === "senior" && age < 50) {
        alert("Senior membership is for ages 50+");
        return;
      }

      const isJunior = formData.memberTier === "junior";
      if (
        isJunior &&
        (!personalData.parentName ||
          !personalData.parentEmail ||
          !personalData.parentPhone ||
          !personalData.parentConsent)
      ) {
        alert(
          "Please fill in all parent information and provide consent for junior members."
        );
        return;
      }

      updateFormData({
        memberInfo: {
          name: personalData.name,
          dob: personalData.dob,
          email: personalData.email,
          phone: personalData.phone,
          address: personalData.address,
        },
        parentInfo: isJunior
          ? {
              name: personalData.parentName,
              email: personalData.parentEmail,
              phone: personalData.parentPhone,
            }
          : undefined,
        paymentMethod: personalData.paymentMethod,
        consents: {
          ...formData.consents,
          parentApproval: isJunior ? personalData.parentConsent : undefined,
        },
      });
    } else {
      // Trial form validation
      if (
        !personalData.parentName ||
        !personalData.parentEmail ||
        !personalData.parentPhone ||
        !personalData.childName ||
        !personalData.childDob ||
        !personalData.course ||
        !personalData.canSwim
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      updateFormData({
        parentInfo: {
          name: personalData.parentName,
          email: personalData.parentEmail,
          phone: personalData.parentPhone,
        },
        memberInfo: {
          name: personalData.childName,
          dob: personalData.childDob,
          email: "",
          phone: "",
          address: "",
        },
        course: personalData.course,
        canSwim: personalData.canSwim,
        notes: personalData.notes,
      });
    }
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
                <h3>{t("1-Month Intro Course (for kids)")}</h3>
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

      {/* Membership Tiers Selection - Shows when year-long is selected */}
      {showMembershipTiers && formData.type === "yearlong" && (
        <div className="membership-tiers-section">
          <div className="tiers-container">
            <h3 className="tiers-title">{t("Choose Your Membership Tier")}</h3>
            <p className="tiers-description">
              {t(
                "Select the membership tier that matches your age and sailing goals"
              )}
            </p>

            <div className="tiers-grid">
              {membershipTiers.map((tier) => (
                <div
                  key={tier.value}
                  className={`tier-card ${
                    formData.memberTier === tier.value ? "selected" : ""
                  }`}
                  onClick={() => handleMemberTierSelection(tier.value)}
                >
                  <div className="tier-header">
                    <div
                      className={`tier-radio ${
                        formData.memberTier === tier.value ? "selected" : ""
                      }`}
                    >
                      {formData.memberTier === tier.value ? (
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
                        <div className="tier-dot"></div>
                      )}
                    </div>

                    <div className="tier-content">
                      <h4 className="tier-label">{t(tier.label)}</h4>
                      <p className="tier-desc">{t(tier.desc)}</p>
                      <p className="tier-price">{tier.price}</p>
                      <p className="tier-details">{t(tier.details)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Personal Information Form - Shows after membership type/tier selection */}
      {showPersonalInfo && (
        <form onSubmit={handleFormSubmit} className="personal-info-form">
          <div className="form-section">
            <h3 className="section-title">
              {formData.type === "yearlong"
                ? t("Your Membership Details")
                : t("Trial Course Information")}
            </h3>
            <p className="form-description">
              {formData.type === "yearlong"
                ? t(
                    "Tell us about yourself so we can create your perfect sailing membership"
                  )
                : t(
                    "Please provide parent and child information for the trial membership"
                  )}
            </p>

            {shouldUseChildForm() ? (
              // Child-first form (for junior and trial)
              <div className="form-fields">
                {/* Child Information */}
                <div className="field-group">
                  <h4 className="subsection-title">{t("Child Information")}</h4>
                  <div className="field-row">
                    <div className="field">
                      <label className="field-label">{t("Child's Full Name")}</label>
                      <input
                        type="text"
                        value={personalData.childName || personalData.name}
                        onChange={(e) =>
                          handleInputChange(formData.type === "trial" ? "childName" : "name", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">
                        {t("Child's Date of Birth")}
                      </label>
                      <input
                        type="date"
                        value={personalData.childDob || personalData.dob}
                        onChange={(e) =>
                          handleInputChange(formData.type === "trial" ? "childDob" : "dob", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div className="field-group parent-info">
                  <h4 className="subsection-title">
                    {t("Parent/Guardian Information")}
                  </h4>
                  <div className="field">
                    <label className="field-label">
                      {t("Parent/Guardian Name")}
                    </label>
                    <input
                      type="text"
                      value={personalData.parentName}
                      onChange={(e) =>
                        handleInputChange("parentName", e.target.value)
                      }
                      className="field-input"
                      required
                    />
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label className="field-label">
                        {t("Parent Email")}
                      </label>
                      <input
                        type="email"
                        value={personalData.parentEmail}
                        onChange={(e) =>
                          handleInputChange("parentEmail", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">
                        {t("Parent Phone")}
                      </label>
                      <input
                        type="tel"
                        value={personalData.parentPhone}
                        onChange={(e) =>
                          handleInputChange("parentPhone", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="checkbox-field">
                      <input
                        type="checkbox"
                        checked={personalData.parentConsent}
                        onChange={(e) =>
                          handleInputChange("parentConsent", e.target.checked)
                        }
                        className="checkbox-input"
                        required
                      />
                      <span className="checkbox-label">
                        {t(
                          "I, the parent/legal guardian, give my consent for this membership"
                        )}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Course/Additional Information (only for trial) */}
                {formData.type === "trial" && (
                  <div className="field-group">
                    <h4 className="subsection-title">
                      {t("Course Information")}
                    </h4>
                    <div className="field">
                      <label className="field-label">{t("Course Name")}</label>
                      <input
                        type="text"
                        value={personalData.course}
                        onChange={(e) =>
                          handleInputChange("course", e.target.value)
                        }
                        placeholder={t("e.g., Beginner Sailing Course")}
                        className="field-input"
                        required
                      />
                    </div>

                    <div className="field">
                      <label className="checkbox-field">
                        <input
                          type="checkbox"
                          checked={personalData.canSwim}
                          onChange={(e) =>
                            handleInputChange("canSwim", e.target.checked)
                          }
                          className="checkbox-input"
                          required
                        />
                        <span className="checkbox-label">
                          {t(
                            "My child can swim and is medically fit for sailing activities"
                          )}
                        </span>
                      </label>
                    </div>

                    <div className="field">
                      <label className="field-label">
                        {t("Notes for Instructor (Optional)")}
                      </label>
                      <textarea
                        value={personalData.notes}
                        onChange={(e) =>
                          handleInputChange("notes", e.target.value)
                        }
                        placeholder={t(
                          "Any additional information about your child that might be helpful for the instructor..."
                        )}
                        className="field-textarea"
                        rows="3"
                      />
                    </div>
                  </div>
                )}

                {/* Payment Method (only for year-long junior) */}
                {formData.type === "yearlong" && (
                  <div className="field-group payment-methods">
                    <h4 className="subsection-title">{t("Payment Method")}</h4>
                    <div className="payment-options">
                      {[
                        {
                          value: "cash",
                          label: t("Cash Payment"),
                          icon: "💰",
                          desc: t("Pay in cash at the club"),
                        },
                        {
                          value: "card",
                          label: t("Credit/Debit Card"),
                          icon: "💳",
                          desc: t("Secure online card payment"),
                        },
                        {
                          value: "bank_transfer",
                          label: t("Bank Transfer"),
                          icon: "🏦",
                          desc: t("Direct bank transfer"),
                        },
                      ].map((method) => (
                        <div
                          key={method.value}
                          className={`payment-option ${
                            personalData.paymentMethod === method.value
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handleInputChange("paymentMethod", method.value)
                          }
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={personalData.paymentMethod === method.value}
                            onChange={(e) =>
                              handleInputChange("paymentMethod", e.target.value)
                            }
                            className="payment-radio"
                            required
                          />
                          <div className="payment-content">
                            <div className="payment-header">
                              <span className="payment-icon">{method.icon}</span>
                              <span className="payment-label">
                                {method.label}
                              </span>
                            </div>
                            <span className="payment-desc">{method.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Adult form (for non-junior year-long memberships)
              <div className="form-fields">
                {/* Personal Information */}
                <div className="field-group">
                  <div className="field-row">
                    <div className="field">
                      <label className="field-label">{t("Full Name")}</label>
                      <input
                        type="text"
                        value={personalData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">
                        {t("Date of Birth")}
                      </label>
                      <input
                        type="date"
                        value={personalData.dob}
                        onChange={(e) =>
                          handleInputChange("dob", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label className="field-label">{t("Email")}</label>
                      <input
                        type="email"
                        value={personalData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">{t("Phone")}</label>
                      <input
                        type="tel"
                        value={personalData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="field-label">{t("Full Address")}</label>
                    <textarea
                      value={personalData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="field-textarea"
                      rows="3"
                      required
                    />
                  </div>
                </div>

                {/* Parent Information (only for junior) */}
                {formData.memberTier === "junior" && (
                  <div className="field-group parent-info">
                    <h4 className="subsection-title">
                      {t("Parent/Guardian Information")}
                    </h4>
                    <div className="field">
                      <label className="field-label">
                        {t("Parent/Guardian Name")}
                      </label>
                      <input
                        type="text"
                        value={personalData.parentName}
                        onChange={(e) =>
                          handleInputChange("parentName", e.target.value)
                        }
                        className="field-input"
                        required
                      />
                    </div>

                    <div className="field-row">
                      <div className="field">
                        <label className="field-label">
                          {t("Parent Email")}
                        </label>
                        <input
                          type="email"
                          value={personalData.parentEmail}
                          onChange={(e) =>
                            handleInputChange("parentEmail", e.target.value)
                          }
                          className="field-input"
                          required
                        />
                      </div>

                      <div className="field">
                        <label className="field-label">
                          {t("Parent Phone")}
                        </label>
                        <input
                          type="tel"
                          value={personalData.parentPhone}
                          onChange={(e) =>
                            handleInputChange("parentPhone", e.target.value)
                          }
                          className="field-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="checkbox-field">
                        <input
                          type="checkbox"
                          checked={personalData.parentConsent}
                          onChange={(e) =>
                            handleInputChange("parentConsent", e.target.checked)
                          }
                          className="checkbox-input"
                          required
                        />
                        <span className="checkbox-label">
                          {t(
                            "I, the parent/legal guardian, give my consent for this membership"
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                <div className="field-group payment-methods">
                  <h4 className="subsection-title">{t("Payment Method")}</h4>
                  <div className="payment-options">
                    {[
                      {
                        value: "cash",
                        label: t("Cash Payment"),
                        icon: "💰",
                        desc: t("Pay in cash at the club"),
                      },
                      {
                        value: "card",
                        label: t("Credit/Debit Card"),
                        icon: "💳",
                        desc: t("Secure online card payment"),
                      },
                      {
                        value: "bank_transfer",
                        label: t("Bank Transfer"),
                        icon: "🏦",
                        desc: t("Direct bank transfer"),
                      },
                    ].map((method) => (
                      <div
                        key={method.value}
                        className={`payment-option ${
                          personalData.paymentMethod === method.value
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleInputChange("paymentMethod", method.value)
                        }
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={personalData.paymentMethod === method.value}
                          onChange={(e) =>
                            handleInputChange("paymentMethod", e.target.value)
                          }
                          className="payment-radio"
                          required
                        />
                        <div className="payment-content">
                          <div className="payment-header">
                            <span className="payment-icon">{method.icon}</span>
                            <span className="payment-label">
                              {method.label}
                            </span>
                          </div>
                          <span className="payment-desc">{method.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="continue-section">
              <button
                type="submit"
                className={`btn btn-primary btn-full ${
                  formData.type === "trial" ? "trial" : ""
                }`}
              >
                {t("Continue to Consents")}
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
        </form>
      )}
    </div>
  );
};

export default StepSelector;
