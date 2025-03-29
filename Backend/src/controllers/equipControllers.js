import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Equipment from '../models/equipment.model.js'


export const getAllEquip = asyncHandler(async (req, res) => {

    //Changes: populated with catID
    const equipments = await Equipment.find().populate('categoryId');

    if (equipments.length === 0) {
        throw new ApiError(409, "equipments fetching failed")
    }

    return res.json(
        new ApiResponse(200, { equipments }, "all equipments fetched!")
    )
})

export const addNewEquip = asyncHandler(async (req, res) => {
    console.log('addnewEquip hit')
    console.log(req.body);
    const { name, categoryId, quantity, availableQuantity, description } = req.body;

    const newEquip = await Equipment.create({
        name,
        categoryId,
        quantity,
        availableQuantity,
        description
    })

    if (!newEquip) {
        throw new ApiError(500, "something went wrong while saving the equipment");
    }

    return res.json(
        new ApiResponse(200, { newEquip }, "New equipment created")
    )
})

export const updateEquip = asyncHandler(async (req, res) => {

    const { id } = req.params
    const equip = await Equipment.findById(id);
    if (!equip) {
        throw new ApiError(409, "Equipment couldn't fetch")
    }
    
    //I need to update anyfeild that come in req.body eg:condition and discription or increasing/dec the available quantity of equipment whenever someone gets there request verified or completed.
    const new_equip = await Equipment.findByIdAndUpdate(id, req.body, { new: true });
    if (!new_equip) {
        throw new ApiError(409, "Equipment could'nt fetched & updated")
    }

    return res.json(
        new ApiResponse(200, { new_equip }, "updated the equipment")
    )

})

export const deleteEquip = asyncHandler(async (req, res) => {
    const { id } = req.params
    const equip = await Equipment.findById(id);
    if (!equip) {
        throw new ApiError(409, "Equipment couldn't fetch")
    }

    await Equipment.findByIdAndDelete(id);

    return res.json(
        new ApiResponse(200,{},"equipment deleted")
    )
})

export const getAllEquipsFromACat = asyncHandler(async (req, res) => {

    const { cat_id } = req.params

    const allEquips = await Equipment.find({ categoryId: cat_id });
    if (allEquips.length === 0) {
        throw new ApiError(409, "cat-equipment fetching failed...")
    }
    return res.json(
        new ApiResponse(200, { allEquips }, "All equipments fetched from a perticular category")
    )
})