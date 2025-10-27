const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for development
let contacts = [];

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'DSBCA Backend API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mode: 'development with email support',
    emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
  });
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Save to in-memory storage
    const contact = {
      _id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      status: 'new'
    };
    contacts.push(contact);

    console.log('New contact submission:', contact);

    // Send email notification to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.EMAIL_TO || 'info@dsbca.in',
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 3px; border-left: 4px solid #2c5aa0;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from the DSBCA website contact form.
            <br>Database ID: ${contact._id}
            <br>Date: ${contact.createdAt.toLocaleString()}
          </p>
        </div>
      `
    };

    // Send confirmation email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Thank you for contacting D S B & Associates',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5aa0;">Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to D S B & Associates. We have received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          <p>If you have any urgent queries, please call us at +91 9844145589.</p>
          <p>Best regards,<br>D S B & Associates Team</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            D S B & Associates<br>
            Professional Accounting & Auditing Services<br>
            Email: info@dsbca.in | Phone: +91 9844145589<br>
            Website: www.dsbca.in
          </p>
        </div>
      `
    };

    // Send emails
    try {
      await transporter.sendMail(adminMailOptions);
      console.log('✅ Admin email sent successfully to:', process.env.EMAIL_TO);
      
      await transporter.sendMail(clientMailOptions);
      console.log('✅ Client confirmation email sent to:', email);
      
      res.json({ 
        success: true, 
        message: 'Message sent successfully! We will get back to you soon.',
        id: contact._id,
        emailSent: true
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still save the contact even if email fails
      res.json({ 
        success: true, 
        message: 'Message received! We will get back to you soon.',
        id: contact._id,
        emailSent: false,
        emailError: 'Email notification failed but message was saved'
      });
    }
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Admin endpoint to get contacts
app.get('/api/admin/contacts', (req, res) => {
  res.json({ success: true, data: contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Backend server with email support is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
  console.log(`Email configuration: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`Email will be sent to: ${process.env.EMAIL_TO || 'info@dsbca.in'}`);
});
