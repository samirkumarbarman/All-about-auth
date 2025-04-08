import * as deviceService from '../services/device.service.js';

export const registerDevice = async (req, res) => {
  try {
    const {userId, ip, userAgent} = req.body;
    const device = await deviceService.registerDevice({
      userId,
      ip,
      userAgent,
      isTrusted: false,
    });
    res.status(201).json({ success: true, data: device });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listUserDevices = async (req, res) => {
  try {
    const devices = await deviceService.getUserDevices(req.user._id);
    res.status(200).json({ success: true, data: devices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const trustDevice = async (req, res) => {
  try {
    const device = await deviceService.markDeviceAsTrusted(req.params.deviceId, req.user._id);
    res.status(200).json({ success: true, data: device });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeDevice = async (req, res) => {
  try {
    await deviceService.logoutDevice(req.params.deviceId, req.user._id);
    res.status(200).json({ success: true, message: 'Device removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeAllDevices = async (req, res) => {
  try {
    await deviceService.logoutAllDevices(req.user._id);
    res.status(200).json({ success: true, message: 'All devices removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};