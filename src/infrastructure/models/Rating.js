import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Driver } from "./Driver.js";

export const Rating = sequelize.define("rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  comment: {
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

Rating.belongsTo(Driver, { foreignKey: "driverId" });
Driver.hasMany(Rating, { foreignKey: "driverId" });
