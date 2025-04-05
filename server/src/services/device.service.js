import Device from "../models/device.model.js";

//register a new device
export const registerDevice = async ({ userId, userAgent, ip, isTrusted = false }) => {
    try {
      const device = await Device.create({
        user: userId,
        userAgent,
        ip,
        isTrusted,
        lastUsedAt: new Date(),
      });
  
      return device;
    } catch (error) {
      throw new Error('Failed to register device');
    }
  };
  
  //Get User device
  export const getUserDevices = async (userId) => {
    try {
      const devices = await Device.find({ user: userId }).sort({ lastUsedAt: -1 });
      return devices;
    } catch (error) {
      throw new Error('Failed to fetch user devices');
    }
  };
  
  //Marked trusted device
  export const markDeviceAsTrusted = async (deviceId, userId) => {
    try {
      const device = await Device.findOneAndUpdate(
        { _id: deviceId, user: userId },
        { isTrusted: true },
        { new: true }
      );
  
      if (!device) throw new Error('Device not found or not owned by user');
      return device;
    } catch (error) {
      throw new Error('Failed to mark device as trusted');
    }
  };
  
  //Log out device
  export const logoutDevice = async (deviceId, userId) => {
    try {
      const result = await Device.findOneAndDelete({ _id: deviceId, user: userId });
      if (!result) throw new Error('Device not found or already logged out');
    } catch (error) {
      throw new Error('Failed to log out from device');
    }
  };
  
  // Log out all the devices
  export const logoutAllDevices = async (userId) => {
    try {
      await Device.deleteMany({ user: userId });
    } catch (error) {
      throw new Error('Failed to log out from all devices');
    }
  };
  
  