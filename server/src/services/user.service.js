import User from "../models/user.model.js";

//Get user by id
export const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) throw new Error ("User not found");
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

// Update User by Id
export const updateUserById = async (userId, data) =>{
    try {
        const user = await User.findByIdAndUpdate(userId, data, { new : true });
        if (!user) throw new Error ("User not found")
        return user;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

// Delete User
export const deleteExistUser = async (userid) => {
    try {
        const deleted = await User.findByIdAndDelete(userid);
        if (!deleted) throw new Error ("User not found");
        return deleted;
    } catch (error) {
        throw new Error('Failed to delete user');
    }
};