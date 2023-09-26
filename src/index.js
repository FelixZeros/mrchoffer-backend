import express from "express";
import { sequelize } from "./infrastructure/sequelize.js";
import authRoutes from "./infrastructure/web/routes/authRoutes.js";
import userRoutes from "./infrastructure/web/routes/userRoutes.js";
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
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use("/api", authRoutes, userRoutes);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(process.env.APP_PORT, () => {
    console.log("Server running on port", process.env.APP_PORT);
  });
}

main();
