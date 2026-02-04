import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const gnewsApiKey=import.meta.env.VITE_GNEWS_API_KEY;

export const newsApi=createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://gnews.io/api/v4/',
    }),
    endpoints: (builder)=>({
        getRelatedArticles: builder.query({
            query: (searchTerm)=> `search?q=${encodeURIComponent(searchTerm)}&lang=en&max=4&apikey=${gnewsApiKey}`,
        }),
    }),
});

export const { useLazyGetRelatedArticlesQuery } = newsApi;