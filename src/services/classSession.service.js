import { MongoClassSessionRepository } from "../repositories/implementations/MongoClassSessionRepository.js";
import { AppError } from "../utils/errors.js";

const classSessionRepo = new MongoClassSessionRepository();

export class ClassSessionService {
  static async createClassSession(payload) {
    console.log(payload);
    
    const existing = await classSessionRepo.findAll();
    if (existing.some((c) => c.name === payload.name)) {
      throw new AppError("Class with this name already exists", 409);
    }
    return await classSessionRepo.create(payload);
  }

  static async getAllClassSessions() {
    return await classSessionRepo.findAll();
  }
}
