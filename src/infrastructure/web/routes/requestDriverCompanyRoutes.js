import { Router } from "express";
import {
  getRequest,
  getRequestByCompanyId,
  getRequestByDriverId,
  createRequest,
  putRequest,
  deleteRequest,
} from "../../../app/controllers/DriverCompanyController.js";

const router = Router();

router.get("/request-driver-company", getRequest);
router.get("/request-driver-company/:companyId", getRequestByCompanyId);
router.get("/request-driver-company/driver/:driverId", getRequestByDriverId);
router.post("/request-driver-company", createRequest);
router.put("/request-driver-company", putRequest);
router.delete("/request-driver-company", deleteRequest);

export default router;
