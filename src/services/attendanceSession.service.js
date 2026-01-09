
import MongoAttendanceSessionRepository from '../repositories/implementations/MongoAttendanceSessionRepository.js';
import { AppError } from '../utils/errors.js';

class AttendanceSessionService {
 
  async startSession({ classId, date }) {
    const activeSession =
      await MongoAttendanceSessionRepository.findActiveSessionByClassAndDate(
        classId,
        date
      );

    if (activeSession) {
      throw new AppError(
        'Attendance already started for this class',
        400
      );
    }

    const session =
      await MongoAttendanceSessionRepository.createSession({
        classId,
        date,
        startTime: new Date(),
        status: 'ACTIVE',
      });

    return session;
  }

  async getActiveSession(classId, date) {
    const session =
      await MongoAttendanceSessionRepository.findActiveSessionByClassAndDate(
        classId,
        date
      );

    if (!session) {
      throw new AppError('Attendance not started', 404);
    }

    if (session.status === 'ENDED') {
      throw new AppError('Attendance already closed', 400);
    }

    return session;
  }

  async endSession(sessionId) {
    const session =
      await MongoAttendanceSessionRepository.findById(sessionId);

    if (!session) {
      throw new AppError('Invalid attendance session', 404);
    }

    if (session.status === 'ENDED') {
      throw new AppError('Attendance already closed', 400);
    }

    return MongoAttendanceSessionRepository.endSession(
      sessionId,
      new Date()
    );
  }
}

export default new AttendanceSessionService();
