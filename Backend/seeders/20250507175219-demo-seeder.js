'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert VehicleTypes first to ensure vehicleTypeId exists before Vehicles
    await queryInterface.bulkInsert('VehicleTypes', [
      {
        name: 'Hatchback',
        wheels: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SUV',
        wheels: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sedan',
        wheels: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cruiser',
        wheels: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sports',
        wheels: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    // Insert Vehicles next since VehicleTypes are already present
    await queryInterface.bulkInsert('Vehicles', [
      {
        name: 'Honda Civic',
        vehicleTypeId: 16,  // this corresponds to 'Hatchback'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Toyota Corolla',
        vehicleTypeId: 16,  // this corresponds to 'Hatchback'
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    // Insert Users
    await queryInterface.bulkInsert('Users', [
      {
        username: 'john_doe',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_doe',
        email: 'jane.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Insert Bookings last, since Vehicles and Users are already inserted
    await queryInterface.bulkInsert('Bookings', [
      {
        vehicleId: 1,  // Assuming vehicleId 1 corresponds to 'Honda Civic'
        userId: 1,     // Assuming userId 1 corresponds to 'john_doe'
        startDate: '2025-05-10',
        endDate: '2025-05-12',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vehicleId: 2,  // Assuming vehicleId 2 corresponds to 'Toyota Corolla'
        userId: 2,     // Assuming userId 2 corresponds to 'jane_doe'
        startDate: '2025-05-15',
        endDate: '2025-05-18',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookings', null, {});
    await queryInterface.bulkDelete('Vehicles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  },
};
