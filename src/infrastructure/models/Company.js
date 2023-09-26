import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Balance } from "./Balance.js";

export const Company = sequelize.define("company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
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

Balance.belongsTo(Company, { foreignKey: "companyId", sourceKey: "id" });
Company.hasMany(Balance, { foreignKey: "companyId", sourceKey: "id" });
