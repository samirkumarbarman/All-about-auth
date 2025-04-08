import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import Token from '../models/token.model.js';
import User from '../models/user.model.js';
import crypto from 'crypto';

export const generateTokenPair = (user) =>{
    const accessToken = jwt.sign({ sub :user._id, role :user.role }, env.jwtSecret, { expiresIn : '1h'});
    const refreshToken = jwt.sign({ sub :user._id }, env.jwtRefreshSecret, { expiresIn:'30d'});

    Token.create({
        user: user._id,
        token: refreshToken,
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    }).catch((err) => {
        console.error('Error creating token in database:', err);
    })
    return { accessToken, refreshToken };
};

export const verifyToken = (token, type ='access') => {
    const secret = type === 'access' ? env.jwtSecret : env.jwtRefreshSecret;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        if (error.name === 'TokenExpiredError'){
            throw new Error('Token expired');
        }
        throw new Error('Invalid token');
    }
};

export const generateEmailToken = async (userId) => {
    try {
    const token  = crypto.randomBytes(32).toString('hex');

    await Token.create({
        user: userId,
        token,
        expiresAt: Date.now() + 10 * 60 * 1000,
    })
    return token;
    } catch(error) {
        console.error('Error creating email token in database:', err);
        throw new Error('Could not generate email verification token.');
    }
};

export const verifyEmailToken = async (token) => {
    const storedToken = await Token.findOne({token});

    if (!storedToken) {
        throw new Error('Invalid token');
    }

    if (storedToken.expiresAt < Date.now()) {
        throw new Error('Token expired');
    }

    await Token.deleteOne({ token });

    return true;

};

export const resetPass = async (token, newPassword) => {
    const storedToken = await Token.findOne({token});

    if (!storedToken) {
        throw new Error('Invalid token');
    }

    if (storedToken.expiresAt < Date.now()) {
        throw new Error('Token expired');
    }

    const user = await User.findById(storedToken.user);
    if (!user) {
        throw new Error('User not found');
    }

    user.password = newPassword;
    await user.save();
    await token.deleteOne({ token });
    return true;
};