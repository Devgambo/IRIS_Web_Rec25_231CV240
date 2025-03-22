import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload function
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const normalizedPath = path.normalize(localFilePath).replace(/\\/g, '/');
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(normalizedPath, {
      folder: "NITK_SportsMate",
      resource_type: "auto"

    });

    console.log("Cloudinary upload result:", result);
    
    // File uploaded successfully
    fs.unlinkSync(localFilePath); // Delete local file after upload
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove the file in case of error
    }
    return null;
  }
};
