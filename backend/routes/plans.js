const router = require('express').Router();
const auth = require('../middleware/auth');
const Plan = require('../models/Plan');

router.post('/', auth(['supervisor']), async (req, res) => {
  const plan = new Plan(req.body);
  await plan.save();
  res.json(plan);
});

router.get('/', auth(), async (req, res) => {
  const { date, school, inspector } = req.query;
  const query = {};
  if (date) query.date = { $eq: new Date(date) };
  if (school) query.school = school;
  if (inspector) query.inspectors = inspector;
  res.json(await Plan.find(query).populate('school inspectors'));
});

module.exports = router;
