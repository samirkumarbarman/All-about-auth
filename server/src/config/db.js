import mongoose from 'mongoose';
import { DB_NAME } from '../constrains.js';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n Mongodb connected !! DB host:${connect.connection.host}`)
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;