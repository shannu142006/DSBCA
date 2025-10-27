const mongoose = require('mongoose');

const serviceInquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  service: { type: String, required: true, trim: true },
  company: { type: String, trim: true },
  message: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending', enum: ['pending', 'contacted', 'in-progress', 'completed'] }
});

module.exports = mongoose.model('ServiceInquiry', serviceInquirySchema);
