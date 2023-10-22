import { Router } from "express";
import {
  requestTrip,
  getTrips,
} from "../../../app/controllers/TripController.js";

const router = Router();

router.post("/request-trip", requestTrip);
router.get("/get-trips", getTrips);
export default router;
