# DSBCA Backend Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**
   ```bash
   copy .env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB**
   - Option A: Local MongoDB
     ```bash
     mongod
     ```
   - Option B: MongoDB Atlas (cloud)
     - Update `MONGODB_URI` in `.env` with your Atlas connection string

4. **Start Backend Server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Test the API**
   ```bash
   curl http://localhost:5001/api/health
   ```

## Environment Configuration

Edit `.env` file with your settings:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dsbca

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in the `EMAIL_PASS` environment variable

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/contact` - Contact form submission
- `POST /api/service-inquiry` - Service inquiry submission  
- `POST /api/newsletter` - Newsletter subscription

### Admin Endpoints
- `GET /api/contact/admin` - Get all contact submissions
- `GET /api/admin/inquiries` - Get all service inquiries
- `GET /api/admin/newsletter` - Get newsletter subscribers

## Testing the API

### Health Check
```bash
curl http://localhost:5001/api/health
```

### Contact Form Test
```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### Service Inquiry Test
```bash
curl -X POST http://localhost:5001/api/service-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210", 
    "service": "Auditing Services",
    "company": "Test Company"
  }'
```

### Newsletter Subscription Test
```bash
curl -X POST http://localhost:5001/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newsletter@example.com"
  }'
```

## Database Collections

The backend creates three collections in MongoDB:

1. **contacts** - Contact form submissions
2. **serviceinquiries** - Service-specific inquiries
3. **newsletters** - Newsletter subscribers

## Project Structure

```
backend/
├── config/
│   ├── database.js    # MongoDB connection
│   └── email.js       # Email configuration
├── middleware/
│   └── errorHandler.js # Error handling middleware
├── models/
│   ├── Contact.js     # Contact schema
│   ├── ServiceInquiry.js # Service inquiry schema
│   └── Newsletter.js  # Newsletter schema
├── routes/
│   └── contact.js     # Contact routes
├── .env               # Environment variables
├── .env.example       # Environment template
├── package.json       # Dependencies and scripts
├── server.js          # Main server file
├── test-server.js     # Simple test server
├── start.bat          # Windows startup script
└── README.md          # Documentation
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or update `MONGODB_URI` for Atlas
- Check firewall settings if using local MongoDB
- Verify connection string format

### Email Issues
- Verify Gmail App Password is correct
- Check if 2-factor authentication is enabled
- Ensure `EMAIL_USER` and `EMAIL_PASS` are set correctly

### Port Issues
- Change `PORT` in `.env` if 5001 is in use
- Check if other applications are using the same port

### Dependencies Issues
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and reinstall if issues persist

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use production MongoDB URI
3. Configure production email credentials
4. Set appropriate CORS origins
5. Use process manager like PM2 for production

## Security Notes

- Never commit `.env` file to version control
- Use strong passwords and App Passwords for email
- Implement rate limiting for production
- Consider adding authentication for admin endpoints
- Use HTTPS in production

## Support

For issues or questions:
1. Check the console logs for error messages
2. Verify environment configuration
3. Test with the simple `test-server.js` first
4. Check MongoDB and email configurations
