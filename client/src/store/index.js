import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "@services/cryptoApi";
import { cryptoNewsApi } from "@services/cryptoNewsApi";
// import usersReducer from "./usersReducer";
// import postsReducer from "./postsReducer";

const store = configureStore({
  /* Note that this only works for one level of reducers. If you want to nest reducers, you'll need to call combineReducers yourself to handle the nesting. */
  reducer: {
    // Add the `rtk-query` generated reducer as a specific top-level slice
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    // users: usersReducer,
    // posts: postsReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware
    ),
});

export default store;
