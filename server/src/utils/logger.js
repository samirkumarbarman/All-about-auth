import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = path.join('logs');
    if (!fs.existsSync(logDir)){
        fs.mkdirSync('logDir');
    };

//Custom log format
const logFormat = winston.format.printf(({ level, message, timestamp}) =>{
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

//Main Logger Setup
export const logger = winston.createLogger({
    level : 'info',
    format : winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports : [
        new winston.transports.File({ filename : 'logs/error.log', level : 'error'}),
        new winston.transports.File({ filename : 'logs/combined.log'}),
    ]
});

// Add console logging for dev environment
if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format : winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        )
    }));
};

export const errorLogger = winston.createLogger({
    level: 'error',
    format: logFormat,
    transports: [
      new winston.transports.File({ filename: path.join(logDir, 'error.log') }),
      new winston.transports.Console(),
    ],
  });