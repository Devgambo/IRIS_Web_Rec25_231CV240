import { ApiError } from "../utils/ApiError"

export const requireRole = (role) => (req,res,next)=>{

    const userRole = req.auth.sessionClaims.unsafeMetadata.role;        //optional if not then find role by User model

    if(!userRole){
        throw ApiError(403, "No role found!")
    }

    if(userRole !== role){
        throw ApiError(403,"Forbidden")
    }
    next()
}