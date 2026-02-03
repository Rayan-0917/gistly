import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./articles.js";
import { newsApi } from "./News.js";

export const store=configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(articleApi.middleware, newsApi.middleware),
});

