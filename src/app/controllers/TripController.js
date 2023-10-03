import TripRepository from "../../infrastructure/Repositories/TripRepository.js";

const tripRepository = new TripRepository();

export const requestTrip = async (req, res) => {
  const { body } = req;
  try {
    const io = req.app.get("io");
    const trip = await tripRepository.requestTrip(body);

    // if (trip) {
    //   console.log("Solicitud de viaje recibida", trip);
    res.status(200).json(trip);
    //   io.emit("new-trip-request", {});
    // }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
