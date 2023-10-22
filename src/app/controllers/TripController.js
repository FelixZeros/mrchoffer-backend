import TripRepository from "../../infrastructure/Repositories/TripRepository.js";

const tripRepository = new TripRepository();
const trips = [];
let io;

export const requestTrip = async (req, res) => {
  const { body } = req;
  try {
    io = req.app.get("io");
    const trip = await tripRepository.requestTrip(body);

    if (trip) {
      trips.push(trip);
      io.emit("server:request-trip", trips);
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptTrip = async (trip) => {
  try {
    const tripAccepted = await tripRepository.acceptTrip(trip);

    if (tripAccepted) {
      try {
        const getTrip = trips.find((t) => t.id === trip.id);
        fetch("http://localhost:7000/enviarMensaje", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: `57${getTrip.phoneNumber}`,
            driverName: trip.driverName,
            time: trip.time,
            distance: trip.distance,
          }),
        });
      } catch (error) {
        console.log(error);
      }

      trips.pop(trip);
      io.emit("server:request-trip", trips);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getTrips = async (req, res) => {
  try {
    const trips = await tripRepository.getTrips();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
