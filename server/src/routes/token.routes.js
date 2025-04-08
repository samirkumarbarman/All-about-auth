import express from 'express';
import * as emailController from '../controllers/email.controller.js';
import validateRequest from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/resend-verification-email', validateRequest, emailController.resendVerificationEmail);

export default router;