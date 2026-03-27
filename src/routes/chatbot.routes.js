import express from "express";
import { chatController } from "../controllers/chatbot.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, chatController);

export default router;