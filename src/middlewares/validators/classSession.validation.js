// src/middlewares/validators/classSession.validation.js
import Joi from "joi";
import { AppError } from "../../utils/errors.js";

const createClassSessionSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Class name is required",
    "any.required": "Class name is required",
  }),
  department: Joi.string().trim().optional(),
  year: Joi.number().integer().min(1).max(6).optional(),
  section: Joi.string().trim().optional(),
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

export const createClassSessionValidator = validate(createClassSessionSchema);
