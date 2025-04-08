import * as userService from '../services/user.service.js';


export const getUserProfile = async (req, res) => {
    try {
      const user = await userService.getUserById(req.user._id);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  export const updateUserProfile = async (req, res) => {
    try {
      const updatedUser = await userService.updateUserById(req.user._id, req.body);
      res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  export const deleteUserAccount = async (req, res) => {
    try {
      await userService.deleteExistUser(req.user._id);
      res.status(200).json({ success: true, message: 'Account deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };