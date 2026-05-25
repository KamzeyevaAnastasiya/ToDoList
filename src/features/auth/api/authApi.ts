import { baseApi } from '@/app/baseApi'
import type { DefaultBaseResponse } from '@/common/types'
import type { CaptchaResponse, LoginInputs, LoginResponse, MeResponse } from '@/features/auth/api/authApi.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      me: build.query<MeResponse, void>({
        query: () => ({
          method: 'get',
          url: '/auth/me',
        }),
      }),
      login: build.mutation<LoginResponse, LoginInputs>({
        query: (body) => ({
          method: 'post',
          url: '/auth/login',
          body,
        }),
      }),
      logout: build.mutation<DefaultBaseResponse, void>({
        query: () => ({
          method: 'delete',
          url: '/auth/login',
        }),
      }),
      captcha: build.query<CaptchaResponse, void>({
        query: () => ({
          method: 'get',
          url: '/security/get-captcha-url',
        }),
      }),
    }
  },
})

export const { useMeQuery, useLoginMutation, useLogoutMutation, useLazyCaptchaQuery } = authApi
