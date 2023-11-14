import { Router } from "express";
import {
  getTrips,
  getTripById,
} from "../../../app/controllers/TripController.js";

const router = Router();

router.get("/get-trips", getTrips);
router.get("/get-trip/:id", getTripById);
export default router;
