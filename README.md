# DSBCA Backend API

Backend API server for D S B & Associates website with MongoDB integration and email functionality.

## Features

- **Contact Form Handling**: Process and store contact form submissions
- **Service Inquiries**: Handle service-specific inquiries with database storage
- **Newsletter Subscription**: Manage newsletter subscriptions
- **Email Notifications**: Automatic email sending for form submissions
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Admin Endpoints**: Retrieve all submissions for admin dashboard
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure environment variable management

## API Endpoints

### Public Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/contact` - Submit contact form
- `POST /api/service-inquiry` - Submit service inquiry
- `POST /api/newsletter` - Subscribe to newsletter

### Admin Endpoints

- `GET /api/admin/contacts` - Get all contact submissions
- `GET /api/admin/inquiries` - Get all service inquiries
- `GET /api/admin/newsletter` - Get all newsletter subscribers

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Gmail account with App Password (for email functionality)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure `.env` file:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dsbca

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Email Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in the `EMAIL_PASS` environment variable

### Running the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5001`

## Database Schema

### Contact Collection
```javascript
{
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  createdAt: Date (default: Date.now),
  status: String (default: 'new')
}
```

### ServiceInquiry Collection
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  service: String (required),
  company: String (optional),
  message: String (optional),
  createdAt: Date (default: Date.now),
  status: String (default: 'pending')
}
```

### Newsletter Collection
```javascript
{
  email: String (required, unique),
  createdAt: Date (default: Date.now),
  isActive: Boolean (default: true)
}
```

## API Usage Examples

### Submit Contact Form
```javascript
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Tax Consultation",
  "message": "I need help with tax planning for my business."
}
```

### Submit Service Inquiry
```javascript
POST /api/service-inquiry
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "service": "Auditing Services",
  "company": "ABC Corp",
  "message": "Interested in annual auditing services."
}
```

### Subscribe to Newsletter
```javascript
POST /api/newsletter
Content-Type: application/json

{
  "email": "newsletter@example.com"
}
```

## Error Handling

The API returns consistent error responses:
```javascript
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error
- `404` - Not Found

## Security Features

- Input validation on all endpoints
- CORS configuration for cross-origin requests
- Environment variable protection
- MongoDB connection security
- Rate limiting (can be implemented)

## Deployment

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure production email credentials
- Set appropriate CORS origins

### Recommended Hosting
- AWS EC2 with MongoDB Atlas
- Google Cloud Platform
- DigitalOcean
- Heroku (with MongoDB add-on)

## Monitoring and Logging

- Console logging for all operations
- Error tracking with try-catch blocks
- Database connection monitoring
- Email sending status tracking

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Update documentation for new features
4. Test all endpoints before submitting

## License

MIT License - D S B & Associates
