import { MongoTimetableRepository } from "../repositories/implementations/MongoTimetableRepository.js";
import { AppError } from "../utils/errors.js";

const timetableRepo = new MongoTimetableRepository();

export class TimetableService {
  static async createTimetable(payload) {
    return await timetableRepo.create(payload);
  }

  static async getByTeacher(teacherId) {
    if (!teacherId) {
      throw new AppError("Teacher id is required", 400);
    }
    return await timetableRepo.findByTeacherId(teacherId);
  }

  static async getByClassSession(classSessionId) {
    if (!classSessionId) {
      throw new AppError("ClassSession id is required", 400);
    }
    return await timetableRepo.findByClassSessionId(classSessionId);
  }

  static async getById(id) {
    const tt = await timetableRepo.findById(id);
    if (!tt) {
      throw new AppError("Timetable not found", 404);
    }
    return tt;
  }
}
