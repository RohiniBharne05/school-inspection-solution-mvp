const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  inspector: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  rating: Number,
  comments: String,
  photos: [String]
});
module.exports = mongoose.model('Report', ReportSchema);
