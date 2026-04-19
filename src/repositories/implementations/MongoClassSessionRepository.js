import ClassSession from "../../models/classSession.model.js";
import { IClassSessionRepository } from "../contracts/IClassSessionRepository.js";

export class MongoClassSessionRepository {
  async create(data) {
    return await ClassSession.create(data);
  }

  async findAll() {
    return await ClassSession.find().sort({ createdAt: -1 });
  }
}
