import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        // baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
        baseUrl: 'http://localhost:3000/api' || import.meta.env.VITE_API_URL,
        credentials: 'include',              //this was the error i spent (5 hours lookin for)

    }),
    endpoints: builder => ({})
})