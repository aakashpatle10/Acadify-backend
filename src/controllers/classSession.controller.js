import { ClassSessionService } from "../services/classSession.service.js";

export class ClassSessionController {

  static async create(req, res, next) {
    try {
      const data = await ClassSessionService.create(req.body);

      res.status(201).json({
        success: true,
        data
      });

    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await ClassSessionService.getAll();

      res.status(200).json({
        success: true,
        data
      });

    } catch (err) {
      next(err);
    }
  }

}