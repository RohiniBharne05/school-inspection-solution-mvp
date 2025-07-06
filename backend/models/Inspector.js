const mongoose = require('mongoose');

const inspectorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  designation: String,
  assignedSchools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }]
});

module.exports = mongoose.model('Inspector', inspectorSchema);
