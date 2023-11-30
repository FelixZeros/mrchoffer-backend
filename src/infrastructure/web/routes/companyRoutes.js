import { Router } from "express";
import {
  getCompanys,
  getCompanyByUsername,
  asignBalanceCompany,
  getBalanceCompany,
  asingFeeCompany,
} from "../../../app/controllers/CompanyController.js";

const router = Router();

router.get("/get-companys", getCompanys);
router.get("/get-companys/:username", getCompanyByUsername);
router.post("/asign-balance-company/:companyId", asignBalanceCompany);
router.get("/get-balance-company/:companyId", getBalanceCompany);
router.put("/asing-fee-company/:companyId", asingFeeCompany);

export default router;
