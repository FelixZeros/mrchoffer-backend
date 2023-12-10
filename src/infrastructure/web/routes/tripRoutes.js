import { Router } from "express";
import {
  getTrips,
  getTripById,
  getTripsByDriverInCompany,
  getTripByIdFront,
} from "../../../app/controllers/TripController.js";

const router = Router();

router.get("/get-trips", getTrips);
router.get("/get-trip/:id", getTripById);
router.get("/get-trip-byIdFront/:id", getTripByIdFront);
router.get(
  "/get-trips-by-driver-in-company/:driverId/:companyId",
  getTripsByDriverInCompany
);
export default router;
