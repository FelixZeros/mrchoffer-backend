import TripRepository from "../../infrastructure/Repositories/TripRepository.js";

const tripRepository = new TripRepository();

export const requestTrip = async (req, res) => {
  const { body } = req;
  try {
    const io = req.app.get("io");
    const trip = await tripRepository.requestTrip(body);

    if (trip) {
      io.emit("server:request-trip", trip);
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
