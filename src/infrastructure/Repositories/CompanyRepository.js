import { Company } from "../models/Company.js";
import { BalanceCompany } from "../models/BalanceCompany.js";
import CompanyRepository from "../../domain/User/CompanyRepository.js";
import { User } from "../models/User.js";
import { DriverCompany } from "../models/DriverCompany.js";
import { Balance } from "../models/Balance.js";
import { Driver } from "../models/Driver.js";

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
        active: true,
        daysRecharge: infoBalanceCompany.daysRecharge ?? null,
        dateStart: dateStart,
      });
    } catch (error) {
      throw new Error("Error when assigning balance to company" + error);
    }
  }
  async getBalanceCompany(companyId) {
    try {
      const sumBalance = await Balance.sum("amount", {
        where: { companyId: companyId },
      });

      const getCompanyPercentage = await Company.findOne({
        where: { id: companyId },
      });

      const getBalance = await Balance.findAll({
        where: { companyId: companyId },
        include: [
          {
            model: Driver,
            as: "driver",
          },
        ],
      });

      return {
        balances: getBalance,
        balanceTotal: sumBalance,
        balance: sumBalance,
        handlingFee: getCompanyPercentage.percentage * 100,
      };
    } catch (error) {
      throw new Error("Error when search balance company" + error);
    }
  }

  async asingFeeCompany(companyId, minFee, maxFee) {
    try {
      return await Company.update(
        { minFee: minFee, maxFee: maxFee },
        { where: { id: companyId } }
      );
    } catch (error) {
      throw new Error("Error when assigning fee to company" + error);
    }
  }
}
