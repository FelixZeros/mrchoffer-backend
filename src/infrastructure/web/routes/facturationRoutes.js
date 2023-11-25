import { Router } from "express";
import { getFacturations } from "../../../app/controllers/FacturationController.js";

const router = Router();

router.get("/get-facturations", getFacturations);

export default router;
