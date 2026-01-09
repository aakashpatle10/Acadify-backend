import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import studentRoutes from './routes/student.routes.js';
import adminRoutes from './routes/admin.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import timetableRoutes from './routes/timetable.routes.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import { corsOptions } from './config/corsOptions.js'; 
import qrRoutes from "./routes/qr.routes.js";
import classSessionRoutes from "./routes/classSession.routes.js";
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/timetable', timetableRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/classSession", classSessionRoutes);


app.use(errorHandler);

export default app;