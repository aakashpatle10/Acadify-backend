import Joi from "joi";
import { AppError } from "../../utils/errors.js";

const createTimetableSchema = Joi.object({
  classSessionId: Joi.string().required().messages({
    "string.empty": "classSessionId is required",
    "any.required": "classSessionId is required",
  }),
  teacherId: Joi.string().required().messages({
    "string.empty": "teacherId is required",
    "any.required": "teacherId is required",
  }),
  subject: Joi.string().trim().required().messages({
    "string.empty": "Subject is required",
    "any.required": "Subject is required",  
  }),
  day: Joi.string().trim().required().messages({
    "string.empty": "Day is required",
    "any.required": "Day is required",
  }),
  startTime: Joi.string().trim().required().messages({
    "string.empty": "Start time is required",
    "any.required": "Start time is required",
  }),
  endTime: Joi.string().trim().required().messages({
    "string.empty": "End time is required",
    "any.required": "End time is required",
  }),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(
      new AppError(
        error.details.map((d) => d.message).join(", "),
        400
      )
    );
  }
  next();
};

export const createTimetableValidator = validate(createTimetableSchema);
