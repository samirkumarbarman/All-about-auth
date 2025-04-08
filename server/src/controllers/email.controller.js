import * as emailService from '../services/email.service.js';
import * as tokenService from '../services/token.service.js';


export const sendVerifyEmail = async (req, res) => {
    try {
      const token = await emailService.generateEmailToken(req.user._id);
      await emailService.sendverificationEmail(req.user, token);
      res.status(200).json({ success: true, message: 'Verification email sent' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  export const verifyEmail = async (req, res) => {
    try {
      const { token } = req.query;
      await tokenService.verifyEmailToken(token);
      res.status(200).json({ success: true, message: 'Email verified successfully' });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
  
  export const sendPasswordResetEmail = async (req, res) => {
    try {
      const { email } = req.body;
      await emailService.sendResetEmail(email);
      res.status(200).json({ success: true, message: 'Password reset email sent' });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  };
  
  export const resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      await tokenService.resetPass(token, newPassword);
      res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await emailService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const token = await emailService.generateEmailToken(user._id);
        await emailService.sendverificationEmail(user, token);
        res.status(200).json({ success: true, message: 'Verification email resent' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
  };