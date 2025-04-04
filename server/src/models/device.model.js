import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },

    ip :{
        type: String,
        required: true,
    },

    userAgent :{ type: String},

    location :{ type: String },

    isTrusted :{
        type: Boolean,
        default: false,
    },

    lastUsedAt :{
        type: Date,
        default: Date.now,
    },

}, { timestamps: true });

export default mongoose.model('Device', deviceSchema);