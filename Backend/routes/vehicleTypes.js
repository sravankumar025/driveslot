const express = require('express');
const router = express.Router();
const { VehicleType } = require('../models'); // adjust path if needed

// GET /api/vehicle-types?wheels=2
router.get('/', async (req, res) => {
  const wheels = req.query.wheels;
  try {
    const types = await VehicleType.findAll({
      where: wheels ? { wheels } : undefined
    });
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
