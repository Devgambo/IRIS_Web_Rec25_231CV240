import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import Category from "../models/category.model.js"
import Equipment from "../models/equipment.model.js"
import Infrastructure from "../models/infrastructure.model.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js"

export const getAllCategory = asyncHandler(async (req, res) => {
    const { type } = req.body;
    const categories = await Category.find({ kind: type });
    if (!categories.length) {
        throw new ApiError(404, "No categories found");
    }

    return res.json(
        new ApiResponse(200, { categories }, "Fetched all categories")
    );
})

export const createCategory = asyncHandler(async (req, res) => {
    const { name, description, kind } = req.body;

    if (!name || !kind) {
        throw new ApiError(400, "Name and kind are required");
    }
    let coverImageUrl = "https://media.istockphoto.com/id/1255328634/photo/cricket-leather-ball-resting-on-bat-on-the-stadium-pitch.jpg?s=2048x2048&w=is&k=20&c=5YgTlWqX4GDDcMzS2vLGpbx3PcwuY1a64hlmfo9kfuc="; //placeholder image

    if (req.file) {
        const cloudinaryResult = await uploadOnCloudinary(req.file.path);
        console.log("Cloudinary result:", cloudinaryResult);
        if (cloudinaryResult && cloudinaryResult.secure_url) {
            coverImageUrl = cloudinaryResult.secure_url;
        } else {
            console.warn("Cloudinary upload failed, using default image");
        }
    }

    const newCategory = await Category.create({
        name,
        description,
        coverImage: coverImageUrl,
        kind,
    })

    if (!newCategory) {
        throw new ApiError(500, "Failed to create category");
    }

    return res.json(
        new ApiResponse(201, {newCategory} ,"Category created successfully")
    )
})

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }
    // Delete related infrastructure or equipment
    if (category.kind === "infrastructure") {
        await Infrastructure.deleteMany({ categoryId: id });
    } else if (category.kind === "equipment") {
        await Equipment.deleteMany({ categoryId: id });
    }

    await Category.findByIdAndDelete(id);

    return res.json(
        new ApiResponse(200, {}, "Category and its related data deleted")
    );
})