import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },

    token :{
        type: String,
        required: true,
    },

    type :{
        type: String,
        enum: [ 'refresh', 'verifyEmail', 'resetPassword'],
        required: true,
    },

    expiresAt :{
        type: Date,
        required: true,
    },

    blacklisted :{
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

export default mongoose.model('Token', tokenSchema);