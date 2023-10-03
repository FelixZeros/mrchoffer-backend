import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Balance } from "./Balance.js";
import { Driver } from "./Driver.js";
import { Company } from "./Company.js";

export const DriverCompany = sequelize.define("driver_company", {
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

DriverCompany.hasMany(Balance, { foreignKey: "idDriverCompany" });
Balance.belongsTo(DriverCompany, { foreignKey: "idDriverCompany" });
DriverCompany.belongsTo(Driver, { foreignKey: "driverId" });
Driver.hasMany(DriverCompany, { foreignKey: "driverId" });
DriverCompany.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(DriverCompany, { foreignKey: "companyId" });
