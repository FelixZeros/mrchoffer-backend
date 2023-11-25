import { Router } from "express";
import {
  getCompanys,
  getCompanyByUsername,
  asignBalanceCompany,
} from "../../../app/controllers/CompanyController.js";

const router = Router();

router.get("/get-companys", getCompanys);
router.get("/get-companys/:username", getCompanyByUsername);
router.post("/asign-balance-company/:companyId", asignBalanceCompany);

export default router;
