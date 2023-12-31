import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Balance } from "./Balance.js";
import { BalanceCompany } from "./BalanceCompany.js";
import { User } from "./User.js";

export const Company = sequelize.define("company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typePerson: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeDocument: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  document: {
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
  minFee: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  maxFee: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  percentage: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: 0.3,
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
Company.belongsTo(User, { foreignKey: "userId", sourceKey: "id" });
BalanceCompany.belongsTo(Company, {
  foreignKey: "companyId",
  sourceKey: "id",
});
Company.hasMany(BalanceCompany, {
  foreignKey: "companyId",
  sourceKey: "id",
});
