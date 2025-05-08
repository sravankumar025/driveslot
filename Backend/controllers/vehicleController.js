const { Vehicle } = require('../models');

class VehicleController {
  // Get all vehicles
  static async getAll(req, res) {
    try {
      const vehicles = await Vehicle.findAll();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a vehicle by ID
  static async getById(req, res) {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new vehicle
  static async create(req, res) {
    try {
      const { make, model, year, price_per_day, status } = req.body;
      const vehicle = await Vehicle.create({ make, model, year, price_per_day, status });
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a vehicle
  static async update(req, res) {
    try {
      const { make, model, year, price_per_day, status } = req.body;
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      vehicle.make = make || vehicle.make;
      vehicle.model = model || vehicle.model;
      vehicle.year = year || vehicle.year;
      vehicle.price_per_day = price_per_day || vehicle.price_per_day;
      vehicle.status = status || vehicle.status;

      await vehicle.save();
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a vehicle
  static async delete(req, res) {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      await vehicle.destroy();
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VehicleController;