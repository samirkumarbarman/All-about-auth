import express from 'express';
import authRoute from './src/routes/auth.routes.js';
import deviceRoute from './src/routes/device.routes.js';
import emailRoute from './src/routes/email.routes.js';
import tokenRoute from './src/routes/token.routes.js';
import userRoute from './src/routes/user.routes.js';
import passport from './src/config/passport.js';
import errorHandler from './src/middlewares/errorHandler.js';
import ratelimiter from './src/middlewares/rateLimit.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import session from 'express-session';
import {env} from './src/config/env.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(ratelimiter);

app.use(session({
    secret: env.sessionSecret, 
    resave: false,                      
    saveUninitialized: false,         
    cookie: { secure: false }           
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoute);

app.use('/api/devices', deviceRoute);

app.use('/api/email', emailRoute);

app.use('/api/token', tokenRoute);

app.use('/api/user', userRoute);

app.use(errorHandler);

export default app;