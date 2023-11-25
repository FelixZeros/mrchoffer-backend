import { Server } from "socket.io";
import { createServer } from "http";
import {
  requestTripAllDrivers,
  requestTripNearestDriver,
  acceptTrip,
  startTripDriverLocation,
  finishTrip,
  cancelTrip,
} from "./app/controllers/TripController.js";

const configureWebSockets = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado", socket.id);
    socket.on("client:request-trip", async (info) => {
      if (info.attempt === 1) {
        await requestTripNearestDriver(info).then((data) => {
          socket.broadcast.emit("server:receive-trip", data);
        });
      } // if (info.attempt === 2) requestTripAllDrivers(info);
    });

    socket.on("client:accept-trip", (info) => {
      console.log("Cliente WebSocket envió información:");
      acceptTrip(info);
    });

    socket.on("client:send-location", (info) => {
      const res = startTripDriverLocation(info);
      const sendData = { info, res };
      socket.broadcast.emit(
        `server:send-driver-location-${info?.tripinfo}`,
        sendData
      );
    });

    socket.on("client:arrived-trip", (info) => {
      console.log("Cliente WebSocket envió información:");
      socket.broadcast.emit(`server:arrived-trip-${info?.tripinfo}`, info);
    });

    socket.on("client:cancel-trip", (info) => {
      console.log("Cliente WebSocket envió información:");
      cancelTrip(info);
      console.log(info);
      socket.broadcast.emit(`server:cancel-trip-${info?.id}`, info);
    });

    socket.on("client:finish-trip", (info) => {
      console.log("Cliente WebSocket envió información:");
      finishTrip(info);
    });
  });

  return httpServer;
};

export default configureWebSockets;
