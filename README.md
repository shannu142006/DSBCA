# D S B & Associates - Professional Website

A modern, responsive website for D S B & Associates, a professional accounting and auditing firm based in Bangalore and Kurnool, India.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Contact Form**: Functional contact form with email notifications
- **Service Showcase**: Comprehensive display of all services offered
- **Team Profiles**: Professional profiles of CA team members
- **Office Locations**: Contact information for both Bangalore and Kurnool offices

## Services Covered

- Audit & Assurance
- Accounting Services
- Taxation Services (Income Tax, GST)
- Company Law Matters
- FEMA Consultancy
- Outsourcing Services
- Transfer Pricing
- Valuation Services
- And many more...

## Technology Stack

### Frontend
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- Nodemailer (for email functionality)
- CORS (for cross-origin requests)

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Gmail account (for contact form emails)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd DSBCA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env file with your Gmail credentials
   # Replace your-email@gmail.com with your actual Gmail
   # Replace your-app-password with your Gmail App Password
   ```

4. **Configure Gmail App Password**
   - Go to your Google Account settings
   - Enable 2-Factor Authentication
   - Generate an App Password for this application
   - Use this App Password in your .env file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5000`
   - The website should be running!

## Production Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   - Download from [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku app**
   ```bash
   heroku create dsbca-website
   ```

4. **Set environment variables**
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

### Option 3: Traditional Hosting

1. **Build for production**
   ```bash
   npm start
   ```

2. **Upload files to your hosting provider**
   - Upload all files to your web server
   - Ensure Node.js is supported
   - Set up environment variables

## File Structure

```
DSBCA/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── server.js           # Node.js backend server
├── package.json        # Dependencies and scripts
├── env.example         # Environment variables template
└── README.md          # This file
```

## Customization

### Colors
The website uses a professional blue color scheme:
- Primary: #2c5aa0
- Secondary: #1e3a5f
- Accent: #f8f9fa

### Content Updates
- Edit `index.html` to update text content
- Modify `styles.css` for styling changes
- Update `script.js` for functionality changes

### Contact Form
- The contact form sends emails to `info@dsbca.in`
- Configure email settings in `server.js`
- Update email templates as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Performance Features

- Optimized images and assets
- Minified CSS and JavaScript
- Responsive images
- Lazy loading
- Smooth scrolling
- CSS animations

## Security Features

- Form validation
- CORS protection
- Input sanitization
- Rate limiting (can be added)

## Support

For technical support or questions about the website:
- Email: info@dsbca.in
- Phone: +91 9844145589

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**D S B & Associates**  
Professional Accounting, Auditing, and Financial Services  
Bangalore & Kurnool, India  
Website: www.dsbca.in | Email: info@dsbca.in | Phone: +91 9844145589
