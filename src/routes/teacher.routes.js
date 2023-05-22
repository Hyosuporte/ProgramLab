import { Router } from "express";
import {
  getTeacher,
  createTeacher,
  updateTeacher,
} from "../controllers/teacher.controllers.js";

const router = Router();

router.get("/", getTeacher);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);

export default router;
