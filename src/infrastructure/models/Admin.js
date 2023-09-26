import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import { User } from "./User.js";

export const Admin = sequelize.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  photo: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

User.hasOne(Admin, { foreignKey: "userId" });
Admin.belongsTo(User, { foreignKey: "userId" });
