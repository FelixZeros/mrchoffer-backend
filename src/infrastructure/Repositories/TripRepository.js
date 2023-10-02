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
}
