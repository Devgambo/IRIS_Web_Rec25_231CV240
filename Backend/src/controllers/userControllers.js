import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import User from "../models/user.model.js"

export const createUser = asyncHandler(async (req, res) => {
    const { userId } = req.auth; // Clerk verified user ID

    const { clerkId, email, name, regNo, role } = req.body;

    if(userId!==clerkId){
        throw new ApiError(401, "unauthorized request")
    }
    const existingUser = await User.findOne({ clerkId })
    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const newUser = await User.create({
        clerkId,
        name,
        email,
        regNo,
        role,
    });

    if (!newUser) {
        throw new ApiError(500, "Something went wrong while fetching the user")
    }

    return res.json(
        new ApiResponse(200 , {newUser}, "User Registered Successfully" )
    )
})


//only admin can access all users
export const getAllUsers = asyncHandler(async(req,res)=>{
    const { userId } = req.auth;
    const currUser = await User.findById(userId);
    if(currUser.role!=='admin'){
        throw new ApiError(403, "Unauthorized request")
    }

    const allUsers = await User.find();

    if (!allUsers) {
        throw new ApiError(500, "Something went wrong while registering the users")
    }

    return res.json(
        new ApiResponse(200,{allUsers}, "All users fetched Successfully")
    )

})

