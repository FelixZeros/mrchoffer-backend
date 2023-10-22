// websocket.js

import { Server } from "socket.io";
import { createServer } from "http";
import { acceptTrip } from "./app/controllers/TripController.js";

// Configuración de WebSockets
const configureWebSockets = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente WebSocket conectado");

    socket.on("client:accept-trip", (info) => {
      console.log("Cliente WebSocket envió información:");
      acceptTrip(info);
    });
  });

  app.set("io", io);

  return httpServer;
};

export default configureWebSockets;
