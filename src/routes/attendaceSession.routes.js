
import express from 'express';
import {startAttendanceSession,endAttendanceSession, } from '../controllers/attendanceSession.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import {
  startAttendanceSessionValidator,
  endAttendanceSessionValidator,
} from '../middlewares/validators/attendanceSession.validation.js';
const router = express.Router();


router.post(
  '/attendance/start',
  authMiddleware,
  startAttendanceSessionValidator,
  startAttendanceSession
);


router.post(
  '/attendance/end',
  authMiddleware,
  endAttendanceSessionValidator,
  endAttendanceSession
);

export default router;
