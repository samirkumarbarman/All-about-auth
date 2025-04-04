import mongoose, { trusted } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },

    email :{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password :{
        type: String,
        required: true,
    },

    isEmailVerified :{
        type: Boolean,
        default: false,
    },

    role :{
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
    },

    oauthProvider :{
        type: String,
        enum: ['google', 'facebook', 'twitter', 'github', 'null'],
        default: null,
    },

    oauthId :{
        type: String,
        default: null,
    },

    mfa : {
        enabled :{type: Boolean, default: false},
        secret :{type: String, default: null},
        backupCodes :{type: [String]},
    },

    trustedDevices :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Device',
        }
    ],

    createdAt :{
        type: Date,
        default: Date.now,
    },

} ,{ timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);