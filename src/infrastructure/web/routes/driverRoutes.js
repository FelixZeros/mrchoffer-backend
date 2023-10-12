import { Router } from "express";
import { getDriverById } from "../../../app/controllers/DriverController.js";

const router = Router();

router.get("/drivers/:id", getDriverById);

export default router;
