import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { loginValidator, resetPasswordValidator, createSubAdminValidator } from '../middlewares/validators/admin.validator.js';

const router = express.Router();

router.post('/register', createSubAdminValidator, adminController.register);
router.post('/login', loginValidator, adminController.login);
router.post('/reset-password', resetPasswordValidator, adminController.resetPassword);
router.post('/refresh-token', adminController.refreshToken);

router.post('/logout', authMiddleware, adminController.logout);
router.get('/profile', authMiddleware, adminController.getProfile);

router.post('/sub-admin', authMiddleware, createSubAdminValidator, adminController.createSubAdmin);
router.get('/sub-admins', authMiddleware, adminController.getAllSubAdmins);
router.put('/sub-admin/:id', authMiddleware, adminController.updateSubAdmin);
router.delete('/sub-admin/:id', authMiddleware, adminController.deleteSubAdmin);

export default router;
