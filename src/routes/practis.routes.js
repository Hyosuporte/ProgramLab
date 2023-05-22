import { Router } from "express";
import { createPractis } from "../controllers/practis.controllers.js";

const router = Router();

router.post("/", createPractis);

export default router;
