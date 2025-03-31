import { apiSlice } from "@/app/apiSlice";

export const equipReqApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        createReq: builder.mutation({
            query:({token,data,eq_id})=>({
                url:`/equip-req/${eq_id}`,
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),

            async onQueryStarted(arg,{queryFulfilled}){
                try {
                    await queryFulfilled;
                    console.log("E Request created successfully");
                } catch (err) {
                 console.error("error while creating new E Request" , err);  
                }
            },

            invalidatesTags:['ERequests']
        }),


        getRequests: builder.query({
            query:({token})=>({
                url:'/equip-req',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            providesTags: ['ERequests']
        }),

        getRequest: builder.query({
            query:({token,id})=>({
                url:`/equip-req/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            providesTags: ['ERequests']
        }),

        updateRequest: builder.mutation({
            query:({token,data,id})=>({
                url:`/equip-req/${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['ERequests']
        }),

        deleteRequest: builder.mutation({
            query:({token,id})=>({
                url:`/equip-req/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['ERequests']
        }),

        EReqsByStatus: builder.query({
            query:({token,status})=>({
                url:`/equip-req/status?status=${status}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            providesTags:['ERequests']
        }),
        
    })
})

export const {
    useCreateReqMutation,
    useEReqsByStatusQuery,
    useGetRequestQuery,
    useGetRequestsQuery,
    useDeleteRequestMutation,
    useUpdateRequestMutation,

} = equipReqApiSlice;