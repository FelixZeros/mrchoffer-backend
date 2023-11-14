import { Router } from "express";
import {
  getCompanys,
  getCompanyByUsername,
} from "../../../app/controllers/CompanyController.js";

const router = Router();

router.get("/get-companys", getCompanys);
router.get("/get-companys/:username", getCompanyByUsername);

export default router;
