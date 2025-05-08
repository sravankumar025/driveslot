module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define("Vehicle", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'VehicleTypes',
          key: 'id',
        },
      },
    });
  
    Vehicle.associate = (models) => {
      Vehicle.belongsTo(models.VehicleType, {
        foreignKey: 'vehicleTypeId',
        as: 'type',
      });
      Vehicle.hasMany(models.Booking, {
        foreignKey: 'vehicleId',
        as: 'bookings',
      });
    };
  
    return Vehicle;
  };  