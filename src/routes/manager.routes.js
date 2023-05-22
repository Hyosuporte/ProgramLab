import { Router } from "express";
import {
  getManager,
  createManager,
  updateManager,
  deleteManager,
} from "../controllers/manager.controllers.js";

const router = Router();

router.get("/", getManager);
router.post("/", createManager);
router.patch("/:id", updateManager);
router.delete("/:id", deleteManager);

export default router;