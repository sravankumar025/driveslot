module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Vehicles',
          key: 'id',
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    });
  
    Booking.associate = (models) => {
      Booking.belongsTo(models.Vehicle, {
        foreignKey: 'vehicleId',
        as: 'vehicle',
      });
    };
  
    return Booking;
  };  