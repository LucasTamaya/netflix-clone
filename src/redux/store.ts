import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/userSlice";

// we create our store and define a reducer that concern the user
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
