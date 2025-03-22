import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Infrastructure from "../models/infrastructure.model.js";
import InfraBooking from "../models/infraRequest.model.js";

export const infraReqPending = asyncHandler(async (req,res) => {
    const { userId } = req.auth;
    if(!userId){
        throw new ApiError(404, "User not found")
    }

    //all the request made by the current user (student) and are pending
    const infraReqPen =  await InfraBooking.find({
        $and:[
            {userId: userId},
            {status:'pending'}
        ]
    })

    return res.json(
        new ApiResponse(200,{infraReqPen},"All pending requestsfetched")
    )
})

export const infraReqCompleted = asyncHandler(async (req,res) => {
    const { userId } = req.auth;
    if(!userId){
        throw new ApiError(404, "User not found")
    }
    const infraReqCom =  await InfraBooking.find({
        $and:[
            {userId: userId},
            {status:'completed'}
        ]
    })

    return res.json(
        new ApiResponse(200,{infraReqCom},"All Completed requests fetched")
    )
})

export const createInfraReq = asyncHandler(async (req,res) => {
    const { userId } = req.auth;
    if(!userId){
        throw new ApiError(404, "User not found")
    }
    const {infra_id} = req.params;
    const {bookingDate, timeSlot} = req.body;

    const infrastructure = await Infrastructure.findById(infra_id);
    if (!infrastructure) {
        throw new ApiError(404, "Infra not found");
    }

    if (infrastructure.availability===false) {
        throw new ApiError(400, "Requested infra not available");
    }

    const newInfraReq = await EquipmentRequest.create({
        userId:userId,
        infrastructureId:infra_id ,
        bookingDate:bookingDate,
        timeSlot:timeSlot,
    })

    if(!newInfraReq) {
        throw new ApiError(409,"Failed to create request")
    }

    return res.json(
        new ApiResponse(201, {newInfraReq},"New Infra request created" )
    )
})


export const getAllInfraReqs = asyncHandler(async (req,res) => {
    const allreqs = await InfraBooking.find({status:'pending'})

    return res.json(
        new ApiResponse(200, { allreqs }, allreqs.length ? "All pending requests fetched." : "No pending requests found.")
    );
    
})

 
export const getOneInfraReq = asyncHandler(async (req,res) => {
    const {id} = req.params;
    const infraReq = await InfraBooking.findById(id).populate('infrastructureId').populate('userId');

    if(!infraReq){
        throw new ApiError(404,"req not found")
    }
    return res.json(
        new ApiResponse(200,{infraReq},"Infra request fetched")
    )
})

//this is to update the request like when admin verify we'll send the req to update the status to 'approved' or 'rejected' then after using student can chnage status to 'completed' 
export const updateInfraReq = asyncHandler(async (req,res) => {
    const {id} = req.params;

    if(!id){
        throw new ApiError(404,"id not found")
    }

    const allowedUpdates = ['status','adminComment','reminderSent','timeSlot'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new ApiError(400, "Invalid updates!");
    }

    const updated_req = await InfraBooking.findByIdAndUpdate(id,req.body,{new:true});

    return res.json(
        new ApiResponse(200,{updated_req},"Request Updated")
    )
})

export const deleteInfraReq = asyncHandler(async (req,res) => {
    const {id} = req.params;

    if(!id){
        throw new ApiError(404,"id not found")
    }
    await InfraBooking.findByIdAndDelete(id)

    return res.json(
        new ApiResponse(204,{},"Request deleted!")
    )

})