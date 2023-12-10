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
    try {
      fetch(`http://localhost:${process.env.BOT_PORT}/cancelarViaje`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver: `57${trip.phoneNumber}`,
        }),
      }).catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    await tripRepository.cancelTrip(trip);
  } catch (error) {
    console.log("error", error);
  }
};
export const requestTripNearestDriver = async (trip) => {
  try {
    if (trip !== null) {
      try {
        fetch(`http://localhost:${process.env.BOT_PORT}/solicitudCarrera`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: `57${trip.phoneNumber}`,
          }),
        }).catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
      return await trip;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const acceptTrip = async (info) => {
  try {
    const { trip, driver } = info;
    console.log("trip", trip, "driver", driver);
    const createTrip = await tripRepository.requestTrip(trip);
    const tripAccepted = await tripRepository.acceptTrip(createTrip, driver);

    if (tripAccepted) {
      try {
        fetch(`http://localhost:${process.env.BOT_PORT}/enviarMensaje`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: `57${trip.phoneNumber}`,
            id: trip.idFront,
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
    try {
      fetch(`http://localhost:${process.env.BOT_PORT}/finalizarViaje`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver: `57${trip.phoneNumber}`,
          idFront: trip.id,
        }),
      }).catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    await tripRepository.finishTrip(trip);
  } catch (error) {
    console.log("error", error);
  }
};

export const getTripsByDriverInCompany = async (req, res) => {
  try {
    const { driverId, companyId } = req.params;
    const trips = await tripRepository.getTripsByDriverInCompany(
      driverId,
      companyId
    );
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTripByIdFront = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await tripRepository.getTripByIdFront(id);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
