# 🚢 Sailing Academy Registration System - TODO

## 📋 **Current Status**

✅ **COMPLETED TODAY:**

- Consolidated registration steps (from 4 steps to 3 steps)
- Combined membership selection + personal info in Step 1
- Added membership tier selection with detailed descriptions
- Improved payment method UI with cards and icons
- Implemented reCAPTCHA v3 + email verification flow
- Updated success page for email verification workflow

## 🔥 **HIGH PRIORITY - Tomorrow**

### 1. **Setup reCAPTCHA v3** ⚡

**File to update:** `src/pages/Registration/ReviewAndSubmit.js`

- [ ] Get reCAPTCHA v3 keys from Google: https://www.google.com/recaptcha/admin
- [ ] Replace `YOUR_SITE_KEY_HERE` with actual site key (2 places in the file)
- [ ] Add site key to environment variables
- [ ] Test reCAPTCHA is working (check browser console)

### 2. **Backend API Implementation** ⚡

**Reference file:** `backend-api-example.js` (already created)

- [ ] Install required packages: `npm install axios crypto nodemailer`
- [ ] Set up environment variables:
  ```env
  RECAPTCHA_SECRET_KEY=your_secret_key_here
  EMAIL_USER=your_email@domain.com
  EMAIL_PASS=your_app_password
  FRONTEND_URL=https://yourdomain.com
  ```
- [ ] Implement the `/api/registration` endpoint
- [ ] Implement the `/api/registration/verify/:token` endpoint
- [ ] Connect to your database (update the mock functions)

### 3. **Database Schema** ⚡

**Add these fields to your registrations table:**

```sql
ALTER TABLE registrations ADD COLUMN verification_token VARCHAR(255);
ALTER TABLE registrations ADD COLUMN verification_email VARCHAR(255);
ALTER TABLE registrations ADD COLUMN status VARCHAR(20) DEFAULT 'pending_verification';
```

## 🔨 **MEDIUM PRIORITY**

### 4. **Create Verification Success Page**

- [ ] Create `/verify-registration/[token]` page
- [ ] Handle verification success/failure states
- [ ] Add nice "Registration Verified!" message

### 5. **Admin Dashboard for Pending Registrations**

**Reference:** The README I created earlier for the admin dashboard

- [ ] Create admin page to view pending registrations
- [ ] Add filtering by membership type/status
- [ ] Add approve/reject actions
- [ ] Export functionality for club records

### 6. **Testing & QA**

- [ ] Test complete registration flow (all 5 membership types)
- [ ] Test email verification works
- [ ] Test reCAPTCHA prevents bots
- [ ] Test on mobile devices
- [ ] Test with different email providers

## 📊 **Example Registration Data**

**For Backend Testing - Use these sample outputs:**

- Junior Membership (with parent info)
- Adult Membership
- Senior Membership
- Supporter Membership
- 1-Month Trial Course

_Full JSON examples are in our earlier conversation - search for "Example Form Outputs"_

## 🔒 **Security Checklist**

- [ ] reCAPTCHA v3 implemented and working
- [ ] Email verification working
- [ ] Rate limiting implemented (3 attempts per 15 minutes)
- [ ] Input validation on backend
- [ ] CSRF protection enabled
- [ ] SSL certificate installed

## 📧 **Email Templates Needed**

- [ ] Registration verification email (HTML template created in backend-api-example.js)
- [ ] Registration approved email (for admin approval)
- [ ] Welcome email with next steps

## 🎯 **Current Registration Flow**

1. **Step 1:** Membership & Personal Info (consolidated!)
   - Choose Year-long vs Trial
   - If Year-long → Select tier (Junior/Adult/Senior/Supporter)
   - Fill personal information + payment method
2. **Step 2:** Consents (unchanged)
3. **Step 3:** Review & Submit → Email verification required
4. **Email Link:** Click to verify → Registration confirmed

## 🚀 **Future Enhancements (Low Priority)**

- [ ] SMS verification for trial courses
- [ ] Payment integration (Stripe/PayPal)
- [ ] Document upload for membership
- [ ] Calendar integration for trial course scheduling
- [ ] Multi-language support improvements

## 📁 **Key Files Modified Today**

- `src/pages/Registration/RegistrationWrapper.js` - Updated step structure
- `src/pages/Registration/StepSelector.js` - Consolidated form with tiers
- `src/pages/Registration/StepSelector.css` - New styling for consolidated form
- `src/pages/Registration/ReviewAndSubmit.js` - Added reCAPTCHA + email verification
- `src/pages/Registration/ReviewAndSubmit.css` - Email verification styling
- `backend-api-example.js` - Complete backend example

## 🎨 **Design Notes**

- Payment method now uses card-style layout with icons
- Membership tiers show detailed descriptions
- Email verification uses mail icon instead of checkmark
- Success page emphasizes email verification steps
- All styling is mobile-responsive

---

## ⚡ **QUICK START for Tomorrow**

1. Set up reCAPTCHA keys
2. Implement backend API endpoints
3. Test registration flow end-to-end
4. Create admin dashboard for reviewing registrations

**Total estimated time: 4-6 hours** 🕐
