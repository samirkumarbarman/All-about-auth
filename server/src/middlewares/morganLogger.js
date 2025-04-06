import morgan from 'morgan';
import logger from '../utils/logger.js';

//Morgan steam to use winston logger
const steam = {
    write : (message) =>{
        logger.http(message.trim());
    }
};

const skip = () => process.env.NODE_ENV === 'test';

//Morgan middleware
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: steam,
    skip,
});

export default morganLogger;