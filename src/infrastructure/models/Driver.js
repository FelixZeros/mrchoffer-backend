import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { Vehicle } from "./Vehicle.js";
import { User } from "./User.js";
import { Balance } from "./Balance.js";
import { Company } from "./Company.js";

export const Driver = sequelize.define("driver", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  companyId: {
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
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoLicense: {
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

Driver.belongsTo(User, { foreignKey: "userId" });
Driver.belongsTo(Vehicle, { foreignKey: "vehicleId" });
Driver.hasMany(Balance, { foreignKey: "driverId" });
Balance.belongsTo(Driver, { foreignKey: "driverId", sourceKey: "id" });
Driver.belongsTo(Company, { foreignKey: "companyId", sourceKey: "id" });
Company.hasMany(Driver, { foreignKey: "companyId", sourceKey: "id" });
