import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./TrialForm.css";

const TrialForm = ({ formData, updateFormData, onNext, onPrev }) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    parentName: formData.parentInfo?.name || "",
    parentEmail: formData.parentInfo?.email || "",
    parentPhone: formData.parentInfo?.phone || "",
    childName: formData.memberInfo?.name || "",
    childDob: formData.memberInfo?.dob || "",
    course: formData.course || "",
    canSwim: formData.canSwim || false,
    notes: formData.notes || "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.parentName.trim())
      newErrors.parentName = t("Parent name is required");
    if (!formValues.parentEmail.trim())
      newErrors.parentEmail = t("Parent email is required");
    else if (!/\S+@\S+\.\S+/.test(formValues.parentEmail))
      newErrors.parentEmail = t("Invalid email");
    if (!formValues.parentPhone.trim())
      newErrors.parentPhone = t("Parent phone is required");
    if (!formValues.childName.trim())
      newErrors.childName = t("Child name is required");
    if (!formValues.childDob)
      newErrors.childDob = t("Child date of birth is required");
    if (!formValues.course.trim())
      newErrors.course = t("Course name is required");
    if (!formValues.canSwim)
      newErrors.canSwim = t("Swimming ability confirmation is required");

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

    updateFormData({
      parentInfo: {
        name: formValues.parentName,
        email: formValues.parentEmail,
        phone: formValues.parentPhone,
      },
      memberInfo: {
        name: formValues.childName,
        dob: formValues.childDob,
        email: "",
        phone: "",
        address: "",
      },
      course: formValues.course,
      canSwim: formValues.canSwim,
      notes: formValues.notes,
    });
    onNext();
  };

  return (
    <div className="trial-form">
      <div className="form-header">
        <h2 className="form-title">{t("Trial Membership Information")}</h2>
        <p className="form-description">
          {t(
            "Please provide parent and child information for the trial membership"
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="trial-form-content">
        {/* Parent Information */}
        <div className="form-section">
          <h3 className="section-title">{t("Parent/Guardian Information")}</h3>
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
        </div>

        {/* Child Information */}
        <div className="form-section child-section">
          <h3 className="section-title">{t("Child Information")}</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">{t("Child Name")}</label>
              <input
                type="text"
                name="childName"
                value={formValues.childName}
                onChange={handleInputChange}
                className={`form-input ${errors.childName ? "error" : ""}`}
              />
              {errors.childName && (
                <div className="form-error">{errors.childName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">{t("Child Date of Birth")}</label>
              <input
                type="date"
                name="childDob"
                value={formValues.childDob}
                onChange={handleInputChange}
                className={`form-input ${errors.childDob ? "error" : ""}`}
              />
              {errors.childDob && (
                <div className="form-error">{errors.childDob}</div>
              )}
            </div>
          </div>
        </div>

        {/* Course Information */}
        <div className="form-section course-section">
          <h3 className="section-title">{t("Course Information")}</h3>
          <div className="form-group">
            <label className="form-label">{t("Course Name")}</label>
            <input
              type="text"
              name="course"
              value={formValues.course}
              onChange={handleInputChange}
              placeholder={t("e.g., Beginner Sailing Course")}
              className={`form-input ${errors.course ? "error" : ""}`}
            />
            {errors.course && <div className="form-error">{errors.course}</div>}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="canSwim"
                checked={formValues.canSwim}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="checkbox-text">
                {t(
                  "My child can swim and is medically fit for sailing activities"
                )}
              </span>
            </label>
            {errors.canSwim && (
              <div className="form-error">{errors.canSwim}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              {t("Notes for Instructor (Optional)")}
            </label>
            <textarea
              name="notes"
              value={formValues.notes}
              onChange={handleInputChange}
              rows={3}
              placeholder={t(
                "Any additional information about your child that might be helpful for the instructor..."
              )}
              className="form-textarea"
            />
          </div>
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

export default TrialForm;
