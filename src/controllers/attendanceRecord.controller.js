
import {asyncHandler} from '../utils/asyncHandler.js';
import AttendanceRecordService from '../services/attendanceRecord.service.js';


export const markAttendance = asyncHandler(async (req, res) => {
  const studentId = req.user.id; 
  const { classId, date } = req.body;

  const record =
    await AttendanceRecordService.markAttendance({
      studentId,
      classId,
      date,
    });

  res.status(201).json({
    success: true,
    message: 'Attendance marked successfully',
    data: record,
  });
});
