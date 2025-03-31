import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Infrastructure from "../models/infrastructure.model.js";
import InfraBooking from "../models/infraRequest.model.js";
import User from "../models/user.model.js";

export const infraReqByStatus = asyncHandler(async (req, res) => {
    const { userId } = req.auth;
    if (!userId) {
        throw new ApiError(404, "User not found")
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        throw new ApiError(404, "User not found in database");
    }

    const {status} = req.query;

    //all the request made by the current user (student) and are pending
    const reqs = await InfraBooking.find({
        $and: [
            { userId: user._id },
            { status: status }
        ]
    }).populate('userId').populate('infrastructureId')

    return res.json(
        new ApiResponse(200, { reqs }, "All pending requestsfetched")
    )
})

export const createInfraReq = asyncHandler(async (req, res) => {
    const { userId } = req.auth;

    if (!userId) {
        throw new ApiError(404, "User not found")
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        throw new ApiError(404, "User not found in database");
    }


    const { infra_id } = req.params;
    const { bookingDate, timeSlot } = req.body;

    if(!bookingDate||!timeSlot){
        throw new ApiError(400, "BookingDate or TimeSlot is missing ")
    }

    const infrastructure = await Infrastructure.findById(infra_id);
    if (!infrastructure) {
        throw new ApiError(404, "Infra not found");
    }

    if (infrastructure.availability === false) {
        throw new ApiError(400, "Requested infra not available");
    }

    // Convert bookingDate to Date object
    const bookingDateObj = new Date(bookingDate);

    // Check if the user already has a booking for the same day
    const existingBooking = await InfraBooking.findOne({
        userId: user._id,
        infrastructureId: infra_id,
        bookingDate: bookingDateObj,
    });

    if (existingBooking) {
        throw new ApiError(400, "You can only book this infrastructure once per day.");
    }

    // Check if the infrastructure is already booked by another user for the same time slot
    const conflictingBooking = await InfraBooking.findOne({
        infrastructureId: infra_id,
        bookingDate: bookingDateObj,
        timeSlot: timeSlot,
        status: 'approved'  // Only approved bookings should block new requests
    });

    if (conflictingBooking) {
        throw new ApiError(400, "The requested infrastructure is already booked for this time slot.");
    }

    // Proceed to create the booking request
    const newInfraReq = await InfraBooking.create({
        userId: user._id,
        infrastructureId: infra_id,
        bookingDate: bookingDateObj,
        timeSlot: timeSlot,
    });

    if (!newInfraReq) {
        throw new ApiError(409, "Failed to create request")
    }

    return res.json(
        new ApiResponse(201, { newInfraReq }, "New Infra request created")
    )
})

export const getAllInfraReqs = asyncHandler(async (req, res) => {
    const allreqs = await InfraBooking.find({ status: 'pending' }).populate('userId').populate('infrastructureId')

    return res.json(
        new ApiResponse(200, { allreqs }, allreqs.length ? "All pending requests fetched." : "No pending requests found.")
    );

})

export const getOneInfraReq = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const infraReq = await InfraBooking.findById(id).populate('infrastructureId').populate('userId');

    if (!infraReq) {
        throw new ApiError(404, "req not found")
    }
    return res.json(
        new ApiResponse(200, { infraReq }, "Infra request fetched")
    )
})

//this is to update the request like when admin verify we'll send the req to update the status to 'approved' or 'rejected' then after using student can chnage status to 'completed' 
export const updateInfraReq = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(404, "id not found")
    }

    const updates = Object.keys(req.body);

    const request = await InfraBooking.findById(id);
    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    updates.forEach(update => request[update] = req.body[update]);
    await request.save();

    return res.json(
        new ApiResponse(200, { updated_req: request }, "Request Updated Successfully")
    );
})

export const deleteInfraReq = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(404, "id not found")
    }
    await InfraBooking.findByIdAndDelete(id)

    return res.json(
        new ApiResponse(204, {}, "Request deleted!")
    )

})