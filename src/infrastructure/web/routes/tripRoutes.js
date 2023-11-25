import { Router } from "express";
import {
  getTrips,
  getTripById,
  getTripsByDriverInCompany,
} from "../../../app/controllers/TripController.js";

const router = Router();

router.get("/get-trips", getTrips);
router.get("/get-trip/:id", getTripById);
router.get(
  "/get-trips-by-driver-in-company/:driverId/:companyId",
  getTripsByDriverInCompany
);
export default router;
