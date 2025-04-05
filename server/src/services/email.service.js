import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { generateEmailToken } from './token.service.js';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: env.emailUser,
        pass: env.emailPass,
    }
});

export const sendverificationEmail = async (user) => {
    try {
        const token = await generateEmailToken(user._id);   
        const verificationUrl = `http://localhost:3000/verify-url?token=${token}`;
        const mailOptions = {
            from: env.emailUser,
            to: user.email,
            subject: 'Verify your email address',
            text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
        }
        await transporter.sendMail(mailOptions);
    }catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};
