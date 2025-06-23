// Backend API Example - Express.js with reCAPTCHA v3 + Email Verification
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// reCAPTCHA v3 verification
const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      secret: secretKey,
      response: token,
    }
  );

  const { success, score } = response.data;
  return success && score >= 0.5; // Adjust threshold as needed
};

// Email service setup
const transporter = nodemailer.createTransporter({
  // Your email service configuration
  service: "gmail", // or your preferred service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Registration endpoint with security
app.post("/api/registration", async (req, res) => {
  try {
    const { recaptcha_token, verification_email, ...registrationData } =
      req.body;

    // 1. Verify reCAPTCHA
    const isValidRecaptcha = await verifyRecaptcha(recaptcha_token);
    if (!isValidRecaptcha) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification failed",
      });
    }

    // 2. Validate email exists
    if (!verification_email) {
      return res.status(400).json({
        success: false,
        message: "Verification email is required",
      });
    }

    // 3. Generate verification token
    const verificationToken = generateVerificationToken();

    // 4. Save registration to database with 'pending_verification' status
    const registrationId = await saveRegistration({
      ...registrationData,
      status: "pending_verification",
      verification_token: verificationToken,
      verification_email: verification_email,
      created_at: new Date(),
    });

    // 5. Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-registration/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: verification_email,
      subject: "Verify Your Sailing Academy Registration",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #2563eb;">Welcome to Sailing Academy!</h2>
          <p>Thank you for registering with us. Please click the button below to verify your registration:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Registration
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationLink}">${verificationLink}</a>
          </p>
          
          <p style="color: #666; font-size: 14px;">
            This link will expire in 24 hours. If you didn't register for Sailing Academy, 
            please ignore this email.
          </p>
        </div>
      `,
    });

    res.json({
      success: true,
      registrationId: registrationId,
      message:
        "Registration submitted successfully. Please check your email to verify.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Email verification endpoint
app.get("/api/registration/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Find registration by token
    const registration = await findRegistrationByToken(token);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Check if token is not expired (24 hours)
    const tokenAge = new Date() - new Date(registration.created_at);
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return res.status(400).json({
        success: false,
        message: "Verification token has expired",
      });
    }

    // Update registration status
    await updateRegistrationStatus(registration.id, "pending_approval");

    // Redirect to success page or return success response
    res.redirect(
      `${process.env.FRONTEND_URL}/registration-verified?id=${registration.registration_id}`
    );
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Mock database functions (replace with your actual database implementation)
async function saveRegistration(data) {
  // Insert into your database
  // Return the generated registration ID
  return "REG-2024-" + Date.now();
}

async function findRegistrationByToken(token) {
  // Find registration by verification token
  // Return registration object or null
}

async function updateRegistrationStatus(id, status) {
  // Update registration status in database
}

module.exports = app;
