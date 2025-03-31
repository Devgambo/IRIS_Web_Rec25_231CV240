import { apiSlice } from "@/app/apiSlice";

export const infraReqApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        createIReq: builder.mutation({
            query:({token,data,inf_id})=>({
                url:`/infra-req/${inf_id}`,
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
                    console.log("I Request created successfully");
                } catch (err) {
                 console.error("error while creating new I Request" , err);  
                }
            },

            invalidatesTags:['IRequests']
        }),

        getIRequests: builder.query({
            query:({token})=>({
                url:'/infra-req',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            providesTags: ['IRequests']
        }),

        getIRequest: builder.query({
            query:({token,id})=>({
                url:`/infra-req/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            providesTags: ['IRequests']
        }),

        updateIRequest: builder.mutation({
            query:({token,data,id})=>({
                url:`/infra-req/${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['IRequests']
        }),

        deleteIRequest: builder.mutation({
            query:({token,id})=>({
                url:`/infra-req/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['IRequests']
        }),

        IReqsByStatus: builder.query({
            query:({token,status})=>({
                url:`/infra-req/status?status=${status}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            providesTags:['IRequests']
        }),
        
    })
})

export const {
    useCreateIReqMutation,
    useIReqsByStatusQuery,
    useGetIRequestQuery,
    useGetIRequestsQuery,
    useUpdateIRequestMutation,
    useDeleteIRequestMutation,
} = infraReqApiSlice;