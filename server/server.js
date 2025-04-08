import app from './app.js';
import {logger} from './src/utils/logger.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});