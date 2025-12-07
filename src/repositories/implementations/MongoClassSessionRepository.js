// src/repositories/implementations/MongoClassSessionRepository.js
import ClassSession from "../../models/classSession.model.js";
import { IClassSessionRepository } from "../contracts/IClassSessionRepository.js";

export class MongoClassSessionRepository extends IClassSessionRepository {
  async create(data) {
    return await ClassSession.create(data);
  }

  async findAll() {
    return await ClassSession.find().sort({ name: 1 });
  }

  async findById(id) {
    return await ClassSession.findById(id);
  }
}
