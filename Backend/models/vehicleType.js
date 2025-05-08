module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    name: DataTypes.STRING,
    wheels: DataTypes.INTEGER,
  });
  return VehicleType;
};
