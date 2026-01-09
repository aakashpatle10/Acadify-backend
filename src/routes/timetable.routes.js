import express from "express";
import { TimetableController } from "../controllers/timetable.controller.js";
import { createTimetableValidator } from "../middlewares/validators/timetable.validation.js";
import { authMiddleware, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  createTimetableValidator,
  TimetableController.create
);

router.get("/teacher/:teacherId", TimetableController.getByTeacher);

router.get(
  "/my",
  authMiddleware,
  requireRole("teacher"),
  TimetableController.getMyTimetables
);

router.get("/class/:classSessionId", TimetableController.getByClassSession);

export default router;
