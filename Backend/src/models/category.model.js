import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    description:{
        type:String
    },
    coverImage:{
        type:String, //cloudinary url
    },
    kind:{
        type:String,
        enum:["infrastructure","equipment"]
    }
})

export default mongoose.model("Category",categorySchema);