
import AttendanceSession from '../../models/attendanceSession.model.js';
import IAttendanceSessionRepository from '../contracts/IAttendanceSessionRepository.js';

class MongoAttendanceSessionRepository extends IAttendanceSessionRepository {
  async createSession(data) {
    return AttendanceSession.create(data);
  }

  async findActiveSessionByClassAndDate(classId, date) {
    return AttendanceSession.findOne({
      classId,
      date,
      status: 'ACTIVE',
    });
  }

  async findById(sessionId) {
    return AttendanceSession.findById(sessionId);
  }

  async endSession(sessionId, endTime) {
    return AttendanceSession.findByIdAndUpdate(
      sessionId,
      {
        status: 'ENDED',
        endTime,
      },
      { new: true }
    );
  }
}

export default new MongoAttendanceSessionRepository();
