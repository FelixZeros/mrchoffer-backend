import UserRepository from "../../domain/User/UserRepository.js";
import { User } from "../models/User.js";
import { Company } from "../models/Company.js";
import { Admin } from "../models/Admin.js";
import { Driver } from "../models/Driver.js";

export default class UserRepositoryImplements extends UserRepository {
  async findByEmail({ email }) {
    try {
      console.log(email);
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error("Error when searching for user by email" + error);
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
              name: data.name,
              photo: data.photo,
              photoLicense: data.photoLicense,
              status: data.status,
              address: data.address,
              phone: data.phone,
              gender: data.phone,
              city: data.city,
              companyId: data.companyId,
              userId: user.id,
            });
            return { type, driver };
          }
        }
      }
    } catch (error) {
      throw new Error("Error saving user" + error);
    }
  }
}
