// websocket.js

import { Server } from "socket.io";
import { createServer } from "http";

// Configuración de WebSockets
const configureWebSockets = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente WebSocket conectado");

    socket.on("new-trip-request", (trip) => {
      console.log("Solicitud de viaje recibida", trip);
      io.emit("new-trip-request", trip);
      console.log("Solicitud de viaje enviada a todos los clientes");
    });
    // Agrega aquí la lógica para manejar eventos WebSocket específicos
  });

  return httpServer;
};

export default configureWebSockets;
