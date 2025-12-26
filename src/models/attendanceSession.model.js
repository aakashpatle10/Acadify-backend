// src/models/attendanceSession.model.js

import mongoose from 'mongoose';

const attendanceSessionSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
    },

    status: {
      type: String,
      enum: ['ACTIVE', 'ENDED'],
      default: 'ACTIVE',
    },

    qrRotationInterval: {
      type: Number, // seconds
      default: 5,
    },
  },
  { timestamps: true }
);

attendanceSessionSchema.index(
  { classId: 1, date: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: 'ACTIVE' } }
);

export default mongoose.model(
  'AttendanceSession',
  attendanceSessionSchema
);
