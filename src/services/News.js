import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://news-api14.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set('X-RapidAPI-Host', 'news-api14.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRelatedArticles: builder.query({
      query: (searchTerm) => 
        `v2/search/articles?query=${encodeURIComponent(searchTerm)}&language=en`,
      transformResponse: (response) => ({
        articles: response.data?.map(article => ({
          title: article.title,
          url: article.url,
          image: article.thumbnail || '', 
          source: { name: article.publisher?.name || 'News' }
        })).slice(0, 4)
      })
    }),
  }),
});

export const { useLazyGetRelatedArticlesQuery } = newsApi;