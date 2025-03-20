import mongoose from "mongoose";

const infrastructureSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
    required: true
  },
  location: {
    type: String, required: true
  },
  capacity: {
    type: Number
  },
  condition: {
    type: String, enum: ['good', 'maintenance', 'damaged'],
    default: 'good'
  },
  description: {
    type: String
  },
  timeSlots:[
    {
      type: String,
    }
  ],
  availability: {
    type: Boolean, default: true
  },
}, { timestamps: true });

export default mongoose.model("Infrastructure", infrastructureSchema)
