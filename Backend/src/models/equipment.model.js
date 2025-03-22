import mongoose from "mongoose";
import Category from "./category.model.js";

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
    required: true
  },
  quantity: {
    type: Number, required: true

  },
  availableQuantity: {
    type: Number, required: true

  },
  condition: {
    type: String, enum: ['good', 'maintenance', 'damaged'], default: 'good'

  },
  description: {
    type: String

  },
}, { timestamps: true });

export default mongoose.model("Equipment", equipmentSchema)