
import Joi from 'joi';
import { AppError } from '../../utils/errors.js';

const markAttendanceSchema = Joi.object({
  classId: Joi.string().required().messages({
    'string.empty': 'classId is required',
    'any.required': 'classId is required',
  }),
  date: Joi.string().isoDate().required().messages({
    'string.empty': 'date is required',
    'date.format': 'Invalid date format',
  }),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(
      new AppError(
        error.details.map((d) => d.message).join(', '),
        400
      )
    );
  }
  next();
};

export const markAttendanceValidator =
  validate(markAttendanceSchema);
