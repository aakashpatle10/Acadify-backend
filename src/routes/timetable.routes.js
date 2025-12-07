// src/routes/timetable.routes.js
import express from "express";
import { TimetableController } from "../controllers/timetable.controller.js";
import { createTimetableValidator } from "../middlewares/validators/timetable.validation.js";
import { authMiddleware, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Timetable create – ideally only admin / HOD kare
// agar abhi role system simple hai, to sirf createTimetableValidator use karo
router.post(
  "/",
  // authMiddleware,
  // requireRole("admin"),
  createTimetableValidator,
  TimetableController.create
);

// Get by teacher (public/testing)
router.get("/teacher/:teacherId", TimetableController.getByTeacher);

// Logged-in teacher ke liye "my" lectures
router.get(
  "/my",
  authMiddleware,
  requireRole("teacher"),
  TimetableController.getMyTimetables
);

// Get by classSession (class-wise timetable)
router.get("/class/:classSessionId", TimetableController.getByClassSession);

export default router;
