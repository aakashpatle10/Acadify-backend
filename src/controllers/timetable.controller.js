import { TimetableService } from "../services/timetable.service.js";
import { AppError } from "../utils/errors.js";

export class TimetableController {
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

  static async getMyTimetables(req, res, next) {
    try {
      const teacherId = req.user?.id; 

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
