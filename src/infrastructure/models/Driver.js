import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { User } from "./User.js";
import { Vehicle } from "./Vehicle.js";

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
  identification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoDriverLicenseBack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoDriverLicenseFront: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoIdentificationBack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoIdentificationFront: {
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

Driver.belongsTo(User, { foreignKey: "userId" });
Driver.hasOne(Vehicle, { foreignKey: "driverId", as: "vehicle" });
Vehicle.belongsTo(Driver, { foreignKey: "driverId" });
