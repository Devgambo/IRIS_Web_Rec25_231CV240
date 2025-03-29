import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Updated connection options for better reliability
        const connectionOptions = {
            serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        };
        
        // Don't append database name to the URI - it's likely already in the Atlas URI
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        // Don't exit the process - let the application continue and handle the error
        // process.exit(1)
        throw error; // Rethrow so the caller can handle it
    }
}

export default connectDB;