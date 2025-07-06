const mongoose = require('mongoose');
const PlanSchema = new mongoose.Schema({
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  date: Date,
  inspectors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  checklist: [String]
});
module.exports = mongoose.model('Plan', PlanSchema);
