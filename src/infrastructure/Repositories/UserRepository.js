import UserRepository from "../../domain/User/UserRepository.js";
import { User } from "../models/User.js";
import { Company } from "../models/Company.js";
import { Admin } from "../models/Admin.js";
import { Driver } from "../models/Driver.js";
import { Vehicle } from "../models/Vehicle.js";

export default class UserRepositoryImplements extends UserRepository {
  async findByEmail({ email }) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error("Error when searching for user by email" + error);
    }
  }
  async login({ email, password }) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }
      if (user.password !== password) {
        throw new Error("Incorrect password");
      } else {
        const company = await Company.findOne({ where: { userId: user.id } });
        const admin = await Admin.findOne({ where: { userId: user.id } });
        const driver = await Driver.findOne({ where: { userId: user.id } });
        if (company) {
          return { type: "company", company };
        }
        if (admin) {
          return { type: "admin", admin };
        }
        if (driver) {
          return { type: "driver", driver };
        }
      }
    } catch (error) {
      throw new Error("Error logging in");
    }
  }

  async save(data) {
    try {
      const { email, type } = data;
      if (type === "company") {
        if (await this.findByEmail({ email })) {
          throw new Error("The email already exists");
        } else {
          const user = await User.create({
            email,
            password: data.password,
          });

          if (user) {
            const company = await Company.create({
              name: data.name,
              address: data.address,
              city: data.city,
              phone: data.phone,
              photo: data.photo,
              userId: user.id,
            });
            return { type, company };
          }
        }
      }
      if (type === "admin") {
        if (await this.findByEmail({ email })) {
          throw new Error("The email already exists");
        } else {
          const user = await User.create({
            email,
            password: data.password,
          });

          if (user) {
            const admin = await Admin.create({
              name: data.name,
              photo: data.photo,
              userId: user.id,
            });
            return { type, admin };
          }
        }
      }
      if (type === "driver") {
        if (await this.findByEmail({ email })) {
          throw new Error("The email already exists");
        } else {
          const user = await User.create({
            email,
            password: data.password,
          });

          if (user) {
            const driver = await Driver.create({
              identification: data.identification,
              name: data.name,
              gender: data.phone,
              city: data.city,
              photoDriverLicenseFront: data.photoDriverLicenseFront,
              photoDriverLicenseBack: data.photoDriverLicenseBack,
              photoIdentificationBack: data.photoIdentificationBack,
              photoIdentificationFront: data.photoIdentificationFront,
              status: 1,
              phone: data.phone,
              userId: user.id,
            });
            if (driver) {
              const vehicle = await Vehicle.create({
                numberPropertyCard: data.numberPropertyCard,
                brand: data.brand,
                model: data.model,
                typeVehicle: data.typeVehicle,
                color: data.color,
                cc: data.cc,
                photoPropertyCardFront: data.photoPropertyCardFront,
                photoPropertyCardBack: data.photoPropertyCardBack,
                line: data.line,
                status: 1,
                driverId: driver.id,
              });
            }

            return { type, driver };
          }
        }
      }
    } catch (error) {
      throw new Error("Error saving user" + error);
    }
  }
}
