//[BUG]

import { ApiError } from "../utils/ApiError.js"

export const requireRole = (role) => (req,res,next)=>{

    const userRole = req.auth?.sessionClaims?.unsafeMetadata?.role;
    console.log(req.auth)
    console.log("req.auth.sessionClaims: ", req.auth.sessionClaims);

    if(!userRole){
        throw new ApiError(403, "No role found!")
    }

    if(userRole !== role){
        throw new ApiError(403,"Forbidden")
    }
    next()
}