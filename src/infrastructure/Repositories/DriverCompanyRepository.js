import { DriverCompany } from "../models/DriverCompany.js";
import { RequestDriverCompany } from "../models/RequestDriverCompany.js";
import DriverCompanyRepository from "../../domain/User/DriverCompanyRepository.js";
import { Company } from "../models/Company.js";

export default class DriverCompanyImplements extends DriverCompanyRepository {
  async getRequest() {
    try {
      return await RequestDriverCompany.findAll();
    } catch (error) {
      throw new Error("Error when search companys" + error);
    }
  }
  async getRequestByCompanyId(data) {
    try {
      return await RequestDriverCompany.findAll({
        where: { companyId: data.companyId },
        include: [
          {
            model: Company,
            as: "company",
          },
        ],
      });
    } catch (error) {
      throw new Error("Error when search companys" + error);
    }
  }
  async getRequestByDriverId(data) {
    try {
      return await RequestDriverCompany.findAll({
        where: { driverId: data.driverId },
      });
    } catch (error) {
      throw new Error("Error when search companys" + error);
    }
  }
  async createRequest(request) {
    try {
      return await RequestDriverCompany.create(request);
    } catch (error) {
      throw new Error("Error when create company" + error);
    }
  }
  async putRequest(data) {
    try {
      if (data.response === true) {
        await RequestDriverCompany.update(
          { status: data.status, comment: data.comment },
          { where: { id: data.id } }
        );
        return await DriverCompany.create({
          companyId: data.companyId,
          driverId: data.driverId,
          status: 1,
        });
      }
      if (data.response === false) {
        return await RequestDriverCompany.update(
          { status: data.status, comment: data.comment },
          { where: { id: data.id } }
        );
      }
    } catch (error) {
      throw new Error("Error when update company" + error);
    }
  }
  async deleteRequest(data) {
    try {
      return await RequestDriverCompany.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new Error("Error when delete company" + error);
    }
  }
}
