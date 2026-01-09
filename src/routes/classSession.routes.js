import express from "express";
import { ClassSessionController } from "../controllers/classSession.controller.js";
import { createClassSessionValidator } from "../middlewares/validators/classSession.validation.js";

const router = express.Router();


router.post("/", createClassSessionValidator, ClassSessionController.create);

router.get("/", ClassSessionController.getAll);

export default router;
