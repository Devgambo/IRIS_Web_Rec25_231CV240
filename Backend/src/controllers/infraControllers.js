import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Infrastructure from '../models/infrastructure.model.js'

export const getAllInfra = asyncHandler(async (req, res) => {
    const infras = await Infrastructure.find();

    return res.json(
        new ApiResponse(200, { infras }, infras.length ? "All infrastructure fetched!" : "No infrastructure found")
    )
})

export const addNewInfra = asyncHandler(async (req, res) => {
    const { name, categoryId, location, capacity, description, timeSlots } = req.body;

    if (!name || !categoryId || !location || !capacity) {
        throw new ApiError(400, "Missing required fields");
    }

    const newInfra = await Infrastructure.create({
        name,
        categoryId,
        location,
        capacity,
        description,
        timeSlots,
    })

    if (!newInfra) {
        throw new ApiError(500, "something went wrong while saving the infra");
    }

    return res.json(
        new ApiResponse(200, { newInfra }, "New infrastructure created")
    )
})

export const updateInfra = asyncHandler(async (req, res) => {
    const { id } = req.params
    const infra = await Infrastructure.findById(id);
    if (!infra) {
        throw new ApiError(409, "Infrastructure couldn't fetch")
    }

    const allowedUpdates = ['name', 'condition', 'description', 'capacity', 'availability','timeSlots'];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        throw new ApiError(400, 'Invalid updates!');
    }

    const new_infra = await Infrastructure.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!new_infra) {
        throw new ApiError(409, "Infrastructure could'nt fetched & updated")
    }

    return res.json(
        new ApiResponse(200, { new_infra }, "updated the Infrastructure")
    )

})

export const deleteInfra = asyncHandler(async (req, res) => {
    const { id } = req.params
    const infra = await Infrastructure.findById(id);
    if (!infra) {
        throw new ApiError(409, "Infrastructure couldn't fetch")
    }

    await Infrastructure.findByIdAndDelete(id);

    return res.json(
        new ApiResponse(200,{},"Infrastructure deleted")
    )
})

export const getAllInfraFromACat = asyncHandler(async (req, res) => {

    const { cat_id } = req.params

    const allInfras = await Infrastructure.find({ categoryId: cat_id });

    return res.json(
        new ApiResponse(200, { allInfras }, allInfras.length ? "All infrastructures fetched from this category" : "No infrastructure found in this category")
    )
    
})