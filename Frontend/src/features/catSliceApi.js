import { apiSlice } from "@/app/apiSlice";

export const catApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        createCat: builder.mutation({
            query: ({ data, token }) => {
                return {
                    url: `/category`,
                    method: 'POST',
                    body: data,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    formData: true,
                }
            },
            invalidatesTags: ['Categories']
        }),

        getCats: builder.query({
            query: ({ token, type }) => {
                if (!token) {
                    return { skip: true };
                }
                console.log(`Fetching categories with type: ${type}`);
                return {
                    url: `/category?type=${type}`,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
            },
            //if we want to modify response
            transformResponse: (response) => {
                console.log("Category API Response:", response);
                return response;
            },
            providesTags: ['Categories']
        }),

        deleteCat: builder.mutation({
            query:({token,id})=>({
                url:`/category/${id}`,
                method:'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags:['Categories']
        }),


        updateCat: builder.mutation({
            query:({token,id,data})=>({
                url:`/category/${id}`,
                method:'PUT',
                body:data,
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags:['Categories']
        }),
    })
})

export const {
    useCreateCatMutation,
    useGetCatsQuery,
    useDeleteCatMutation,
    useUpdateCatMutation
} = catApiSlice;
