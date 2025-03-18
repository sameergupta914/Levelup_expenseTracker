import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI= 'http://localhost:8080';

export const apiSlice= createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURI}),
    endpoints: builder=>({
        getCategories: builder.query({
            //get: http://localhost:8080/api/categories
            query: ()=>'/api/categories',
            providesTags:['categories']
        }),
        getLables: builder.query({
            query: ()=>'/api/labels',
            providesTags:['transaction']
        }),

        addTransaction: builder.mutation({
            query: (initialTransaction)=>({
                url:'/api/transaction',
                method: "POST",
                body: initialTransaction
            }),
            invalidatesTags:['transaction']
        }),
        deleteTransaction: builder.mutation({
            query: recordId=>({
                url:'/api/transaction',
                method:"DELETE",
                body:recordId
            }),
            invalidatesTags:['transaction']
        })

    })
})

export default apiSlice;