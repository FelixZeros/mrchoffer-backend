import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Driver } from "./Driver.js";
import { Company } from "./Company.js";

export const RequestDriverCompany = sequelize.define("request_driver_company", {
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
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
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

RequestDriverCompany.belongsTo(Driver, { foreignKey: "driverId" });
RequestDriverCompany.belongsTo(Company, { foreignKey: "companyId" });
Driver.hasMany(RequestDriverCompany, { foreignKey: "driverId" });
Company.hasMany(RequestDriverCompany, { foreignKey: "companyId" });
