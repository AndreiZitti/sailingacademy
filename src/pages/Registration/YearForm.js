import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./YearForm.css";

const YearForm = ({ formData, updateFormData, onNext, onPrev }) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    name: formData.memberInfo?.name || "",
    dob: formData.memberInfo?.dob || "",
    email: formData.memberInfo?.email || "",
    phone: formData.memberInfo?.phone || "",
    address: formData.memberInfo?.address || "",
    memberTier: formData.memberTier || "",
    paymentMethod: formData.paymentMethod || "",
    parentName: formData.parentInfo?.name || "",
    parentEmail: formData.parentInfo?.email || "",
    parentPhone: formData.parentInfo?.phone || "",
    parentConsent: formData.consents?.parentApproval || false,
  });
  const [errors, setErrors] = useState({});

  const isJunior = formValues.memberTier === "junior";

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

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.name.trim()) newErrors.name = t("Name is required");
    if (!formValues.dob) newErrors.dob = t("Date of birth is required");
    if (!formValues.email.trim()) newErrors.email = t("Email is required");
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = t("Invalid email");
    if (!formValues.phone.trim())
      newErrors.phone = t("Phone number is required");
    if (!formValues.address.trim())
      newErrors.address = t("Address is required");
    if (!formValues.memberTier)
      newErrors.memberTier = t("Member tier is required");
    if (!formValues.paymentMethod)
      newErrors.paymentMethod = t("Payment method is required");

    if (isJunior) {
      if (!formValues.parentName.trim())
        newErrors.parentName = t("Parent name is required for junior members");
      if (!formValues.parentEmail.trim())
        newErrors.parentEmail = t(
          "Parent email is required for junior members"
        );
      else if (!/\S+@\S+\.\S+/.test(formValues.parentEmail))
        newErrors.parentEmail = t("Invalid email");
      if (!formValues.parentPhone.trim())
        newErrors.parentPhone = t(
          "Parent phone is required for junior members"
        );
      if (!formValues.parentConsent)
        newErrors.parentConsent = t("Parent consent is required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const age = calculateAge(formValues.dob);

    // Validate age against selected tier
    if (formValues.memberTier === "junior" && age >= 18) {
      alert(t("Junior membership is only for those under 18 years old"));
      return;
    }
    if (formValues.memberTier === "adult" && (age < 18 || age >= 50)) {
      alert(t("Adult membership is for ages 18-49"));
      return;
    }
    if (formValues.memberTier === "senior" && age < 50) {
      alert(t("Senior membership is for ages 50+"));
      return;
    }

    updateFormData({
      memberTier: formValues.memberTier,
      memberInfo: {
        name: formValues.name,
        dob: formValues.dob,
        email: formValues.email,
        phone: formValues.phone,
        address: formValues.address,
      },
      parentInfo: isJunior
        ? {
            name: formValues.parentName,
            email: formValues.parentEmail,
            phone: formValues.parentPhone,
          }
        : undefined,
      paymentMethod: formValues.paymentMethod,
      consents: {
        ...formData.consents,
        parentApproval: isJunior ? formValues.parentConsent : undefined,
      },
    });
    onNext();
  };

  const memberTiers = [
    {
      value: "junior",
      label: t("Junior (under 18)"),
      desc: t("For members under 18 years old"),
    },
    {
      value: "adult",
      label: t("Adult (18-49)"),
      desc: t("For members aged 18-49"),
    },
    {
      value: "senior",
      label: t("Senior (50+)"),
      desc: t("For members aged 50 and above"),
    },
    {
      value: "supporter",
      label: t("Supporter"),
      desc: t("Non-sailing supporters"),
    },
  ];

  const paymentMethods = [
    { value: "cash", label: t("Cash Payment") },
    { value: "card", label: t("Credit/Debit Card") },
    { value: "bank_transfer", label: t("Bank Transfer") },
  ];

  return (
    <div className="year-form">
      <div className="form-header">
        <h2 className="form-title">{t("Your Membership Details")}</h2>
        <p className="form-description">
          {t(
            "Tell us about yourself so we can create your perfect sailing membership"
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="membership-form">
        {/* Member Tier Selection */}
        <div className="form-section">
          <label className="section-label">{t("Select Member Tier")}</label>
          <div className="tier-options">
            {memberTiers.map((tier) => (
              <label key={tier.value} className="tier-option">
                <input
                  type="radio"
                  name="memberTier"
                  value={tier.value}
                  checked={formValues.memberTier === tier.value}
                  onChange={handleInputChange}
                  className="tier-radio"
                />
                <div
                  className={`tier-card ${
                    formValues.memberTier === tier.value ? "selected" : ""
                  }`}
                >
                  <div className="tier-label">{tier.label}</div>
                  <div className="tier-desc">{tier.desc}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.memberTier && (
            <div className="form-error">{errors.memberTier}</div>
          )}
        </div>

        {/* Personal Information */}
        <div className="form-section">
          <h3 className="section-title">{t("Personal Information")}</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">{t("Full Name")}</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? "error" : ""}`}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">{t("Date of Birth")}</label>
              <input
                type="date"
                name="dob"
                value={formValues.dob}
                onChange={handleInputChange}
                className={`form-input ${errors.dob ? "error" : ""}`}
              />
              {errors.dob && <div className="form-error">{errors.dob}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">{t("Email")}</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? "error" : ""}`}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">{t("Phone")}</label>
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                className={`form-input ${errors.phone ? "error" : ""}`}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t("Full Address")}</label>
            <textarea
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              rows={3}
              className={`form-textarea ${errors.address ? "error" : ""}`}
            />
            {errors.address && (
              <div className="form-error">{errors.address}</div>
            )}
          </div>
        </div>

        {/* Parent Information (only for junior) */}
        {isJunior && (
          <div className="form-section parent-section">
            <h3 className="section-title">
              {t("Parent/Guardian Information")}
            </h3>
            <div className="form-group">
              <label className="form-label">{t("Parent/Guardian Name")}</label>
              <input
                type="text"
                name="parentName"
                value={formValues.parentName}
                onChange={handleInputChange}
                className={`form-input ${errors.parentName ? "error" : ""}`}
              />
              {errors.parentName && (
                <div className="form-error">{errors.parentName}</div>
              )}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">{t("Parent Email")}</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formValues.parentEmail}
                  onChange={handleInputChange}
                  className={`form-input ${errors.parentEmail ? "error" : ""}`}
                />
                {errors.parentEmail && (
                  <div className="form-error">{errors.parentEmail}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">{t("Parent Phone")}</label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formValues.parentPhone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.parentPhone ? "error" : ""}`}
                />
                {errors.parentPhone && (
                  <div className="form-error">{errors.parentPhone}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="parentConsent"
                  checked={formValues.parentConsent}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <span className="checkbox-text">
                  {t(
                    "I give consent for my child to participate in sailing activities"
                  )}
                </span>
              </label>
              {errors.parentConsent && (
                <div className="form-error">{errors.parentConsent}</div>
              )}
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className="form-section">
          <label className="section-label">{t("Payment Method")}</label>
          <div className="payment-options">
            {paymentMethods.map((method) => (
              <label key={method.value} className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={formValues.paymentMethod === method.value}
                  onChange={handleInputChange}
                  className="payment-radio"
                />
                <div
                  className={`payment-card ${
                    formValues.paymentMethod === method.value ? "selected" : ""
                  }`}
                >
                  {method.label}
                </div>
              </label>
            ))}
          </div>
          {errors.paymentMethod && (
            <div className="form-error">{errors.paymentMethod}</div>
          )}
        </div>

        <div className="btn-group">
          <button type="button" onClick={onPrev} className="btn btn-secondary">
            {t("Previous")}
          </button>
          <button type="submit" className="btn btn-primary">
            {t("Continue")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default YearForm;
