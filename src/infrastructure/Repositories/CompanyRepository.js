import { Company } from "../models/Company.js";
import { BalanceCompany } from "../models/BalanceCompany.js";
import CompanyRepository from "../../domain/User/CompanyRepository.js";
import { User } from "../models/User.js";
import { DriverCompany } from "../models/DriverCompany.js";

export default class CompanyRepositoryImplements extends CompanyRepository {
  async getCompany() {
    try {
      return await Company.findAll({
        include: [
          {
            model: BalanceCompany,
            as: "balance_companies",
            foreignKey: "companyId",
          },
        ],
      });
    } catch (error) {
      throw new Error("Error when search companys" + error);
    }
  }
  async getCompanyByUsername(username) {
    try {
      const res = await Company.findOne({
        where: { username: username },
        include: [
          {
            model: BalanceCompany,
            as: "balance_companies",
            foreignKey: "companyId",
          },
          {
            model: User,
            as: "user",
          },
          {
            model: DriverCompany,
            as: "driver_companies",
            foreignKey: "companyId",
          },
        ],
      });

      const companyWithoutPassword = {
        ...res.dataValues,
        user: {
          ...res.dataValues.user.dataValues,
          password: undefined,
        },
      };
      return companyWithoutPassword;
    } catch (error) {
      throw new Error("Error when search company by id" + error);
    }
  }
  async asignBalanceCompany(companyId, infoBalanceCompany) {
    const dateStart = new Date().toLocaleDateString();
    try {
      return await BalanceCompany.create({
        companyId: companyId,
        type: infoBalanceCompany.type,
        amount: infoBalanceCompany.amount,
        typeVehicle: infoBalanceCompany.typeVehicle ?? null,
        amountVehicle: infoBalanceCompany.amountVehicle ?? null,
        paymentMethod: infoBalanceCompany.paymentMethod,
        reference: infoBalanceCompany.reference,
        active: false,
        daysRecharge: infoBalanceCompany.daysRecharge ?? null,
        dateStart: dateStart,
      });
    } catch (error) {
      throw new Error("Error when assigning balance to company" + error);
    }
  }
}
