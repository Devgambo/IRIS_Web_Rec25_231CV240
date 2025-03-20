import mongoose from "mongoose";
import User from "./user.model";
import Infrastructure from './infrastructure.model'

const infraBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  infrastructureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Infrastructure,
    required: true
  },
  bookingDate: {
    type: Date, required: true
  },
  timeSlot: {
    type: String, required: true,
    enum: ['5:15am', '6:15am', '7:15am', '5:30pm', '6:30pm', '7:30pm']
  },
  status: {
    type: String, enum: ['pending', 'approved', 'rejected', 'cancelled','completed'],
    default: 'pending'
  },
  adminComment: {
    type: String
  },
  reminderSent: {
    type: Boolean, default: false
  },      // for 30 min before reminder
}, { timestamps: true });

export default mongoose.model("InfraBooking", infraBookingSchema)
