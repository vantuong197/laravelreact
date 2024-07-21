import { configureStore } from '@reduxjs/toolkit'
import toastSlice from './slice/toastSlice'
import authSlice from './slice/authSlice'
import processingSlice from './slice/processingSlice'
export const store = configureStore({
  reducer: {
    toast: toastSlice,
    auth: authSlice,
    processing: processingSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch