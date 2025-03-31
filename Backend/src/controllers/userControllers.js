import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import User from "../models/user.model.js"
import InfraBooking from '../models/infraRequest.model.js';
import EquipmentRequest from '../models/equipRequest.model.js';

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
        throw new ApiError(500, "Something went wrong while saving the user")
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


export const getStatistics = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalInfraBookings = await InfraBooking.countDocuments();
    const totalEquipmentRequests = await EquipmentRequest.countDocuments();
    const pendingInfraBookings = await InfraBooking.countDocuments({ status: 'pending' });
    const pendingEquipmentRequests = await EquipmentRequest.countDocuments({ status: 'pending' });
    
    const statistics = {
        totalUsers,
        totalInfraBookings,
        totalEquipmentRequests,
        pendingInfraBookings,
        pendingEquipmentRequests
    };

    return res.json(
        new ApiResponse(200, {statistics}, "statistics fetched")
    )
});
