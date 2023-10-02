import { Router } from "express";
import { getCompanys } from "../../../app/controllers/CompanyController.js";

const router = Router();

router.get("/get-companys", getCompanys);

export default router;
