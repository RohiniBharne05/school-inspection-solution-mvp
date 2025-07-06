const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Checklist', checklistSchema);
