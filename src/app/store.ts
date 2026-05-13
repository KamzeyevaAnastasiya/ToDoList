import { baseApi } from '@/app/baseApi'
import { authReducer, authSlice } from '@/features/auth/model/auth-slice'
import { todolistsReducer, todolistsSlice } from '@/features/todolists/model/todolists-slice'
import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appReducer, appSlice } from './app-slice.ts'

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
