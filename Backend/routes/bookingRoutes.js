const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');

// Get all bookings
router.get('/bookings', BookingController.getAll);

// Get booking by ID
router.get('/bookings/:id', BookingController.getById);

// Create a new booking
router.post('/bookings', BookingController.create);

// Update a booking
router.put('/bookings/:id', BookingController.update);

// Delete a booking
router.delete('/bookings/:id', BookingController.delete);

module.exports = router;