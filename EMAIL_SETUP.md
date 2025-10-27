# Email Setup Guide for DSBCA Backend

## 📧 Configure Gmail to Receive Client Messages

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security"
3. Enable "2-Step Verification" if not already enabled

### Step 2: Generate App Password
1. In Google Account Security, go to "2-Step Verification"
2. Scroll down and click on "App passwords"
3. Select:
   - App: "Mail"
   - Device: "Other (Custom name)" → Enter "DSBCA Backend"
4. Click "Generate"
5. Copy the 16-character password (this is your EMAIL_PASS)

### Step 3: Update Environment Variables
Edit the `.env` file in the backend folder:

```env
# Email Configuration
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_TO=info@dsbca.in
```

**Important:**
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: The 16-character App Password (NOT your regular password)
- `EMAIL_TO`: Where you want to receive notifications (can be same as EMAIL_USER)

### Step 4: Restart the Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
node server-email.js
```

## 📧 What Happens When Client Submits Form

### 1. Admin Email (You Receive)
- **From**: Your Gmail address
- **To**: The email specified in EMAIL_TO
- **Subject**: "New Contact Form: [Client's Subject]"
- **Contains**: Client's name, email, subject, message, and timestamp

### 2. Client Email (Automatic Reply)
- **From**: Your Gmail address
- **To**: Client's email address
- **Subject**: "Thank you for contacting D S B & Associates"
- **Contains**: Professional confirmation message

## 🧪 Test Email Configuration

### Option 1: Test via API
```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

### Option 2: Test via Website
1. Open http://localhost:5000
2. Go to Contact section
3. Fill out the form with your details
4. Submit and check your email

## 🔧 Troubleshooting

### "Email configuration error"
- Check that EMAIL_USER and EMAIL_PASS are set correctly
- Ensure you're using an App Password, not your regular password
- Verify 2-factor authentication is enabled

### "Invalid login" or "Authentication failed"
- Generate a new App Password
- Make sure there are no spaces in the App Password
- Check that EMAIL_USER is exactly your Gmail address

### "Email sending failed but message was saved"
- Email configuration has issues, but the form submission was saved
- Check the server console for detailed error messages
- Fix email configuration and restart server

## 📨 Email Templates

### Admin Notification Email
- Professional layout with DSBCA branding
- All client information clearly displayed
- Includes submission timestamp and database ID

### Client Confirmation Email
- Professional thank you message
- Confirms receipt of their inquiry
- Includes contact information for urgent queries

## 🔄 Production Considerations

1. **Use a dedicated email address** for business communications
2. **Set up email forwarding** if needed
3. **Monitor email quota** (Gmail has sending limits)
4. **Consider transactional email services** for high volume (SendGrid, AWS SES)
5. **Set up email monitoring** to track delivery issues

## 📊 Email Logs

The server console will show:
- ✅ Success messages when emails are sent
- ❌ Error details if email sending fails
- 📧 Email addresses for both admin and client emails

## 🎯 Quick Setup Checklist

- [ ] Enable 2-factor authentication on Gmail
- [ ] Generate App Password for DSBCA Backend
- [ ] Update EMAIL_USER in .env file
- [ ] Update EMAIL_PASS in .env file (use App Password)
- [ ] Update EMAIL_TO in .env file
- [ ] Restart the backend server
- [ ] Test with a sample form submission
- [ ] Check both admin and client emails received

Once configured, you'll automatically receive email notifications whenever a client submits the contact form! 🚀
