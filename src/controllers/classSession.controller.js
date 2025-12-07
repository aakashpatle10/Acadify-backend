// src/controllers/classSession.controller.js
import { ClassSessionService } from "../services/classSession.service.js";

export class ClassSessionController {
  // POST /api/class-sessions
  static async create(req, res, next) {
    try {
      const result = await ClassSessionService.createClassSession(req.body);

      return res.status(201).json({
        success: true,
        message: "Class session created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  // GET /api/class-sessions
  static async getAll(req, res, next) {
    try {
      const sessions = await ClassSessionService.getAllClassSessions();

      return res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (err) {
      next(err);
    }
  }
}
