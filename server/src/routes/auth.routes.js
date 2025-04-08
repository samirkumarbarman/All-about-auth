import express from 'express';
import validateRequest from "../middlewares/validationMiddleware.js";
import limiter from "../middlewares/rateLimit.js";
import * as authController from "../controllers/auth.controller.js";
import * as deviceController from "../controllers/device.controller.js";
import * as validators from "../validations/validator.js";
import * as emailController from "../controllers/email.controller.js";

const router = express.Router();

router.post('/register',validators.registerValidator, validateRequest, authController.register, deviceController.registerDevice);

router.post('/logiin', limiter, validators.loginValidator, validateRequest, authController.login);

router.post('/logout', authController.logout);

router.post('/logout-all', deviceController.removeAllDevices);

router.post('/forgot-password', emailController.sendPasswordResetEmail);

router.post('/reset-password', emailController.resetPassword);

export default router;


