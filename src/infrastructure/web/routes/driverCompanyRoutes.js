import { Router } from "express";
import {
  asignAmountDriverCompany,
  getBalanceDriverCompany,
  getDriverByCompanyId,
} from "../../../app/controllers/DriverCompanyController.js";

const router = Router();

router.post("/driverCompany/asignAmount", asignAmountDriverCompany);
router.post("/driverCompany/getBalance", getBalanceDriverCompany);
router.get("/driverCompany/:companyId", getDriverByCompanyId);

export default router;
