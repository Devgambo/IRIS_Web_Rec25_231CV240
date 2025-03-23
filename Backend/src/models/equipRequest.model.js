import mongoose from "mongoose";
import Equipment from "./equipment.model.js";
import User from "./user.model.js";

const equipmentRequestSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true
   },
   equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Equipment,
      required: true
   },
   quantity: {
      type: Number, required: true
   },
   bookingDate: {
      type: Date,
      required: true 
   },
   startTime: {
      type: String,
      required: true
   },
   endTime: {
      type: String,
      required: true
   },
   status: {
      type: String, 
      enum: ['pending', 'approved', 'rejected', 'cancelled','completed'],
      default: 'pending'
   },
   adminComment: {
      type: String
   },
   requestDate: {
      type: Date, default: Date.now
   },
   approvedDate: {
      type: Date
   },
}, { timestamps: true });


export default mongoose.model("EquipmentRequest", equipmentRequestSchema)
