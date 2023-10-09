// websocket.js

import { Server } from "socket.io";
import { createServer } from "http";

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

    socket.on("server:request-trip", (trip) => {
      console.log("Solicitud de viaje recibida", trip);
      socket.emit("server:request-trip", { coords: 1232131232 });
      console.log("Solicitud de viaje enviada a todos los clientes");
    });
  });
  app.set("io", io);

  return httpServer;
};

export default configureWebSockets;
