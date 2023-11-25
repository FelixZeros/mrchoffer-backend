import DriverRepository from "../../domain/User/DriverRepository.js";
import { Driver } from "../models/Driver.js";
import { Vehicle } from "../models/Vehicle.js";
import { Trip } from "../models/Trip.js";
import { DriverCompany } from "../models/DriverCompany.js";

export default class DriverRepositoryImplements extends DriverRepository {
  async getById(id) {
    try {
      return await Driver.findOne({
        where: { id },
        include: [
          {
            model: Vehicle,
            as: "vehicle",
          },
          {
            model: Trip,
            as: "trips",
          },
          {
            model: DriverCompany,
            as: "driver_companies",
          },
        ],
      });
    } catch (error) {
      throw new Error("Error when searching for driver by id" + error);
    }
  }
}
