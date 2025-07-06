const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// GET all inspectors
router.get('/', authMiddleware, async (req, res) => {
  const inspectors = await User.find({ role: 'inspector' });
  res.json(inspectors);
});

// POST new inspector
router.post('/', authMiddleware, async (req, res) => {
  const { name, email, phone, designation } = req.body;
  const user = new User({
    name,
    email,
    phone,
    designation,
    role: 'inspector'
  });
  await user.save();
  res.json(user);
});

module.exports = router;
