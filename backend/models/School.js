const mongoose = require('mongoose');
const SchoolSchema = new mongoose.Schema({
  name: String,
  address: String,
  contact: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  }
});
SchoolSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('School', SchoolSchema);
