import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

export const Vehicle = sequelize.define("vehicle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numberPropertyCard: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeVehicle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoPropertyCardFront: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoPropertyCardBack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  line: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
