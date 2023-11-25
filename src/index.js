import express from "express";
import { sequelize } from "./infrastructure/sequelize.js";
import authRoutes from "./infrastructure/web/routes/authRoutes.js";
import userRoutes from "./infrastructure/web/routes/userRoutes.js";
import companyRoutes from "./infrastructure/web/routes/companyRoutes.js";
import driverRoutes from "./infrastructure/web/routes/driverRoutes.js";
import requestDriverCompanyRoutes from "./infrastructure/web/routes/requestDriverCompanyRoutes.js";
import tripRoutes from "./infrastructure/web/routes/tripRoutes.js";
import facturationRoutes from "./infrastructure/web/routes/facturationRoutes.js";
import driverCompanyRoutes from "./infrastructure/web/routes/driverCompanyRoutes.js";
import configureWebSockets from "./websockets.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synchronized");
  } catch (error) {
    console.log("Error synchronizing database: ", error);
  }

  const app = new express();
  const httpServer = configureWebSockets(app);

  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(
    "/api",
    authRoutes,
    userRoutes,
    companyRoutes,
    driverRoutes,
    tripRoutes,
    requestDriverCompanyRoutes,
    facturationRoutes,
    driverCompanyRoutes
  );

  app.listen(process.env.APP_PORT, () => {
    console.log("Server running on port", process.env.APP_PORT);
  });

  httpServer.listen(process.env.APP_PORT + 1, () => {
    console.log(
      "Servidor con WebSocket en el puerto",
      process.env.APP_PORT + 1
    );
  });
}

main();
