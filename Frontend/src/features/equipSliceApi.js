import { apiSlice } from "@/app/apiSlice";

export const equipApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createEquip: builder.mutation({
            query: ({ data, token }) => {
                return {
                    url: '/equip',
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
                    console.log("Equipment created successfully");
                } catch (err) {
                    console.error("Error creating equipment:", err);
                }
            },
            invalidatesTags: ['Equipments']
        }),

        getEquipments: builder.query({
            query: ({ token, cat_id }) => ({
                url: `/equip/${cat_id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            providesTags: ['Equipments']
        }),

        getAllEquipments: builder.query({
            query: ({ token }) => ({
                url: `/equip`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            providesTags: ['Equipments']
        }),

        updateEquipment: builder.mutation({
            query: ({ token, data, id }) => ({
                url: `/equip/${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Equipments']
        }),


        deleteEquipment: builder.mutation({
            query: ({ token, id }) => ({
                url: `/equip/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
            invalidatesTags: ['Equipments']
        })


        //rest
    })
})

export const {
    useCreateEquipMutation,
    useGetAllEquipmentsQuery,
    useGetEquipmentsQuery,
    useUpdateEquipmentMutation,
    useDeleteEquipmentMutation

} = equipApiSlice;