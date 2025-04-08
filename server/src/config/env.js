import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
    'PORT',
    'MONGO_URI',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'EMAIL_USER',
    'EMAIL_PASS',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'SESSION_SECRET',
];

requiredEnv.forEach  ((name) =>{
    if (!process.env[name]) {
        console.error(`Missing environment variable: ${name}`);
        process.exit(1);
    }
});

export const env = {
    port: process.env.PORT,

    mongoUri: process.env.MONGO_URI,
    
    jwtSecret: process.env.JWT_SECRET,
    
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    
    emailUser: process.env.EMAIL_USER,
    
    emailPass: process.env.EMAIL_PASS,
    
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

    sessionSecret: process.env.SESSION_SECRET,
  };