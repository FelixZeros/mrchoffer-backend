import { DriverCompany } from "../models/DriverCompany.js";
import { RequestDriverCompany } from "../models/RequestDriverCompany.js";
import DriverCompanyRepository from "../../domain/User/DriverCompanyRepository.js";
import { Company } from "../models/Company.js";
import { Driver } from "../models/Driver.js";
import { Trip } from "../models/Trip.js";
import { Balance } from "../models/Balance.js";
import { BalanceCompany } from "../models/BalanceCompany.js";

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
          {
            model: Driver,
            as: "driver",
          },
        ],
      });
    } catch (error) {
      throw new Error("Error when search companys" + error);
    }
  }
  async getRequestByDriverId(data) {
    try {
      const response = await RequestDriverCompany.findAll({
        where: { driverId: data.driverId },
        include: [
          {
            model: Company,
            as: "company",
          },
          {
            model: Driver,
            as: "driver",
          },
        ],
      });

      const getTripsByDriverIdAndStatus = await Trip.findAll({
        where: { driverId: data.driverId, status: 3 },
      });

      response.forEach((element) => {
        element.dataValues.trips = getTripsByDriverIdAndStatus;
      });

      return response;
    } catch (error) {
      throw new Error("Error when search companys" + error);
    }
  }
  async createRequest(request) {
    try {
      const existRequest = await RequestDriverCompany.findOne({
        where: {
          companyId: request.companyId,
          driverId: request.driverId,
        },
      });

      if (existRequest) {
        throw new Error("Error when create company");
      }

      return await RequestDriverCompany.create(request);
    } catch (error) {
      throw new Error("Error when create company" + error);
    }
  }
  async putRequest(data) {
    try {
      if (data.response === true) {
        if (data.status === 2) {
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
        if (data.status === 5) {
          await RequestDriverCompany.update(
            { status: data.status, comment: data.comment },
            { where: { id: data.id } }
          );
          return await DriverCompany.update(
            { status: 5 },
            { where: { companyId: data.companyId, driverId: data.driverId } }
          );
        }
        if (data.status === 4) {
          await RequestDriverCompany.update(
            { status: data.status, comment: data.comment },
            { where: { id: data.id } }
          );
          return await DriverCompany.update(
            { status: 4 },
            { where: { companyId: data.companyId, driverId: data.driverId } }
          );
        }
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
  async asignAmountDriverCompany(data) {
    try {
      const getDriverCompany = await DriverCompany.findOne({
        where: { companyId: data.companyId, driverId: data.driverId },
      });

      const getSumBalanceCompany = await BalanceCompany.sum("amount", {
        where: { companyId: data.companyId },
      });

      if (
        getSumBalanceCompany &&
        getSumBalanceCompany > 0 &&
        getSumBalanceCompany >= data.amount
      ) {
        await BalanceCompany.create({
          companyId: data.companyId,
          amount: data.amount * -1,
          status: "Completada",
          type: "Recarga",
          active: true,
          paymentMethod: "Efectivo",
          dateStart: data.dateStart,
        });
        return await Balance.create({
          companyId: data.companyId,
          idDriverCompany: getDriverCompany.id,
          amount: data.amount,
        });
      } else {
        throw new Error("Error when asign amount driver company");
      }
    } catch (error) {
      throw new Error("Error when asign amount driver company" + error);
    }
  }

  async getBalanceDriverCompany(data) {
    try {
      const getDriverCompany = await DriverCompany.findOne({
        where: { companyId: data.companyId, driverId: data.driverId },
      });

      const getBalance = await Balance.findAll({
        where: { idDriverCompany: getDriverCompany.id },
      });

      const getSumBalance = await Balance.sum("amount", {
        where: { idDriverCompany: getDriverCompany.id },
      });

      return { getBalance, amountTotal: getSumBalance };
    } catch (error) {
      throw new Error("Error when search balance driver company" + error);
    }
  }
}
