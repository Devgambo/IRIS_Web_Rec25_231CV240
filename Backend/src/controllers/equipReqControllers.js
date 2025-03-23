import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Equipment from "../models/equipment.model.js";
import EquipmentRequest from '../models/equipRequest.model.js'

export const equipReqPending = asyncHandler(async (req, res) => {
    const { userId } = req.auth;
    if (!userId) {
        throw new ApiError(404, "User not found")
    }

    //all the request made by the current user (student) and are pending
    const equipReqPen = await EquipmentRequest.find({
        $and: [
            { userId: userId },
            { status: 'pending' }
        ]
    })

    return res.json(
        new ApiResponse(200, { equipReqPen }, "All pending requestsfetched")
    )
})

export const equipReqCompleted = asyncHandler(async (req, res) => {
    const { userId } = req.auth;
    if (!userId) {
        throw new ApiError(404, "User not found")
    }
    const equipReqCom = await EquipmentRequest.find({
        $and: [
            { userId: userId },
            { status: 'completed' }
        ]
    })

    return res.json(
        new ApiResponse(200, { equipReqCom }, "All Completed requestsfetched")
    )
})

export const createEquipReq = asyncHandler(async (req, res) => {
    const { userId } = req.auth;
    if (!userId) {
        throw new ApiError(404, "User not found")
    }
    const { equip_Id } = req.params;
    const { quantity, bookingDate, startTime, endTime } = req.body;

    if (!bookingDate || !startTime || !endTime) {
        throw new ApiError(400, "Booking date, start time and end time are required");
    }

    const equipment = await Equipment.findById(equip_Id);
    if (!equipment) {
        throw new ApiError(404, "Equipment not found");
    }

    if (quantity > equipment.availableQuantity) {
        throw new ApiError(400, "Requested quantity exceeds available quantity");
    }

    const newEquipReq = await EquipmentRequest.create({
        userId: userId,
        equipmentId: equip_Id,
        quantity: quantity,
        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,

    })

    if (!newEquipReq) {
        throw new ApiError(409, "Failed to create request")
    }

    return res.json(
        new ApiResponse(201, { newEquipReq }, "New equipment request created")
    )
})

export const getAllEquipReqs = asyncHandler(async (req, res) => {
    const allreqs = await EquipmentRequest.find({ status: 'pending' })

    return res.json(
        new ApiResponse(200, { allreqs }, allreqs.length ? "All pending requests fetched." : "No pending requests found.")
    );

})

export const getOneEquipReq = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // const equipReq = await EquipmentRequest.findById(id);
    const equipReq = await EquipmentRequest.findById(id).populate('equipmentId').populate('userId');

    if (!equipReq) {
        throw new ApiError(404, "req not found")
    }
    return res.json(
        new ApiResponse(200, { equipReq }, "Equip request fetched")
    )
})

//this is to update the request like when admin verify we'll send the req to update the status to 'approved' or 'rejected' then after using student can chnage status to 'completed' 
export const updateEquipReq = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(404, "id not found")
    }

    const allowedUpdates = ['status', 'adminComment'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new ApiError(400, "Invalid updates!");
    }

    const request = await EquipmentRequest.findById(id);
    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    const prevStatus = request.status; // Track previous status for logic
    const newStatus = req.body.status; // This is what admin/user wants to update to

    console.log(`Changing status from ${prevStatus} to ${newStatus}`);
    // Get the equipment
    const equipment = await Equipment.findById(request.equipmentId);
    if (!equipment) {
        throw new ApiError(404, "Equipment not found");
    }

    // Handle transitions between statuses:
    if (prevStatus === 'pending' && newStatus === 'approved') {
        // Admin approved the request: Reduce availability
        if (equipment.availableQuantity < request.quantity) {
            throw new ApiError(400, "Not enough equipment available");
        }
        equipment.availableQuantity -= request.quantity;
        request.approvedDate = new Date(); // Optional: auto-set approved date
        await equipment.save();
    }

    if (prevStatus === 'approved' && newStatus === 'completed') {
        // User completed the request: Increase availability
        equipment.availableQuantity += request.quantity;
        await equipment.save();
    }

    if ((prevStatus === 'approved') && (newStatus === 'rejected' || newStatus === 'cancelled')) {
        // Optional safeguard: If an admin rejects after approving, release equipment
        equipment.availableQuantity += request.quantity;
        await equipment.save();
    }

    // Apply updates to the request object
    updates.forEach(update => {
        request[update] = req.body[update];
    });

    await request.save();

    return res.json(
        new ApiResponse(200, { updated_req: request }, "Request updated successfully")
    );
})

export const deleteEquipReq = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(404, "id not found")
    }
    await EquipmentRequest.findByIdAndDelete(id)

    return res.json(
        new ApiResponse(204, {}, "Request deleted!")
    )

})