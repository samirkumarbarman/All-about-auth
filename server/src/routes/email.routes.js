import express from 'express';
import validateRequest from "../middlewares/validationMiddleware.js";
import * as emailController from "../controllers/email.controller.js";

const router = express.Router();

router.post('/verify-email', validateRequest, emailController.verifyEmail);

export default router;