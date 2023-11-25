import { Router } from "express";
import {
  asignAmountDriverCompany,
  getBalanceDriverCompany,
} from "../../../app/controllers/DriverCompanyController.js";

const router = Router();

router.post("/driverCompany/asignAmount", asignAmountDriverCompany);
router.post("/driverCompany/getBalance", getBalanceDriverCompany);

export default router;
