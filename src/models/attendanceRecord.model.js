// src/models/attendanceRecord.model.js

import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AttendanceSession',
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    markedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


attendanceRecordSchema.index(
  { studentId: 1, classId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model(
  'AttendanceRecord',
  attendanceRecordSchema
);
