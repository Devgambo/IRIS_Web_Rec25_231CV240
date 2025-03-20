import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String, required: true, unique: true
  }, // Clerk user ID
  name: {
    type: String, required: true
  },
  email: {
    type: String, required: true, unique: true
  },
  regNo:{
    type: Number
  },
  role:{
    type: String, enum: ['student', 'admin'], default: 'student'
  },
  penalties: {
    type: Number, default: 0
  },
}, { timestamps: true });


export default mongoose.model("User", userSchema)