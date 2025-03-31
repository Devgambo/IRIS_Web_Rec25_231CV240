import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Equipment from "../models/equipment.model.js";
import EquipmentRequest from "../models/equipRequest.model.js"
import User from "../models/user.model.js";

export const equipReqByStatus = asyncHandler(async (req, res) => {
    const { userId } = req.auth;
    if (!userId) {
        throw new ApiError(404, "User not found")
    }

    // Find the MongoDB user by clerkId
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        throw new ApiError(404, "User not found in database");
    }
    const { status } = req.query;

    //all the request made by the current user (student) and are pending
    const reqs = await EquipmentRequest.find({
        $and: [
            { userId: user._id },
            { status: status }
        ]
    }).populate('userId').populate('equipmentId')

    return res.json(
        new ApiResponse(200, { reqs }, "All pending requestsfetched")
    )
})

export const createEquipReq = asyncHandler(async (req, res) => {
    const { userId } = req.auth;
    if (!userId) {
        throw new ApiError(404, "User not found")
    }

    // Find the MongoDB user by clerkId
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        throw new ApiError(404, "User not found in database");
    }

    const { equip_id } = req.params;
    const { quantity, bookingDate, startTime, endTime } = req.body;

    if (!bookingDate || !startTime || !endTime) {
        throw new ApiError(400, "Booking date, start time and end time are required");
    }

    const equipment = await Equipment.findById(equip_id);
    if (!equipment) {
        throw new ApiError(404, "Equipment not found");
    }

    if (quantity > equipment.availableQuantity) {
        throw new ApiError(400, "Requested quantity exceeds available quantity");
    }

    const newEquipReq = await EquipmentRequest.create({
        userId: user._id, // Use MongoDB ObjectId instead of Clerk ID
        equipmentId: equip_id,
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

    const allreqs = await EquipmentRequest.find({ status: 'pending' }).populate('userId').populate('equipmentId')

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
    const updates = Object.keys(req.body);

    const request = await EquipmentRequest.findById(id);
    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    const prevStatus = request.status;
    const newStatus = req.body.status;

    console.log(`Changing status from ${prevStatus} to ${newStatus}`);

    const equipment = await Equipment.findById(request.equipmentId);
    if (!equipment) {
        throw new ApiError(404, "Equipment not found");
    }

    // Handling approval logic with availability check
    if (prevStatus === 'pending' && newStatus === 'approved') {

        // Fetch conflicting requests for the same equipment and booking date
        const conflictingRequests = await EquipmentRequest.find({
            equipmentId: request.equipmentId,
            bookingDate: request.bookingDate,
            status: 'approved',
            $or: [
                {
                    startTime: { $lt: request.endTime },
                    endTime: { $gt: request.startTime }
                }
            ]
        });

        // Calculate already booked quantity at the requested time slot
        const alreadyBookedQuantity = conflictingRequests.reduce((total, req) => total + req.quantity, 0);

        if (alreadyBookedQuantity + request.quantity > equipment.availableQuantity) {
            throw new ApiError(400, "Not enough equipment available for the requested time slot");
        }

        // Equipment is available for the requested time slot
        equipment.availableQuantity -= request.quantity;
        request.approvedDate = new Date();
        await equipment.save();
    }

    if (prevStatus === 'approved' && newStatus === 'completed') {
        equipment.availableQuantity += request.quantity;
        await equipment.save();
    }

    if ((prevStatus === 'approved') && (newStatus === 'rejected' || newStatus === 'cancelled')) {
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