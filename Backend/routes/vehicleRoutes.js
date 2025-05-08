const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');

router.get('/', VehicleController.getAll);              // GET /api/vehicles
router.get('/:id', VehicleController.getById);          // GET /api/vehicles/:id
router.post('/', VehicleController.create);             // POST /api/vehicles
router.put('/:id', VehicleController.update);           // PUT /api/vehicles/:id
router.delete('/:id', VehicleController.delete);        // DELETE /api/vehicles/:id

module.exports = router;