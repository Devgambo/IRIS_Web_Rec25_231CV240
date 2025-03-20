import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

export const apiSlice = createApi({
    reducerPath: 'api', // optional but recommended to namespace the reducer
    baseQuery: fetchBaseQuery({ 
        baseUrl:'http://localhost:3000/api',
        credentials: 'include'
    }),
    endpoints: builder => ({})
})