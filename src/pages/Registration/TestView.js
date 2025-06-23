import React, { useState } from "react";
import StepSelector from "./StepSelector";
import YearForm from "./YearForm";
import TrialForm from "./TrialForm";
import ConsentForm from "./ConsentForm";
import ReviewAndSubmit from "./ReviewAndSubmit";

const TestView = () => {
  const [currentComponent, setCurrentComponent] = useState("StepSelector");
  const [formData, setFormData] = useState({
    type: "yearlong",
    memberTier: "adult",
    memberInfo: {
      name: "John Doe",
      dob: "1990-05-15",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Main St, City, Country",
    },
    parentInfo: {
      name: "Parent Doe",
      email: "parent@example.com",
      phone: "+1234567891",
    },
    course: "Beginner Sailing Course",
    canSwim: true,
    notes: "Test notes for instructor",
    paymentMethod: "card",
    consents: {
      internalRules: true,
      photo: true,
      covid: true,
      gdpr: true,
      parentApproval: true,
    },
    isTrial: false,
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const components = [
    { id: "StepSelector", name: "Step 1: Membership Type", icon: "🏆" },
    { id: "YearForm", name: "Step 2A: Year-long Form", icon: "👤" },
    { id: "TrialForm", name: "Step 2B: Trial Form", icon: "⛵" },
    { id: "ConsentForm", name: "Step 3: Consent Form", icon: "📋" },
    { id: "ReviewAndSubmit", name: "Step 4: Review & Submit", icon: "✅" },
  ];

  const renderComponent = () => {
    const mockProps = {
      formData,
      updateFormData,
      onNext: () => console.log("Next clicked"),
      onPrev: () => console.log("Previous clicked"),
    };

    switch (currentComponent) {
      case "StepSelector":
        return <StepSelector {...mockProps} />;
      case "YearForm":
        return <YearForm {...mockProps} />;
      case "TrialForm":
        return <TrialForm {...mockProps} />;
      case "ConsentForm":
        return <ConsentForm {...mockProps} />;
      case "ReviewAndSubmit":
        return (
          <ReviewAndSubmit
            formData={formData}
            onPrev={() => console.log("Previous clicked")}
          />
        );
      default:
        return <div>Component not found</div>;
    }
  };

  const presetData = {
    yearlong: {
      type: "yearlong",
      memberTier: "adult",
      memberInfo: {
        name: "John Doe",
        dob: "1990-05-15",
        email: "john@example.com",
        phone: "+1234567890",
        address: "123 Main St, City, Country",
      },
      paymentMethod: "card",
      isTrial: false,
    },
    junior: {
      type: "yearlong",
      memberTier: "junior",
      memberInfo: {
        name: "Jane Smith",
        dob: "2010-03-20",
        email: "jane@example.com",
        phone: "+1234567890",
        address: "456 Oak St, City, Country",
      },
      parentInfo: {
        name: "Parent Smith",
        email: "parent@example.com",
        phone: "+1234567891",
      },
      paymentMethod: "bank_transfer",
      isTrial: false,
    },
    trial: {
      type: "trial",
      memberInfo: {
        name: "Child Name",
        dob: "2015-08-10",
        email: "",
        phone: "",
        address: "",
      },
      parentInfo: {
        name: "Parent Name",
        email: "parent@example.com",
        phone: "+1234567892",
      },
      course: "Beginner Sailing Course",
      canSwim: true,
      notes: "Child is very excited about sailing!",
      isTrial: true,
    },
  };

  const loadPreset = (presetKey) => {
    const preset = presetData[presetKey];
    setFormData((prev) => ({
      ...prev,
      ...preset,
      consents: prev.consents, // Keep consents as they are
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #eff6ff, #ffffff, #ecfeff)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              borderRadius: "50%",
              marginBottom: "1rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <svg
              style={{ width: "32px", height: "32px", color: "white" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "1rem",
            }}
          >
            Registration Components Test View
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#6b7280" }}>
            Test and preview all registration components
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gap: "2rem",
          }}
        >
          {/* Sidebar Controls */}
          <div>
            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                position: "sticky",
                top: "2rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                Components
              </h3>

              {/* Component Navigation */}
              <div style={{ marginBottom: "1.5rem" }}>
                {components.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setCurrentComponent(comp.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      marginBottom: "0.5rem",
                      border:
                        currentComponent === comp.id
                          ? "2px solid #dbeafe"
                          : "none",
                      background:
                        currentComponent === comp.id ? "#dbeafe" : "#f9fafb",
                      color:
                        currentComponent === comp.id ? "#1d4ed8" : "#374151",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (currentComponent !== comp.id) {
                        e.target.style.background = "#f3f4f6";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentComponent !== comp.id) {
                        e.target.style.background = "#f9fafb";
                      }
                    }}
                  >
                    <span
                      style={{ fontSize: "1.125rem", marginRight: "0.75rem" }}
                    >
                      {comp.icon}
                    </span>
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "0.875rem" }}>
                        {comp.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Data Presets */}
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.75rem",
                }}
              >
                Test Data Presets
              </h4>
              <div style={{ marginBottom: "1.5rem" }}>
                <button
                  onClick={() => loadPreset("yearlong")}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                    background: "#dcfce7",
                    color: "#15803d",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🏆 Adult Year-long
                </button>
                <button
                  onClick={() => loadPreset("junior")}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                    background: "#dbeafe",
                    color: "#1d4ed8",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  👶 Junior Year-long
                </button>
                <button
                  onClick={() => loadPreset("trial")}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    background: "#fce7f3",
                    color: "#be185d",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ⛵ Trial Membership
                </button>
              </div>

              {/* Current Data Summary */}
              <div
                style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}
              >
                <h4
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.5rem",
                  }}
                >
                  Current Data
                </h4>
                <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  <div>
                    <strong>Type:</strong> {formData.type}
                  </div>
                  <div>
                    <strong>Tier:</strong> {formData.memberTier || "N/A"}
                  </div>
                  <div>
                    <strong>Name:</strong> {formData.memberInfo?.name || "N/A"}
                  </div>
                  <div>
                    <strong>Trial:</strong> {formData.isTrial ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div>
            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              {/* Component Header */}
              <div
                style={{
                  background: "linear-gradient(to right, #2563eb, #06b6d4)",
                  padding: "1rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "white",
                    margin: 0,
                  }}
                >
                  {components.find((c) => c.id === currentComponent)?.name}
                </h2>
              </div>

              {/* Component Content */}
              <div style={{ padding: "2rem" }}>{renderComponent()}</div>
            </div>

            {/* Debug Panel */}
            <div
              style={{
                marginTop: "1.5rem",
                background: "#111827",
                borderRadius: "1rem",
                padding: "1.5rem",
                color: "white",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>🐛</span>
                Debug: Current Form Data
              </h3>
              <pre
                style={{
                  fontSize: "0.75rem",
                  overflow: "auto",
                  background: "#1f2937",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestView;
