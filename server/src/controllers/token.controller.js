import * as tokenService from '../services/token.service.js';


export const refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
  
      if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'No refresh token provided' });
      }
  
      const payload = verifyToken(refreshToken, 'refresh');
      const user = await tokenService.findUserFromRefreshToken(refreshToken);
  
      if (!user) throw new Error('Invalid refresh token');
  
      const tokens = await generateTokenPair(user);
  
      res
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ success: true, accessToken: tokens.accessToken });
    } catch (err) {
      res.status(403).json({ success: false, message: err.message });
    }
  };