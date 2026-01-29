
import express from "express";
import { ClassSessionController } from "../controllers/classSession.controller.js";
import { createClassSessionValidator } from "../middlewares/validators/classSession.validation.js";
import {
    startAttendanceSession,
    endAttendanceSession,
} from '../controllers/attendanceSession.controller.js';

import {
    startAttendanceSessionValidator,
    endAttendanceSessionValidator,
} from '../middlewares/validators/attendanceSession.validation.js';





const router = express.Router();





router.post("/", createClassSessionValidator, ClassSessionController.create);


router.get("/", ClassSessionController.getAll);



router.post('/attendance/start', startAttendanceSessionValidator, startAttendanceSession);


router.post('/attendance/end', endAttendanceSessionValidator, endAttendanceSession);

export default router;
