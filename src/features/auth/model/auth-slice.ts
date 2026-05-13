import { setAppStatusAC } from '@/app/app-slice'
import { clearDataAC } from '@/common/actions'
import { AUTH_TOKEN } from '@/common/constants'
import { ResultCode } from '@/common/enums'
import { defaultBaseResponseSchema } from '@/common/types'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { _authApi } from '@/features/auth/api/authApi'
import { loginResponseSchema, meResponseSchema } from '@/features/auth/api/authApi.types'
import type { LoginInputs } from '@/features/auth/lib/schemas'

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userData: null as string | null,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectUserData: (state) => state.userData,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await _authApi.login(data)
          const validatedResponse = loginResponseSchema.parse(res.data)
          if (validatedResponse.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            localStorage.setItem(AUTH_TOKEN, validatedResponse.data.token)
            const meRes = await _authApi.me()
            return { isLoggedIn: true, userData: meRes.data.data.login }
          } else {
            handleServerAppError(validatedResponse, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
          state.userData = action.payload.userData
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await _authApi.logout()
          const validatedResponse = defaultBaseResponseSchema.parse(res.data)
          if (validatedResponse.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            dispatch(clearDataAC())
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleServerAppError(validatedResponse, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await _authApi.me()
          const validatedResponse = meResponseSchema.parse(res.data)
          if (validatedResponse.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return { isLoggedIn: true, userData: validatedResponse.data.login }
          } else {
            handleServerAppError(validatedResponse, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
          state.userData = action.payload.userData
        },
      },
    ),
  }),
})

export const { selectIsLoggedIn, selectUserData } = authSlice.selectors
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const authReducer = authSlice.reducer
