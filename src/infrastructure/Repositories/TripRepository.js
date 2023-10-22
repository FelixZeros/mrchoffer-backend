import { Trip } from "../models/Trip.js";
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
  async acceptTrip(trip) {
    try {
      const tripAccepted = await Trip.update(
        { driverId: trip.driverId, status: 2 },
        { where: { id: trip.id } }
      );
      return tripAccepted;
    } catch (error) {
      throw new Error("Error when accept trip" + error);
    }
  }
  async getTrips() {
    try {
      const trips = await Trip.findAll();
      return trips;
    } catch (error) {
      throw new Error("Error when get trips" + error);
    }
  }
}
