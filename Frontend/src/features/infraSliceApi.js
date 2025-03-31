import { apiSlice } from "@/app/apiSlice";

export const infraApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createInfra: builder.mutation({
            query: ({ data, token }) => {
                return {
                    url: '/infra',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            },
            
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    console.log("Infra created successfully");
                } catch (err) {
                    console.error("Error creating equipment:", err);
                }
            },
            invalidatesTags:['Infrastructures']
        }),

        getInfrastructures: builder.query({
            query: ({ token, cat_id }) => ({
                url: `/infra/${cat_id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            providesTags: ['Infrastructures']
        }),

        getAllInfrastructures: builder.query({
            query: ({ token }) => ({
                url: `/infra`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            providesTags: ['Infrastructures']
        }),

        updateInfrastructure: builder.mutation({
            query: ({ token, data, id }) => ({
                url: `/infra/${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Infrastructures']
        }),


        deleteInfrastructure: builder.mutation({
            query: ({ token, id }) => ({
                url: `/infra/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            invalidatesTags: ['Infrastructures']
        })

    })
})

export const {
    useCreateInfraMutation,
    useUpdateInfrastructureMutation,
    useDeleteInfrastructureMutation,
    useGetAllInfrastructuresQuery,
    useGetInfrastructuresQuery,
    
} = infraApiSlice;