
import AttendanceSessionService from './attendanceSession.service.js';
import MongoAttendanceRecordRepository from '../repositories/implementations/MongoAttendanceRecordRepository.js';
import {AppError} from '../utils/errors.js';

class AttendanceRecordService {
 
  async markAttendance({ studentId, classId, date }) {
    const session =
      await AttendanceSessionService.getActiveSession(classId, date);
    const alreadyMarked =
      await MongoAttendanceRecordRepository.findByStudentClassAndDate(
        studentId,
        classId,
        date
      );

    if (alreadyMarked) {
      throw new AppError('Attendance already marked', 409);
    }

    const record =
      await MongoAttendanceRecordRepository.createRecord({
        studentId,
        classId,
        sessionId: session._id,
        date,
        markedAt: new Date(),
      });

    return record;
  }
}

export default new AttendanceRecordService();
