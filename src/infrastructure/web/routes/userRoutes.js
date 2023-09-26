import { Router } from "express";
import { save } from "../../../app/controllers/UserController.js";

const router = Router();

router.post("/create-user", save);

export default router;
