import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Driver } from "./Driver.js";
import { Company } from "./Company.js";

export const Trip = sequelize.define("trip", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idFront: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  textOrigin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitudeOrigin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitudeOrigin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  textDestination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitudeDestination: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitudeDestination: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  distance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  amountMale: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amountFemale: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: true,
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

Trip.belongsTo(Driver, { foreignKey: "driverId" });
Trip.belongsTo(Company, { foreignKey: "companyId" });
Driver.hasMany(Trip, { foreignKey: "driverId" });
