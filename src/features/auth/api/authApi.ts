import { instance } from '@/common/instance'
import type { DefaultBaseResponse } from '@/common/types'
import type { LoginResponse, MeResponse } from '@/features/auth/api/authApi.types'
import type { LoginInputs } from '@/features/auth/lib/schemas'

export const authApi = {
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
