import * as authServices from "../services/auth.service.js";
import * as tokenServices from "../services/token.service.js";

export const register = async (req, res) =>{
    try {
        const user = await authServices.registerUser(req.body);
        const tokens = await tokenServices.generateTokenPair(user);
        register.status(201).json({success: true, user, tokens});
    } catch (error) {
        res.status(400).json({success: false, message : error.message});
    }
};

export const login = async (req, res) => {
    try {
        const user = await authServices.loginUser(req.body);
        const tokens = await tokenServices.generateTokenPair(user);
        res.status(200).json({success: true, user, tokens});
    } catch (error) {
        res.status(400).json({success: false, message : error.message});
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({success: false, message: "Refresh token is required"});
        await authServices.logoutuser(refreshToken);
        res.status(200).json({success: true, message: "Logged out successfully"});
    } catch (error) {
        res.status(400).json({success: false, message : error.message});
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { googleId, name, email, avatar } = req.body;
        const token = await googleLogin({ googleId, name, email, avatar });
        res.status(200).json({ user,token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
