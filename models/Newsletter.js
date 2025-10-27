const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
