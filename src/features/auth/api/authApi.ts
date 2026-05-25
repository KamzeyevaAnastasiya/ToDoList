import { baseApi } from '@/app/baseApi'
import type { DefaultBaseResponse } from '@/common/types'
import { withZodCatch } from '@/common/utils/withZodCatch'
import type { CaptchaResponse, LoginInputs, LoginResponse, MeResponse } from '@/features/auth/api/authApi.types'
import { captchaSchema, loginResponseSchema, meResponseSchema } from '@/features/auth/lib/schemas'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      me: build.query<MeResponse, void>({
        query: () => ({
          method: 'get',
          url: '/auth/me',
        }),
        ...withZodCatch(meResponseSchema),
      }),
      login: build.mutation<LoginResponse, LoginInputs>({
        query: (body) => ({
          method: 'post',
          url: '/auth/login',
          body,
        }),
        ...withZodCatch(loginResponseSchema),
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
        ...withZodCatch(captchaSchema),
      }),
    }
  },
})

export const { useMeQuery, useLoginMutation, useLogoutMutation, useLazyCaptchaQuery } = authApi
