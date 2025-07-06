const router = require('express').Router();
const auth = require('../middleware/auth');
const School = require('../models/School');

// Create
router.post('/', auth(['supervisor']), async (req, res) => {
  const school = new School(req.body);
  await school.save();
  res.json(school);
});

// Read all
router.get('/', auth(), async (req, res) => {
  res.json(await School.find());
});

// Read one
router.get('/:id', auth(), async (req, res) => {
  res.json(await School.findById(req.params.id));
});

// Update
router.put('/:id', auth(['supervisor']), async (req, res) => {
  const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(school);
});

// Delete
router.delete('/:id', auth(['supervisor']), async (req, res) => {
  await School.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
