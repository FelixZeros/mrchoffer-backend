import { Company } from "../models/Company.js";
import CompanyRepository from "../../domain/User/CompanyRepository.js";

export default class CompanyRepositoryImplements extends CompanyRepository {
  async getCompany() {
    try {
      return await Company.findAll();
    } catch (error) {
      throw new Error("Error when search companys" + error);
    }
  }
  async getCompanyByUsername(username) {
    try {
      return await Company.findOne({ where: { username: username } });
    } catch (error) {
      throw new Error("Error when search company by id" + error);
    }
  }
}
