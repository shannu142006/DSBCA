const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'DSBCA Backend API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Use routes
app.use('/api/contact', contactRoutes);

// Service inquiry submission
app.post('/api/service-inquiry', async (req, res) => {
  try {
    const ServiceInquiry = require('./models/ServiceInquiry');
    const { name, email, phone, service, company, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !service) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, phone, and service are required' 
      });
    }

    // Save to database
    const inquiry = new ServiceInquiry({ name, email, phone, service, company, message });
    await inquiry.save();

    // Send email notification
    const transporter = require('./config/email');
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'info@dsbca.in',
      subject: `Service Inquiry: ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">
            New Service Inquiry
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px;">
            Database ID: ${inquiry._id}
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Service inquiry submitted successfully! We will contact you soon.',
      id: inquiry._id
    });
  } catch (error) {
    console.error('Error processing service inquiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit inquiry. Please try again later.' 
    });
  }
});

// Newsletter subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    const Newsletter = require('./models/Newsletter');
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is already subscribed' 
      });
    }

    // Save to database
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    // Send confirmation email
    const transporter = require('./config/email');
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Welcome to DSBCA Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5aa0;">Welcome to DSBCA Newsletter!</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You'll receive updates about:</p>
          <ul>
            <li>Latest tax regulations and compliance updates</li>
            <li>Financial planning tips</li>
            <li>Accounting best practices</li>
            <li>DSBCA service updates and offers</li>
          </ul>
          <p>Best regards,<br>D S B & Associates Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!',
      id: subscriber._id
    });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe. Please try again later.' 
    });
  }
});

// Get all service inquiries (admin endpoint)
app.get('/api/admin/inquiries', async (req, res) => {
  try {
    const ServiceInquiry = require('./models/ServiceInquiry');
    const inquiries = await ServiceInquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries' });
  }
});

// Get all newsletter subscribers (admin endpoint)
app.get('/api/admin/newsletter', async (req, res) => {
  try {
    const Newsletter = require('./models/Newsletter');
    const subscribers = await Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: subscribers });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
  }
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
