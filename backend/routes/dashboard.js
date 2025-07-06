const express = require('express');
const router = express.Router();
const Inspection = require('../models/Inspection');
const School = require('../models/School');
const Inspector = require('../models/Inspector');

router.get('/summary', async (req, res) => {
  try {
    const today = new Date();
    const past30 = new Date(today);
    past30.setDate(past30.getDate() - 30);

    const recentInspections = await Inspection.find({ date: { $gte: past30 } });

    const avgRating =
      recentInspections.length > 0
        ? recentInspections.reduce((sum, r) => sum + r.rating, 0) / recentInspections.length
        : 0;

    const topSchool = await Inspection.aggregate([
      { $group: { _id: "$school", avgRating: { $avg: "$rating" } } },
      { $sort: { avgRating: -1 } },
      { $limit: 1 },
      { $lookup: { from: 'schools', localField: '_id', foreignField: '_id', as: 'school' } },
      { $unwind: "$school" }
    ]);

    const topInspector = await Inspection.aggregate([
      { $group: { _id: "$inspector", avgRating: { $avg: "$rating" } } },
      { $sort: { avgRating: -1 } },
      { $limit: 1 },
      { $lookup: { from: 'inspectors', localField: '_id', foreignField: '_id', as: 'inspector' } },
      { $unwind: "$inspector" }
    ]);

    res.json({
      inspectionCount: recentInspections.length,
      averageRating: avgRating,
      topSchool: topSchool[0]?.school?.name || 'N/A',
      topInspector: topInspector[0]?.inspector?.name || 'N/A',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Dashboard summary failed' });
  }
});

module.exports = router;
