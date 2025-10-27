# ⚠️ Gmail App Password Required

## Your Current Configuration
- **Email**: shannu142006@gmail.com ✅
- **Password**: shannu630263 ❌ (This is your regular password)

## You Need to Generate an App Password

### Why App Password is Required:
Gmail no longer allows regular passwords for third-party apps. You must generate a 16-character App Password.

### Quick Steps:

1. **Enable 2-Factor Authentication** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" → Turn it on

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → Enter "DSBCA Backend"
   - Click "Generate"
   - **Copy the 16-character password** (no spaces)

3. **Update Your .env File**
   ```env
   EMAIL_USER=shannu142006@gmail.com
   EMAIL_PASS=the-16-character-app-password
   EMAIL_TO=info@dsbca.in
   ```

4. **Restart Server**
   ```bash
   # Stop current server (Ctrl+C)
   # Then restart:
   node server-email.js
   ```

### Example App Password Format:
```
abcd efgh ijkl mnop  (16 characters, spaces shown for clarity)
```
In .env file: `EMAIL_PASS=abcdefghijklmnop`

### Test Again:
After updating with the App Password, test the contact form on the website and check your email!

## Current Status:
- ✅ Backend server running
- ✅ Frontend website running at http://localhost:5000
- ❌ Email needs App Password configuration
- 🔄 Ready to test once App Password is set
