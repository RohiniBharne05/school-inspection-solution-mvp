const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  inspector: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspector' },
  date: { type: Date, default: Date.now },
  rating: { type: Number, required: true },
  comments: { type: String },
  photos: [{ type: String }]
});

module.exports = mongoose.model('Inspection', inspectionSchema);
