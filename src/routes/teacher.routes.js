import express from 'express';
import teacherController from '../controllers/teacher.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { loginValidator, createTeacherValidator } from '../middlewares/validators/teacher.validator.js';

const router = express.Router();

router.post('/register', createTeacherValidator, teacherController.register);
router.post('/login', loginValidator, teacherController.login);

router.get('/profile', authMiddleware, teacherController.getProfile);

router.post('/', authMiddleware, createTeacherValidator, teacherController.createTeacher);
router.get('/', authMiddleware, teacherController.getAllTeachers);
router.put('/:id', authMiddleware, teacherController.updateTeacher);
router.delete('/:id', authMiddleware, teacherController.deleteTeacher);

export default router;
