import express from 'express';
import validateRequest from "../middlewares/validationMiddleware.js";
import * as deviceController from "../controllers/device.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/all-devices', validateRequest, authMiddleware.authenticate, authMiddleware.authorize, deviceController.listUserDevices);

router.post('/trust-device', validateRequest, authMiddleware.authenticate, authMiddleware.authorize, deviceController.trustDevice);

router.delete('/remove-device/:id', validateRequest, authMiddleware.authenticate, authMiddleware.authorize, deviceController.removeDevice);

router.delete('/remove-all-devices/:deviceId', validateRequest, authMiddleware.authenticate, authMiddleware.authorize, deviceController.removeAllDevices);

export default router;



