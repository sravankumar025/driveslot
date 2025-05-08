const { Booking, Vehicle, User } = require('../models');

class BookingController {
  // Create a new booking
  static async create(req, res) {
    try {
      const { userId, vehicleId, startDate, endDate } = req.body;

      // Check if the vehicle exists
      const vehicle = await Vehicle.findByPk(vehicleId);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      // Calculate total amount (example calculation based on price per day)
      const totalAmount = vehicle.price_per_day * ((new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24));

      // Create the booking
      const booking = await Booking.create({
        userId,
        vehicleId,
        startDate,
        endDate,
        totalAmount
      });

      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all bookings
  static async getAll(req, res) {
    try {
      const bookings = await Booking.findAll({
        include: [User, Vehicle] // Includes user and vehicle details
      });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get booking by ID
  static async getById(req, res) {
    try {
      const booking = await Booking.findByPk(req.params.id, {
        include: [User, Vehicle]
      });

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a booking
  static async update(req, res) {
    try {
      const { userId, vehicleId, startDate, endDate } = req.body;
      const booking = await Booking.findByPk(req.params.id);

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      booking.userId = userId || booking.userId;
      booking.vehicleId = vehicleId || booking.vehicleId;
      booking.startDate = startDate || booking.startDate;
      booking.endDate = endDate || booking.endDate;

      // Recalculate totalAmount if dates are updated
      if (startDate && endDate) {
        const vehicle = await Vehicle.findByPk(booking.vehicleId);
        booking.totalAmount = vehicle.price_per_day * ((new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24));
      }

      await booking.save();
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a booking
  static async delete(req, res) {
    try {
      const booking = await Booking.findByPk(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      await booking.destroy();
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookingController;