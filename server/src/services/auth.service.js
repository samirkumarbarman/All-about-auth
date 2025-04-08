import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import { generateTokenPair } from "../services/token.service.js";
import { sendverificationEmail } from "./email.service.js";

export const registerUser = async ({ name, email, password, oauthProvider, oauthId}) =>{
    const existUser = await User.findOne({ email });

    if (existUser) throw new Error ("User Already exist");

    const user = await User.create({
        name,
        email,
        password,
        oauthProvider : oauthProvider || null,
        oauthId : oauthId || null,
        isEmailVerified : oauthProvider ? true : false,
    });
    if (!oauthProvider){
        await sendverificationEmail(user);
    }
    return user;
};

//log in user
export const loginUser = async ({email, password, ip}) =>{
    const user = await User.findOne({email});
    if(!user) throw new Error ("Invalid credentials");

    const isPasswordMatched = await User.comparePassword(password);
    if(!isPasswordMatched) throw new Error ("Invalid credentials");
    
    const tokens = await generateTokenPair(user);
    return { user, tokens };
};

// Log out user
export const logoutuser = async (refreshToken) => {
    await Token.findByIdAndDelete({token : refreshToken, type : 'refresh'});
};

export const googleLogin = async ({googleId, name, email, avatar }) =>{
    const user = await User.findOne({email});
    if (!user) {
        user = await User.create({googleId, name, email, avatar});
    }
    return generateTokenPair(user);
};

//Role Based Authorization
export const authorizeRoles = (user, roles) => {
    if (!roles.includes(user.role)) {
      throw new Error("Access Denied: Insufficient Permissions");
    }
  };