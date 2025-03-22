import { ApiError } from "../utils/ApiError.js"

export const requireRole = (role) => (req,res,next)=>{

    const userRole = req.auth.sessionClaims.unsafeMetadata.role;        //optional if not then find role by User model

    if(!userRole){
        throw new ApiError(403, "No role found!")
    }

    if(userRole !== role){
        throw new ApiError(403,"Forbidden")
    }
    next()
}