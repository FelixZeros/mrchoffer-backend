import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Driver } from "./Driver.js";

export const Balance = sequelize.define("balance", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idDriverCompany: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  handlingFee: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  paymentMethod: {
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

Balance.belongsTo(Driver, {
  foreignKey: "driverId",
  sourceKey: "id",
});
Driver.hasMany(Balance, {
  foreignKey: "driverId",
  sourceKey: "id",
});
