import { Router } from "express";
import {
  getStudens,
  getStuden,
  createStuden,
  updateStuden,
  deleteStuden,
} from "../controllers/studens.controllers.js";

const router = Router();

router.get("/", getStudens);
router.get("/:id", getStuden);
router.post("/", createStuden);
router.patch("/:id", updateStuden);
router.delete("/:id", deleteStuden);

export default router;
