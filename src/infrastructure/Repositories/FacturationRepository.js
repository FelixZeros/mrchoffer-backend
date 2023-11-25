import FacturationRepository from "../../domain/User/FacturationRepository.js";
import { BalanceCompany } from "../models/BalanceCompany.js";
import { Company } from "../models/Company.js";

export default class FacturationRepositoryImplements extends FacturationRepository {
  async getFacturation() {
    try {
      const getBalanceCompany = await BalanceCompany.findAll({
        include: [
          {
            model: Company,
            as: "company",
          },
        ],
        where: { active: true },
      });

      const getSumAmount = await BalanceCompany.sum("amount");
      const getSumWithActive = await BalanceCompany.sum("amount", {
        where: { active: true },
      });

      return {
        getBalanceCompany,
        amountTotalAdmin: getSumWithActive,
        amountTotalCompany: getSumAmount,
      };
    } catch (error) {
      throw new Error("Error when search facturation" + error);
    }
  }
}
