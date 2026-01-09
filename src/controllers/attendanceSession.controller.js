
import {asyncHandler} from '../utils/asyncHandler.js';
import AttendanceSessionService from '../services/attendanceSession.service.js';


export const startAttendanceSession = asyncHandler(async (req, res) => {
  const { classId, date } = req.body;

  const session =
    await AttendanceSessionService.startSession({ classId, date });

  res.status(201).json({
    success: true,
    message: 'Attendance session started successfully',
    data: session,
  });
});


export const endAttendanceSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  const session =
    await AttendanceSessionService.endSession(sessionId);

  res.status(200).json({
    success: true,
    message: 'Attendance session ended successfully',
    data: session,
  });
});
