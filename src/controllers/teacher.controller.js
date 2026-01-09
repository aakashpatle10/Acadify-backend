import TeacherService from '../services/teacher.service.js';
import { AppError } from '../utils/errors.js';

class TeacherController {
    constructor() {
        this.teacherService = new TeacherService();
    }

    register = async (req, res, next) => {
        try {
            const teacher = await this.teacherService.registerTeacher(req.body);

            res.status(201).json({
                success: true,
                message: 'Teacher registered successfully',
                data: teacher
            });
        } catch (error) {
            next(error);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const result = await this.teacherService.login(email, password);

            res.cookie('token', result.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 15 * 60 * 1000 
            });

            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });

            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    };

    createTeacher = async (req, res, next) => {
        try {
            const creatorId = req.userId;
            
            const teacher = await this.teacherService.createTeacher(req.body, creatorId);

            res.status(201).json({
                success: true,
                message: 'Teacher created successfully',
                data: teacher
            });
        } catch (error) {
            next(error);
        }
    };

    getAllTeachers = async (req, res, next) => {
        try {
            const teachers = await this.teacherService.getAllTeachers(req.query);

            res.status(200).json({
                success: true,
                data: teachers
            });
        } catch (error) {
            next(error);
        }
    };

    getProfile = async (req, res, next) => {
        try {
            const userId = req.userId;
            const profile = await this.teacherService.getProfile(userId);

            res.status(200).json({
                success: true,
                data: profile
            });
        } catch (error) {
            next(error);
        }
    };

    updateTeacher = async (req, res, next) => {
        try {
            const { id } = req.params;
            const teacher = await this.teacherService.updateTeacher(id, req.body);

            res.status(200).json({
                success: true,
                message: 'Teacher updated successfully',
                data: teacher
            });
        } catch (error) {
            next(error);
        }
    };

    deleteTeacher = async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await this.teacherService.deleteTeacher(id);

            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new TeacherController();
