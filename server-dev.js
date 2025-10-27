const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for development
let contacts = [];
let inquiries = [];
let subscribers = [];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'DSBCA Backend API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mode: 'development (in-memory storage)'
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
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully! We will get back to you soon.',
      id: contact._id
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Service inquiry submission
app.post('/api/service-inquiry', async (req, res) => {
  try {
    const { name, email, phone, service, company, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !service) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, phone, and service are required' 
      });
    }

    // Save to in-memory storage
    const inquiry = {
      _id: Date.now().toString(),
      name,
      email,
      phone,
      service,
      company,
      message,
      createdAt: new Date(),
      status: 'pending'
    };
    inquiries.push(inquiry);

    console.log('New service inquiry:', inquiry);
    
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
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if email already exists
    if (subscribers.find(s => s.email === email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is already subscribed' 
      });
    }

    // Save to in-memory storage
    const subscriber = {
      _id: Date.now().toString(),
      email,
      createdAt: new Date(),
      isActive: true
    };
    subscribers.push(subscriber);

    console.log('New newsletter subscriber:', subscriber);
    
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

// Admin endpoints
app.get('/api/admin/contacts', (req, res) => {
  res.json({ success: true, data: contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

app.get('/api/admin/inquiries', (req, res) => {
  res.json({ success: true, data: inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

app.get('/api/admin/newsletter', (req, res) => {
  res.json({ success: true, data: subscribers.filter(s => s.isActive).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Development backend server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
  console.log('Note: Using in-memory storage - data will be lost on restart');
});
