// src/controllers/timetable.controller.js
import { TimetableService } from "../services/timetable.service.js";
import { AppError } from "../utils/errors.js";

export class TimetableController {
  // POST /api/timetables
  static async create(req, res, next) {
    try {
      const result = await TimetableService.createTimetable(req.body);

      return res.status(201).json({
        success: true,
        message: "Timetable entry created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/timetables/teacher/:teacherId  (public / for testing)
  static async getByTeacher(req, res, next) {
    try {
      const { teacherId } = req.params;

      const data = await TimetableService.getByTeacher(teacherId);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/timetables/my  (logged-in teacher ke liye)
  static async getMyTimetables(req, res, next) {
    try {
      const teacherId = req.user?.id; // authMiddleware se

      if (!teacherId) {
        return next(new AppError("User not authenticated", 401));
      }

      const data = await TimetableService.getByTeacher(teacherId);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/timetables/class/:classSessionId
  static async getByClassSession(req, res, next) {
    try {
      const { classSessionId } = req.params;

      const data = await TimetableService.getByClassSession(classSessionId);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}
