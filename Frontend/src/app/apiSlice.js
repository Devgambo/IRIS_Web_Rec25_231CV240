import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl:'http://localhost:3000/api',
        credentials: 'include',              //this was the error i spent (5 hours lookin for)

    }),
    endpoints: builder => ({})
})