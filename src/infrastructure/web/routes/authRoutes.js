import { Router } from "express";
import { login } from "../../../app/controllers/AuthController.js";

const router = Router();

router.post("/auth", login);

export default router;
