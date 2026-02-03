import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiKey=import.meta.env.VITE_NEWS_API_KEY;

export const newsApi=createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://newsapi.org/v2/',
    }),
    endpoints: (builder)=>({
        getRelatedArticles: builder.query({
            query: (searchTerm)=> `everything?q=${encodeURIComponent(searchTerm)}&apiKey=${newsApiKey}&pageSize=4&language=en`
        }),
    }),
});

export const { useLazyGetRelatedArticlesQuery } = newsApi;