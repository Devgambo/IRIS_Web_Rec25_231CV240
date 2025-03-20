import { apiSlice } from "@/app/apiSlice";
// import { USERS_URL } from "../constants";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        signup: builder.mutation({
            query: ({ user, token }) => ({
                url: `/user/signup`,
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        }),

        //rest..


    }),
})

export const { 
    useSignupMutation
} = authApiSlice;