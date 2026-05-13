import { baseApi } from '@/app/baseApi'
import { instance } from '@/common/instance'
import type { DefaultBaseResponse } from '@/common/types'
import type { LoginResponse, MeResponse } from '@/features/auth/api/authApi.types'
import type { LoginInputs } from '@/features/auth/lib/schemas'

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
    }
  },
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi

export const _authApi = {
  login(payload: LoginInputs) {
    return instance.post<LoginResponse>('/auth/login', payload)
  },
  logout() {
    return instance.delete<DefaultBaseResponse>('/auth/login')
  },
  me() {
    return instance.get<MeResponse>('/auth/me')
  },
}
