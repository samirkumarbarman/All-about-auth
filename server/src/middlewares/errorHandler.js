import {logger} from '../utils/logger.js';

// Central error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Log error using winston
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export default errorHandler;
