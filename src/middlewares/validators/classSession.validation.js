import Joi from "joi";
import { AppError } from "../../utils/errors.js";

const createClassSessionSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Class name is required",
    "any.required": "Class name is required",
  }),

  department: Joi.string().trim().optional(),

  years: Joi.number().integer().min(1).required().messages({
    "number.base": "Year must be a number",
    "any.required": "Year is required",
  }),

  semester: Joi.number().integer().min(1).required().messages({
    "number.base": "Semester must be a number",
    "any.required": "Semester is required",
  }),

  section: Joi.string().trim().required().messages({
    "string.empty": "Section is required",
    "any.required": "Section is required",
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

export const createClassSessionValidator = validate(createClassSessionSchema);