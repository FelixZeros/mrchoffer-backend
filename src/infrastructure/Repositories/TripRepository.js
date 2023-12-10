import { Trip } from "../models/Trip.js";
import { Driver } from "../models/Driver.js";
import { Vehicle } from "../models/Vehicle.js";
import TripRepository from "../../domain/User/TripRepository.js";

export default class TripRepositoryImplements extends TripRepository {
  async requestTrip(trip) {
    try {
      const tripCreated = await Trip.create(trip);
      return tripCreated;
    } catch (error) {
      throw new Error("Error when create trip" + error);
    }
  }

  async cancelTrip(trip) {
    try {
      if (trip.cancelBy === 1) {
        const tripCanceled = await Trip.update(
          { status: 4, comment: trip.comment },
          { where: { idFront: trip.id } }
        );
        return tripCanceled;
      }
      if (trip.cancelBy === 2) {
        const tripCanceled = await Trip.update(
          { status: 5, comment: trip.comment },
          { where: { idFront: trip.id } }
        );
        return tripCanceled;
      }
    } catch (error) {
      throw new Error("Error when cancel trip" + error);
    }
  }

  async getTripById(id) {
    try {
      const trip = await Trip.findOne({
        where: { id },
        include: {
          model: Driver,
          as: "driver",
        },
      });
      const getVehicle = await Vehicle.findOne({
        where: { driverId: trip.dataValues.driverId },
      });
      const newTrip = {
        ...trip.dataValues,
        vehicle: getVehicle,
      };
      return newTrip;
    } catch (error) {
      throw new Error("Error when get trip by id" + error);
    }
  }

  async acceptTrip(trip, driver) {
    try {
      const tripAccepted = await Trip.update(
        { driverId: driver.driverId, status: 2 },
        { where: { id: trip.dataValues.id } }
      );
      return tripAccepted;
    } catch (error) {
      throw new Error("Error when accept trip" + error);
    }
  }
  async getTrips() {
    try {
      const trips = await Trip.findAll({
        include: [
          {
            model: Driver,
            as: "driver",
          },
        ],
      });
      return trips;
    } catch (error) {
      throw new Error("Error when get trips" + error);
    }
  }
  async finishTrip(trip) {
    try {
      const tripFinished = await Trip.update(
        {
          status: 3,
          endTime: new Date().toLocaleTimeString(),
        },
        { where: { idFront: trip.id } }
      );
      return tripFinished;
    } catch (error) {
      throw new Error("Error when finish trip" + error);
    }
  }
  async getTripsByDriverInCompany(driver, company) {
    try {
      const trips = await Trip.findAll({
        where: { driverId: driver, companyId: company, status: 3 },
      });

      const setHandlingFee = trips.map((trip) => {
        trip.dataValues.handlingFee = trip.dataValues.price * 0.1;
        return trip;
      });

      const getSumAmountTrips = await Trip.sum("price", {
        where: { driverId: driver, companyId: company, status: 3 },
      });

      return {
        trips: setHandlingFee,
        amountTotal: getSumAmountTrips,
        handlingFee: getSumAmountTrips * 0.1,
      };
    } catch (error) {
      throw new Error("Error when get trips driver today" + error);
    }
  }
  async getTripByIdFront(id) {
    try {
      const trip = await Trip.findOne({
        where: { idFront: id },
        include: {
          model: Driver,
          as: "driver",
        },
      });
      const getVehicle = await Vehicle.findOne({
        where: { driverId: trip.dataValues.driverId },
      });
      const newTrip = {
        ...trip.dataValues,
        vehicle: getVehicle,
      };
      return newTrip;
    } catch (error) {
      throw new Error("Error when get trip by id" + error);
    }
  }
}
