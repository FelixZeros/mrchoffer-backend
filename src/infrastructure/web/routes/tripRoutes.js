import { Router } from "express";
import { requestTrip } from "../../../app/controllers/TripController.js";

const router = Router();

router.post("/request-trip", requestTrip);

export default router;
