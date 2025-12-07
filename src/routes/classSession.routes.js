// src/routes/classSession.routes.js
import express from "express";
import { ClassSessionController } from "../controllers/classSession.controller.js";
import { createClassSessionValidator } from "../middlewares/validators/classSession.validation.js";
// optional auth:
// import { authMiddleware, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST /api/class-sessions
// sirf admin ko allow karna ho to:
// router.post("/", authMiddleware, requireRole("admin"), createClassSessionValidator, ClassSessionController.create);

router.post("/", createClassSessionValidator, ClassSessionController.create);

// GET /api/class-sessions
router.get("/", ClassSessionController.getAll);

export default router;
