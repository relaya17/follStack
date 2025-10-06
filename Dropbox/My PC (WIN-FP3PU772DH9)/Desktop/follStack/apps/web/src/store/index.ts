// @ts-ignore
import { configureStore } from '@reduxjs/toolkit'
// @ts-ignore
import authSlice from './slices/authSlice'
// @ts-ignore
import userSlice from './slices/userSlice'
// @ts-ignore
import learningSlice from './slices/learningSlice'
// @ts-ignore
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    learning: learningSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
