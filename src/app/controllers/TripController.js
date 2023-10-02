import TripRepository from "../../infrastructure/Repositories/TripRepository.js";

const tripRepository = new TripRepository();

export const requestTrip = async (req, res) => {
  const { body } = req;
  try {
    const trip = await tripRepository.requestTrip(body);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
