import express from 'express';
import studentController from '../controllers/student.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { loginValidator, resetPasswordValidator, createStudentValidator } from '../middlewares/validators/student.validator.js';

const router = express.Router();

router.post('/register', createStudentValidator, studentController.register);
router.post('/login', loginValidator, studentController.login);
router.post('/reset-password', resetPasswordValidator, studentController.resetPassword);
router.post('/refresh-token', studentController.refreshToken);

router.post('/logout', authMiddleware, studentController.logout);
router.get('/profile', authMiddleware, studentController.getProfile);

router.post('/', authMiddleware, createStudentValidator, studentController.createStudent);
router.get('/', authMiddleware, studentController.getAllStudents);
router.put('/:id', authMiddleware, studentController.updateStudent);
router.delete('/:id', authMiddleware, studentController.deleteStudent);

export default router;
