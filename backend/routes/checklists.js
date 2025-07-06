const express = require('express');
const router = express.Router();
const Checklist = require('../models/Checklist');

// Get all checklist items
router.get('/', async (req, res) => {
  const items = await Checklist.find().sort({ createdAt: -1 });
  res.json(items);
});

// Add a checklist item
router.post('/', async (req, res) => {
  const { title } = req.body;
  const item = new Checklist({ title });
  await item.save();
  res.json(item);
});

// Delete a checklist item
router.delete('/:id', async (req, res) => {
  await Checklist.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
