import express from 'express';
import validateRequest from "../middlewares/validationMiddleware.js";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/profile', validateRequest, authMiddleware.authenticate, authMiddleware.authorize(['user', 'admin', 'modarator']), userController.getUserProfile);

router.put('/profile/:id', validateRequest, authMiddleware.authenticate, authMiddleware.authorize(['user', 'admin', 'modarator']), userController.updateUserProfile);

router.delete('/delete-account/:id', validateRequest, authMiddleware.authenticate, authMiddleware.authorize(['user', 'admin', 'modarator']), userController.deleteUserAccount);

export default router;