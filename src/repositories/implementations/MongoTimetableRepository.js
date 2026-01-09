import Timetable from "../../models/timetable.model.js";
import { ITimetableRepository } from "../contracts/ITimetableRepository.js";

export class MongoTimetableRepository extends ITimetableRepository {
  async create(data) {
    return await Timetable.create(data);
  }

  async findByTeacherId(teacherId) {
    return await Timetable.find({ teacherId })
      .populate("classSessionId")
      .sort({ day: 1, startTime: 1 });
  }

  async findByClassSessionId(classSessionId) {
    return await Timetable.find({ classSessionId })
      .populate("classSessionId")
      .populate("teacherId")
      .sort({ day: 1, startTime: 1 });
  }

  async findById(id) {
    return await Timetable.findById(id)
      .populate("classSessionId")
      .populate("teacherId");
  }
}
