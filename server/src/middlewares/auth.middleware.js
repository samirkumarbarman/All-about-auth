import jwt from 'jsonwebtoken';
import {env} from '../config/env.js';
import { errorLogger } from '../utils/logger.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    errorLogger.error('Token verification failed', err);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

export const authorize = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }
      next();
    };
  };