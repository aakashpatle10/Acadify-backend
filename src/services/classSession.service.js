import { MongoClassSessionRepository } from "../repositories/implementations/MongoClassSessionRepository.js";
import { AppError } from "../utils/errors.js";

const repo = new MongoClassSessionRepository();

export class ClassSessionService {

  static async create(payload) {

    // optional duplicate check (same class + sem + section)
    const existing = await repo.findAll();

    const alreadyExists = existing.some(
      c =>
        c.name === payload.name &&
        c.semester === payload.semester &&
        c.section === payload.section
    );

    if (alreadyExists) {
      throw new AppError("Class already exists for this section", 409);
    }

    return await repo.create(payload);
  }

  static async getAll() {
    return await repo.findAll();
  }

}