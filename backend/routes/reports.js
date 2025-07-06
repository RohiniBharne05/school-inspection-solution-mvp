const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const Report = require('../models/Report');
const School = require('../models/School');
const Inspector = require('../models/Inspector');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', auth(['inspector']), upload.array('photos', 5), async (req, res) => {
  const photos = req.files.map(f => f.filename);
  const report = new Report({ ...req.body, inspector: req.user.id, photos });
  await report.save();
  res.json(report);
});

router.get('/', async (req, res) => {
  try {
    const { school, inspector, fromDate, toDate } = req.query;
    let filter = {};

    if (school) filter.school = school;
    if (inspector) filter.inspector = inspector;
    if (fromDate && toDate) {
      filter.date = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const reports = await Report.find(filter)
      .populate('school')
      .populate('inspector')
      .sort({ date: -1 });

    res.json(reports);
  } catch (err) {
    console.error('Error fetching filtered reports:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
