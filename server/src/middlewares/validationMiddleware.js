import { validationResult } from 'express-validator';
import logger from '../utils/logger.js';

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => `${err.param}: ${err.msg}`).join(', ');

    logger.warn(`Validation failed - ${req.method} ${req.originalUrl} - ${extractedErrors}`);

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  next();
};

export default validateRequest;