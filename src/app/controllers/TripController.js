import TripRepository from "../../infrastructure/Repositories/TripRepository.js";

const tripRepository = new TripRepository();
let io;

export const requestTripAllDrivers = async (trip) => {
  try {
  } catch (error) {
    console.log("error", error);
  }
};
export const cancelTrip = async (trip) => {
  try {
    await tripRepository.cancelTrip(trip);
  } catch (error) {
    console.log("error", error);
  }
};
export const requestTripNearestDriver = async (trip) => {
  try {
    if (trip !== null) {
      return await trip;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const acceptTrip = async (info) => {
  try {
    const { trip, driver } = info;
    const createTrip = await tripRepository.requestTrip(trip);
    const tripAccepted = await tripRepository.acceptTrip(createTrip, driver);

    if (tripAccepted) {
      try {
        fetch("http://localhost:7000/enviarMensaje", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: `57${trip.phoneNumber}`,
            id: driver.driverId,
            driverName: driver.driverName,
            time: driver.time,
            distance: trip.distance,
          }),
        }).catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
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

export const startTripDriverLocation = (data) => {
  try {
    const { driverLocation } = data;
    return driverLocation;
  } catch (error) {
    console.log("error", error);
  }
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await tripRepository.getTripById(id);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const finishTrip = async (trip) => {
  try {
    await tripRepository.finishTrip(trip);
  } catch (error) {
    console.log("error", error);
  }
};
