import { apiSlice } from "@/app/apiSlice";

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

        getStatistics: builder.query({
            query: ({token})=>({
                url:'/user/admin/statistics',
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        })

        //rest..
    }),
})

export const { 
    useSignupMutation,
    useGetStatisticsQuery
} = authApiSlice;