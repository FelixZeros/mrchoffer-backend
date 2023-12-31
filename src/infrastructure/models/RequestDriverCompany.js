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

Driver.hasMany(RequestDriverCompany, { foreignKey: "driverId" });
RequestDriverCompany.belongsTo(Driver, { foreignKey: "driverId" });

Company.hasOne(RequestDriverCompany, { foreignKey: "companyId" });
RequestDriverCompany.belongsTo(Company, { foreignKey: "companyId" });
